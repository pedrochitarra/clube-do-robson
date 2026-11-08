// Helpers do src/ui.py do clubedorobson-py
const BASE = process.env.BASE_URL
const CRESTS = new Set(require.context('../../public/crests', false, /\.png$/).keys().map(k => k.slice(2)))
const PLAYERS = new Set(require.context('../../public/players', false, /\.png$/).keys().map(k => k.slice(2)))

export const RESULT_LABEL = { w: 'V', d: 'E', l: 'D' }
export const RESULT_NAME = { w: 'Vitória', d: 'Empate', l: 'Derrota' }
export const MESES = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']
export const DEFAULT_PHOTO = `${BASE}players/_default.png`
export const OUR_CREST = `${BASE}crests/99150901.png`

// Clube customizado usa customcrestid; licenciado usa teamId
export function crest (club) {
  if (!club) return OUR_CREST
  const id = club.iscustomteam === 1 ? club.customcrestid : club.teamId
  return CRESTS.has(`${id}.png`) ? `${BASE}crests/${id}.png` : OUR_CREST
}

export function photo (gamertag) {
  return PLAYERS.has(`${gamertag}.png`) ? `${BASE}players/${gamertag}.png` : null
}

export function attrColor (v) {
  return v >= 85 ? 'var(--win)' : v >= 70 ? 'var(--gold)' : v >= 50 ? '#f59f4a' : 'var(--loss)'
}

export const fmtInt = v => Math.round(v).toLocaleString('pt-BR')
export const pad = n => String(n).padStart(2, '0')
export const hhmm = d => `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}`
// Datas em UTC, como o pd.to_datetime(unit='s') da versão Python
export const dayMonth = d => `${pad(d.getUTCDate())} ${MESES[d.getUTCMonth()]}`
