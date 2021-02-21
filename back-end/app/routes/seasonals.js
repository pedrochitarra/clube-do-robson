module.exports = app => {
  const seasonalsController = require('../controllers/seasonals')
  const router = require('express').Router()

  router.get('/', seasonalsController.findAll)

  app.use('/api/seasonals/', router)
}
