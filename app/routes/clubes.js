module.exports = app => {
  const clubesController = require('../controllers/clubes')
  const router = require('express').Router()

  router.get('/:id', clubesController.findOne)

  app.use('/api/clubes', router)
}
