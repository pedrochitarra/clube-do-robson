module.exports = app => {
  const clubesPartidasController = require('../controllers/clubesPartidas')
  const router = require('express').Router()

  router.get('/seasons/:clubId', clubesPartidasController.findSeasons)
  router.get('/:id', clubesPartidasController.findOne)
  router.get('/:clubId/:seasonId', clubesPartidasController.getBySeason)

  app.use('/api/clubesPartidas', router)
}
