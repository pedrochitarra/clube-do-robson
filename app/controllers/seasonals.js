// import Sequelize from 'sequelize'
// const Op = Sequelize.Op;

const logger = require('../../common/logger')
const { Seasonals } = require('../models')

exports.findAll = async (req, res) => {
  try {
    const result = await Seasonals.findByPk(6703918)
    res.send(result)
  } catch (err) {
    logger.err(err)
    res.status(500).send({
      message: 'Não foi possível encontrar as informações das temporadas'
    })
  }
}
