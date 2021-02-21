// const Op = Sequelize.Op
// import Sequelize from 'sequelize'
import { Estadios } from '../models'
import logger from '../../common/logger'

exports.findAll = async (req, res) => {
  try {
    const result = await Estadios.findAll()
    res.send(result)
  } catch (err) {
    logger.err(err)
    res.status(500).send({
      message: 'Não foi possível encontrar as informações dos estádios'
    })
  }
}

exports.findOne = async (req, res) => {
  try {
    const name = req.params.name
    logger.info(name)
    const result = await Estadios.findAll({
      where: {
        name: name
      }
    })
    res.send(result)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar o estádio com nome ' + req.params.name
    })
  }
}
