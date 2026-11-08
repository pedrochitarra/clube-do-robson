// Espelho do src/data.py do clubedorobson-py: lê o snapshot do banco único
// (public/data/clubedorobson.json, gerado por scripts/export_snapshot.py) uma vez só.
export const CLUB_ID = 6703918

const NUMERIC = {
  Players: ['gamesPlayed', 'winRate', 'goals', 'assists', 'shotSuccessRate', 'passesMade', 'passSuccessRate',
    'tacklesMade', 'tackleSuccessRate', 'proHeight', 'proOverall', 'manOfTheMatch', 'redCards'],
  Matches: ['homeGoals', 'awayGoals'],
  PlayersMatches: ['goals', 'assists', 'rating', 'shots', 'passesmade', 'passattempts', 'tacklesmade', 'tackleattempts', 'mom'],
  ClubsMatches: ['rating']
}

let db = null
let loading = null

export function load () {
  if (db) return Promise.resolve(db)
  if (!loading) {
    loading = fetch(`${process.env.BASE_URL}data/clubedorobson.json`)
      .then(r => r.json())
      .then(snap => {
        for (const [t, cols] of Object.entries(NUMERIC)) {
          for (const row of snap[t]) {
            for (const c of cols) row[c] = row[c] === null || row[c] === '' ? null : Number(row[c])
          }
        }
        db = snap
        return db
      })
  }
  return loading
}

export const table = name => db[name]

export function club (id = CLUB_ID) {
  return db.Clubs.find(c => String(c.clubId) === String(id))
}

export const seasonal = () => db.Seasonals[0]

export function robsoner (name) {
  return db.Robsoners.find(r => r.name === name) || null
}

// Jogadores reais do clube, com o cadastro do Robsoner quando existe; por jogos
export function members () {
  return db.Players
    .filter(p => String(p.clubid) === String(CLUB_ID))
    .map(p => {
      const r = robsoner(p.name)
      return { ...p, robsoner: !!r, displayName: r ? r.proName : p.proName, number: r ? r.number : null }
    })
    .sort((a, b) => b.gamesPlayed - a.gamesPlayed)
}

// Partidas com temporada e resultado do ponto de vista do Robson ('w', 'd', 'l'), mais recentes primeiro
export function matches () {
  const seasons = {}
  db.ClubsMatches.filter(c => c.clubId === CLUB_ID).forEach(c => { seasons[c.matchId] = c.seasonid })
  return db.Matches
    .filter(m => m.homeClub === CLUB_ID || m.awayClub === CLUB_ID)
    .map(m => {
      const home = m.homeClub === CLUB_ID
      const ours = home ? m.homeGoals : m.awayGoals
      const theirs = home ? m.awayGoals : m.homeGoals
      return {
        ...m,
        season: seasons[m.matchId] == null ? null : seasons[m.matchId],
        result: ours > theirs ? 'w' : ours < theirs ? 'l' : 'd',
        date: new Date(m.timestamp * 1000)
      }
    })
    .sort((a, b) => b.timestamp - a.timestamp)
}

export const match = id => matches().find(m => m.matchId === String(id))

export const clubMatchStats = id => db.ClubsMatches.filter(c => c.matchId === String(id))

export const playerMatchStats = id => db.PlayersMatches.filter(p => p.matchId === String(id))

export function stadiumCapacity (name) {
  const hit = db.Stadiums.find(s => String(s.name).toLowerCase() === String(name).toLowerCase())
  return hit ? Number(hit.capacity) : null
}
