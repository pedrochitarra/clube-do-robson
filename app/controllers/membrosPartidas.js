// import Sequelize from 'sequelize'
// const Op = Sequelize.Op
import logger from 'logger'
import { MembrosPartidas } from '../models'

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await MembrosPartidas.findByPk(id)
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar os dados do membro na partida com id ' + req.params.id
    })
  }
}
