module.exports = app => {
  const stadiumsController = require('../controllers/stadiums')
  const router = require('express').Router()

  router.get('/:name', stadiumsController.findOne)
  router.get('/', stadiumsController.findAll)
  app.use('/api/stadiums', router)
}
