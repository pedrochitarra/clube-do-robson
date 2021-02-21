module.exports = app => {
  const partidasController = require('../controllers/partidas')
  const router = require('express').Router()

  router.get('/:partidaId', partidasController.findOne)

  app.use('/api/partidas', router)
}
