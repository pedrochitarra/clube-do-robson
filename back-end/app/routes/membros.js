module.exports = app => {
  const membrosController = require('../controllers/membros')
  const router = require('express').Router()

  router.get('/:clubId', membrosController.findAll)
  router.get('/:clubId/:id', membrosController.findOne)

  app.use('/api/membros', router)
}
