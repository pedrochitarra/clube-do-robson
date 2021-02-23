
const logger = require('../../common/logger')
const { Partidas } = require('../models')

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
