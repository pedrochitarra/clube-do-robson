'use strict'

const express = require('express')
const router = express.Router()

router.use('/clubes', require('./clubes'))
router.use('/partidas', require('./partidas'))
router.use('/membros', require('./membros'))
router.use('/seasonals', require('./seasonals'))
router.use('/membrosPartidas', require('./membrosPartidas'))
router.use('/clubesPartidas', require('./clubesPartidas'))
