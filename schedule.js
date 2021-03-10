
const axios = require('axios')
const logger = require('./common/logger')
const { Clubes, Membros, Partidas, ClubesPartidas, MembrosPartidas, Seasonals } = require('./app/models')
const getColors = require('get-image-colors')
const cron = require('node-cron')

async function updateClub (clubId) {
  try {
  // CONFIGURAÇÕES DA REQUISIÇÃO PARA A API DO PROCLUBS
    const config = {
      headers: {
        Host: 'proclubs.ea.com',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'content-type': 'application/json',
        Origin: 'https://www.ea.com',
        Connection: 'keep-alive',
        Referer: `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/overview?clubId=${clubId}&platform=ps4`
      },
      params: {
        clubIds: clubId
      }
    }
    // REQUISIÇÃO PARA A API DO PRO CLUBS
    const response = await axios.get('https://proclubs.ea.com/api/fifa/clubs/info?platform=ps4', config)

    const clubData = response.data[clubId]

    const teamColors = await getTeamColors(clubData)
    // logger.info("TTEEEAM", teamColors)

    await Clubes.upsert({
      clubId: clubData.clubId,
      name: clubData.name,
      regionId: clubData.regionId,
      teamId: clubData.teamId,
      stadname: clubData.customKit.stadName,
      iscustomteam: clubData.customKit.isCustomTeam,
      standardcrestid: clubData.teamId,
      customcrestid: clubData.customKit.crestAssetId,
      kitcolor1: teamColors.kitcolor1,
      kitcolor2: teamColors.kitcolor2,
      kitcolor3: teamColors.kitcolor3,
      kitacolor1: clubData.customKit.kitAColor1,
      kitacolor2: clubData.customKit.kitAColor2,
      kitacolor3: clubData.customKit.kitAColor3
    // logging: console.log
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateMembers (clubId) {
  try {
    const config = {
      headers: {
        Host: 'proclubs.ea.com',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'content-type': 'application/json',
        Origin: 'https://www.ea.com',
        Connection: 'keep-alive',
        Referer: `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/members?clubId=${clubId}&platform=ps4`
      },
      params: {
        clubId: clubId
      }
    }

    const response = await axios.get('https://proclubs.ea.com/api/fifa/members/stats?platform=ps4', config)

    const membersData = response.data.members
    // logger.info(response.data)
    // logger.warn(membersData)
    membersData.forEach(async md => {
      md.clubid = clubId
      await Membros.upsert(md)
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateMatches () {
  try {
    let clubId = 6703918
    const config = {
      headers: {
        Host: 'proclubs.ea.com',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'content-type': 'application/json',
        Origin: 'https://www.ea.com',
        Connection: 'keep-alive',
        Referer: `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/match-history?${clubId = 6703918}&platform=ps4`
      },
      params: {
        clubIds: clubId
      }
    }

    const response = await axios.get('https://proclubs.ea.com/api/fifa/clubs/matches?matchType=gameType9&platform=ps4', config)

    const matchData = response.data
    // console.log(matchData)
    // const saveMatch = {}
    let homePlayers = []
    let awayPlayers = []
    matchData.forEach(async md => {
      // INSERT MATCH DATA
      // saveMatch = {}
      // saveMatch.matchId = md.matchId
      // logger.warn(saveMatch.matchId)
      // saveMatch.timestamp = md.timestamp
      // saveMatch.homeClubId = Object.keys(md.clubs)[1]
      // saveMatch.awayClubId = Object.keys(md.clubs)[0]
      // logger.warn(saveMatch)

      await updateClub(Object.keys(md.clubs)[0])
      await updateClub(Object.keys(md.clubs)[1])

      await Partidas.upsert({
        matchId: md.matchId,
        timestamp: md.timestamp,
        homeClub: Object.keys(md.clubs)[1],
        awayClub: Object.keys(md.clubs)[0],
        homeGoals: md.clubs[Object.keys(md.clubs)[1]].goals,
        awayGoals: md.clubs[Object.keys(md.clubs)[0]].goals
        // logging: console.log
      })

      // saveMatch.homeClub = md.clubs[saveMatch.homeClubId]
      // saveMatch.awayClub = md.clubs[saveMatch.awayClubId]
      // UPDATE CLUBS INFO

      // UPDATE CLUBS IN THAT MATCH INFO
      // UPDATE HOME CLUB
      // let aggregateAway = md.aggregate[saveMatch.awayClubId]
      // const aggregateHome = md.aggregate[saveMatch.homeClubId]

      await ClubesPartidas.upsert({
        clubMatchId: md.matchId + Object.keys(md.clubs)[0],
        clubId: Object.keys(md.clubs)[0],
        matchId: md.matchId,
        seasonid: md.clubs[Object.keys(md.clubs)[0]].season_id,
        // seasonid: JSON.stringify(md),
        passattempts: md.aggregate[Object.keys(md.clubs)[0]].passattempts,
        passesmade: md.aggregate[Object.keys(md.clubs)[0]].passesmade,
        rating: md.aggregate[Object.keys(md.clubs)[0]].rating,
        // rating: JSON.stringify(md),
        shots: md.aggregate[Object.keys(md.clubs)[0]].shots,
        goals: md.aggregate[Object.keys(md.clubs)[0]].goals,
        goalsConceded: md.aggregate[Object.keys(md.clubs)[0]].goalsconceded,
        assists: md.aggregate[Object.keys(md.clubs)[0]].assists,
        tackleattempts: md.aggregate[Object.keys(md.clubs)[0]].tackleattempts,
        tacklesmade: md.aggregate[Object.keys(md.clubs)[0]].tacklesmade,
        logging: console.log
      })

      /* await ClubesPartidas.upsert({
            clubMatchId: md.matchId + saveMatch.homeClubId,
            clubId: saveMatch.homeClubId,
            matchId: md.matchId,
            seasonid: md.clubs[saveMatch.homeClubId].season_id,
            passattempts: aggregateHome.passattempts,
            passesmade: aggregateHome.passesmade,
            rating: aggregateHome.rating,
            shots: aggregateHome.shots,
            goals: aggregateHome.goals,
            goalsConceded: aggregateHome.goalsconceded,
            assists: aggregateHome.assists,
            tackleattempts: aggregateHome.tackleattempts,
            tacklesmade: aggregateHome.tacklesmade,
            logging: console.log
          }) */
      await ClubesPartidas.upsert({
        clubMatchId: md.matchId + Object.keys(md.clubs)[1],
        clubId: Object.keys(md.clubs)[1],
        matchId: md.matchId,
        seasonid: md.clubs[Object.keys(md.clubs)[1]].season_id,
        passattempts: md.aggregate[Object.keys(md.clubs)[1]].passattempts,
        passesmade: md.aggregate[Object.keys(md.clubs)[1]].passesmade,
        rating: md.aggregate[Object.keys(md.clubs)[1]].rating,
        shots: md.aggregate[Object.keys(md.clubs)[1]].shots,
        goals: md.aggregate[Object.keys(md.clubs)[1]].goals,
        goalsConceded: md.aggregate[Object.keys(md.clubs)[1]].goalsconceded,
        assists: md.aggregate[Object.keys(md.clubs)[1]].assists,
        tackleattempts: md.aggregate[Object.keys(md.clubs)[1]].tackleattempts,
        tacklesmade: md.aggregate[Object.keys(md.clubs)[1]].tacklesmade,
        logging: console.log
      })

      // INSERT PLAYERS IN THAT MATCH DATA
      await updateMembers(Object.keys(md.clubs)[1])
      await updateMembers(Object.keys(md.clubs)[0])

      homePlayers = md.players[Object.keys(md.clubs)[1]]
      Object.entries(homePlayers).forEach(async player => {
        const playerEntry = player[1]
        await MembrosPartidas.upsert({
          memberMatchId: playerEntry.playername + md.matchId,
          name: playerEntry.playername,
          matchId: md.matchId,
          passattempts: playerEntry.passattempts,
          passesmade: playerEntry.passesmade,
          rating: playerEntry.rating,
          shots: playerEntry.shots,
          goals: playerEntry.goals,
          mom: playerEntry.mom,
          assists: playerEntry.assists,
          tackleattempts: playerEntry.tackleattempts,
          tacklesmade: playerEntry.tacklesmade,
          pos: playerEntry.pos,
          vproattr: playerEntry.vproattr,
          clubid: Object.keys(md.clubs)[1]
          // logging: console.log
        })
      })

      // INSERT PLAYERS IN THAT MATCH DATA
      awayPlayers = md.players[Object.keys(md.clubs)[0]]
      // console.log(homePlayers)
      Object.entries(awayPlayers).forEach(async player => {
        const playerEntry = player[1]
        await MembrosPartidas.upsert({
          memberMatchId: playerEntry.playername + md.matchId,
          name: playerEntry.playername,
          matchId: md.matchId,
          passattempts: playerEntry.passattempts,
          passesmade: playerEntry.passesmade,
          rating: playerEntry.rating,
          shots: playerEntry.shots,
          goals: playerEntry.goals,
          mom: playerEntry.mom,
          assists: playerEntry.assists,
          tackleattempts: playerEntry.tackleattempts,
          tacklesmade: playerEntry.tacklesmade,
          pos: playerEntry.pos,
          vproattr: playerEntry.vproattr,
          clubid: Object.keys(md.clubs)[0]
          // logging: console.log
        })
      })
      // console.log(homePlayers)
    })
  } catch (error) {
    console.log(error)
  }
}

async function updateSeasonal () {
  try {
    let clubId = 6703918
    const config = {
      headers: {
        Host: 'proclubs.ea.com',
        Accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'content-type': 'application/json',
        Origin: 'https://www.ea.com',
        Connection: 'keep-alive',
        Referer: `https://www.ea.com/pt-br/games/fifa/fifa-21/pro-clubs/ps4-xb1-pc/overview?${clubId = 6703918}&platform=ps4`
      },
      params: {
        clubIds: clubId
      }
    }

    const response = await axios.get('https://proclubs.ea.com/api/fifa/clubs/seasonalStats?platform=ps4', config)

    const seasonalData = response.data[0]
    // logger.warn(seasonalData)
    const div2 = seasonalData.titlesWon - seasonalData.leaguesWon - 2 - 3
    await Seasonals.upsert({
      seasons: seasonalData.seasons,
      titleswon: seasonalData.titlesWon,
      leaguewins: seasonalData.leaguesWon,
      divswon1: seasonalData.leaguesWon,
      divswon2: div2,
      divswon3: 3,
      divswon4: 2,
      promotions: seasonalData.promotions,
      holds: seasonalData.holds,
      relegations: seasonalData.relegations,
      rankingpoints: seasonalData.rankingPoints,
      bestdivision: seasonalData.bestDivision,
      bestpoints: seasonalData.bestPoints,
      starlevel: seasonalData.starLevel,
      alltimegoals: seasonalData.alltimeGoals,
      alltimegoalsagainst: seasonalData.alltimeGoalsAgainst,
      skill: seasonalData.skill,
      wins: seasonalData.wins,
      ties: seasonalData.ties,
      losses: seasonalData.losses,
      currentdivision: seasonalData.currentDivision,
      totalgames: seasonalData.totalGames,
      clubid: clubId,
      logging: console.log
    })
  } catch (err) {
    logger.error(err)
  }
}

updateSeasonal()

/* function updateAssets () {
  const clubId = 6703918
  const config = {
    headers: {
      Host: 'fifa21.content.easports.com',
      // "Accept": "application/json",
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      // "content-type": "application/json",
      Origin: 'https://www.ea.com',
      Connection: 'keep-alive',
      Referer: 'https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/'
    }
    // params: {
    //    clubIds: clubId
    //  }
  }

  axios.get('https://fifa21.content.easports.com/fifa/fltOnlineAssets/05772199-716f-417d-9fe0-988fa9899c4d/2021/fifaweb/', config)
    .then(async response => {
    })
    .catch(error => {
      console.log(error)
    })
} */

async function getTeamColors (clubData) {
  try {
    const teamId = clubData.teamId
    const colorOptions = {
      count: 3
    }
    const kitColors = {}
    // console.log(clubData.customKit.isCustomTeam)
    if (clubData.customKit.isCustomTeam === 0) {
    // logger.info("NOOOOO CUSTOOOOOOMMMMM")
      let teamColors = []
      const teamColorHex = []
      teamColors = await getColors(`https://www.ea.com/fifa/ultimate-team/web-app/content/21D4F1AC-91A3-458D-A64E-895AA6D871D1/2021/fut/items/images/mobile/kits/home/j0_${teamId}_0.png`, colorOptions)

      teamColors.forEach((teamColor, i) => {
        teamColorHex[i] = rgbToHex(teamColor._rgb[0], teamColor._rgb[1], teamColor._rgb[2])
      })
      // console.log("COLORHEXXXX::::", teamColorHex)
      kitColors.kitcolor1 = teamColorHex[0]
      kitColors.kitcolor2 = teamColorHex[1]
      kitColors.kitcolor3 = teamColorHex[2]
    } else {
      console.log('CUSTOOOOOOMMMMM')
      // console.log(clubData.customKit)
      let color1 = parseInt(clubData.customKit.kitColor1).toString(16)
      // console.log("COLOR1", color1)
      color1 = color1.padStart(6, '0')

      let color2 = parseInt(clubData.customKit.kitColor2).toString(16)
      color2 = color2.padStart(6, '0')

      let color3 = parseInt(clubData.customKit.kitColor3).toString(16)
      color3 = color3.padStart(6, '0')

      // console.log("COLORSSSSSSS", color1,color2,color3)
      // let hexString = valueD.toString(16);
      // hexString = hexString.padStart(6, '0')
      // console.log(hexString)
      kitColors.kitcolor1 = color1
      kitColors.kitcolor2 = color2
      kitColors.kitcolor3 = color3
    }
    // console.log("RETURN",kitColors)
    return kitColors
  } catch (err) {
    logger.error(err)
  }
}

function componentToHex (c) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

function rgbToHex (r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

cron.schedule('*/10 * * * *', async () => {
  logger.info('RUNNING CRON')
  await updateMatches()
})

/* let reqTimer = setTimeout(function wakeUp () {
  axios.get('https://clubedorobson.herokuapp.com/', function () {
    console.log('WAKE UP DYNO')
  })
  return reqTimer = setTimeout(wakeUp, 1200000)
}, 1200000) */
