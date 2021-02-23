// import Sequelize from 'sequelize'
// const Op = Sequelize.Op
const logger = require('../../common/logger')
const { Clubes } = require('../models')

exports.findOne = async (req, res) => {
  try {
    const id = req.params.id
    const result = await Clubes.findByPk(id)
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar o clube com id ' + req.params.id
    })
  }
}
