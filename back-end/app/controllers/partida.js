// import Sequelize from 'sequelize'
// const Op = Sequelize.Op
import logger from '../../common/logger'
import { Partidas } from '../models'

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = Partidas.findByPk(id)
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar a partida com id ' + req.params.id
    })
  }
}
