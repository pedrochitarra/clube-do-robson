module.exports = app => {
  const membrosPartidasController = require('../controllers/membrosPartidas')
  const router = require('express').Router()

  router.get('/:id', membrosPartidasController.findOne)

  app.use('/api/membrosPartidas', router)
}
