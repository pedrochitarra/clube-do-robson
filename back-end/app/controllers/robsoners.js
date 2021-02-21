// import Sequelize from 'sequelize'
// const Op = Sequelize.Op
import { Robsoners } from '../models'
import logger from '../../common/logger'

exports.findOne = async (req, res) => {
  try {
    const name = req.params.name
    const robsoner = await Robsoners.findAll({
      where: {
        name: name
      }
    })

    res.send(robsoner)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar o jogador com nome ' + req.params.name
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const robsoners = await Robsoners.findAll({
    })
    res.send(robsoners)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar os jogadores'
    })
  }
}
