// import Sequelize from 'sequelize'
// const Op = Sequelize.Op
import logger from 'logger'
import { Membros } from '../models'

exports.findAll = async (req, res) => {
  try {
    const clubId = req.params.clubId
    const result = await Membros.findAll({
      where: {
        clubid: clubId
      }
    })
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar o membro do clube com id ' + req.params.clubId
    })
  }
}

// Find a single Tutorial with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const clubId = req.params.clubId
    const result = await Membros.findAll({

      where: {
        name: id,
        clubid: clubId
      },
      include: [
        { association: 'membrosClubes' },
        {
          association: 'membrosMembrosPartidas',
          order: [
            ['updatedAt', 'DESC']
          ],
          limit: 1
        }
      ]
    })
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar o membro do clube com id ' + req.params.clubId
    })
  }
}
