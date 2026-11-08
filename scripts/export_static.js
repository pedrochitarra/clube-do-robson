/* global fetch */
// Gera a "API" estática para o GitHub Pages: sobe o Express contra o SQLite
// local, percorre as rotas usadas pelo front e grava cada resposta em
// front-end/public/api/<rota>.json (ver front-end/src/http-common.js).
//   node scripts/export_static.js
const { spawn } = require('child_process')
const fs = require('fs')
const path = require('path')

const CLUB_ID = 6703918
const PORT = 5599
const OUT = path.join(__dirname, '..', 'front-end', 'public', 'api')
const base = `http://localhost:${PORT}/api`

async function get (route) {
  const url = base + route.split('/').map(encodeURIComponent).join('/')
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${res.status} ${route}`)
  const data = await res.json()
  const file = path.join(OUT, route.replace(/\/+$/, '') + '.json')
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, JSON.stringify(data))
  return data
}

async function waitServer () {
  for (let i = 0; i < 60; i++) {
    try { await fetch(`${base}/robsoners`); return } catch (e) { await new Promise(resolve => setTimeout(resolve, 500)) }
  }
  throw new Error('servidor não subiu')
}

async function main () {
  const server = spawn(process.execPath, ['index.js'], {
    cwd: path.join(__dirname, '..'), env: { ...process.env, PORT }, stdio: 'ignore'
  })
  try {
    await waitServer()
    fs.rmSync(OUT, { recursive: true, force: true })

    await get(`/clubes/${CLUB_ID}`)
    await get('/seasonals')
    const robsoners = await get('/robsoners')
    for (const r of robsoners) await get(`/robsoners/${r.name}`)
    const membros = await get(`/membros/${CLUB_ID}`)
    for (const m of membros) await get(`/membros/${CLUB_ID}/${m.name}`)
    const estadios = await get('/stadiums')
    const stadNames = new Set(estadios.map(e => e.name).concat('Emirates Stadium'))

    const seasons = await get(`/clubesPartidas/seasons/${CLUB_ID}`)
    const matchIds = new Set()
    for (const id of new Set(seasons.map(s => s.seasonid).filter(s => s != null))) {
      const { partidasSeason } = await get(`/clubesPartidas/${CLUB_ID}/${id}`)
      partidasSeason.forEach(p => matchIds.add(p.matchId))
    }
    for (const id of matchIds) {
      const [p] = await get(`/partidas/${id}`)
      const stad = p && p.partidasHomeClub && p.partidasHomeClub.stadname
      if (stad) stadNames.add(stad)
    }
    for (const n of stadNames) {
      if (n && !/[\\/:*?"<>|]/.test(n)) await get(`/stadiums/${n}`)
    }
    console.log(`ok: ${matchIds.size} partidas, ${membros.length} membros, ${stadNames.size} estádios`)
  } finally {
    server.kill()
  }
}

main().catch(e => { console.error(e); process.exitCode = 1 })
