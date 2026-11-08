import snapshot from '../public/data/clubedorobson.json'

const CLUB_ID = 6703918
const rows = table => snapshot[table] || []
const number = value => value === null || value === '' ? value : Number(value)

function club (id) {
  return rows('Clubs').find(item => String(item.clubId) === String(id))
}

function members (clubId) {
  const robsoners = rows('Robsoners')
  return rows('Players')
    .filter(item => String(item.clubid) === String(clubId))
    .map(item => {
      const robsoner = robsoners.find(row => row.name === item.name)
      return { ...item, robsoner, displayName: robsoner ? robsoner.proName : item.proName, number: robsoner && robsoner.number }
    })
}

function matches (clubId) {
  const clubMatches = rows('ClubsMatches').filter(item => String(item.clubId) === String(clubId))
  const seasons = Object.fromEntries(clubMatches.map(item => [item.matchId, item.seasonid]))
  return rows('Matches')
    .filter(item => String(item.homeClub) === String(clubId) || String(item.awayClub) === String(clubId))
    .map(item => {
      const home = String(item.homeClub) === String(clubId)
      const ours = home ? Number(item.homeGoals) : Number(item.awayGoals)
      const theirs = home ? Number(item.awayGoals) : Number(item.homeGoals)
      return { ...item, season: seasons[item.matchId], result: ours > theirs ? 'w' : ours < theirs ? 'l' : 'd' }
    })
    .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
}

export function get (path) {
  const parts = path.replace(/^\//, '').split('/').filter(Boolean)
  let data
  if (parts[0] === 'clubes') data = club(parts[1])
  else if (parts[0] === 'seasonals') data = rows('Seasonals').find(item => String(item.clubid) === String(CLUB_ID))
  else if (parts[0] === 'membros') data = parts[2] ? members(parts[1]).filter(item => item.name === parts[2]) : members(parts[1])
  else if (parts[0] === 'partidas') data = parts[1] === 'seasons' ? [...new Set(matches(parts[2]).map(item => item.season))] : parts[2] ? matches(parts[1]).filter(item => String(item.season) === String(parts[2])) : matches(parts[1])
  else if (parts[0] === 'clubesPartidas') data = parts[1] === 'seasons' ? [...new Set(rows('ClubsMatches').filter(item => String(item.clubId) === String(parts[2])).map(item => item.seasonid))] : rows('ClubsMatches').filter(item => String(item.clubId) === String(parts[1]) && (!parts[2] || String(item.seasonid) === String(parts[2])))
  else if (parts[0] === 'robsoners') data = parts[1] ? rows('Robsoners').filter(item => item.name === parts[1]) : rows('Robsoners')
  else if (parts[0] === 'stadiums') data = parts[1] ? rows('Stadiums').filter(item => item.name === parts[1]) : rows('Stadiums')
  else data = []
  return Promise.resolve({ data })
}
