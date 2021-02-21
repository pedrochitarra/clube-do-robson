import Sequelize from 'sequelize'
import logger from '../../common/logger'
import { Partidas, ClubesPartidas } from '../models'
const Op = Sequelize.Op

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await ClubesPartidas.findByPk(id)
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar os dados do clube na partida com id ' + req.params.id
    })
  }
}

exports.findSeasons = async (req, res) => {
  try {
    const clubId = req.params.clubId
    const result = await ClubesPartidas.findAll({
      where: {
        clubId: clubId
      },
      attributes: ['seasonid']
    })
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar a temporada do clube com id ' + req.params.clubId
    })
  }
}

exports.getBySeason = async (req, res) => {
  try {
    const clubId = req.params.clubId
    const seasonId = req.params.seasonId
    const seasonMatches = await ClubesPartidas.findAll({
      where: {
        clubId: clubId,
        seasonid: seasonId
      },
      include: [
        { association: 'clubesPartidasPartidas' }
      ]
    })
    const matchesToReturn = []
    seasonMatches.forEach(clubesPartida => {
      matchesToReturn.push(clubesPartida.dataValues.matchId)
    })

    const partidasSeason = await Partidas.findAll({
      where: {
        matchId: { [Op.in]: matchesToReturn }
      },
      include: [
        { association: 'partidasHomeClub' },
        { association: 'partidasAwayClub' }
      ]

    })
    seasonMatches.partidasSeason = partidasSeason
    res.send({ seasonMatches, partidasSeason })
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar as partidas da temporada ' + req.params.seasonId
    })
  }
}
