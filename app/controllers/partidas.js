
const logger = require('../../common/logger')
const { Partidas } = require('../models')

exports.findOne = async (req, res) => {
  try {
    logger.debug(Partidas)

    const partidaId = req.params.partidaId
    logger.warn(req.params)

    const partida = await Partidas.findAll({
      where: {
        matchId: partidaId
      },
      include: [
        { association: 'partidasHomeClub' },
        { association: 'partidasAwayClub' },
        { association: 'partidasClubesPartidas' },
        { association: 'partidasMembrosPartidas', include: [{ association: 'membrosPartidasMembros' }] }
      ]
    })

    res.send(partida)
  } catch (err) {
    logger.error(err)
    res.status(500).send({
      message: 'Não foi possível encontrar a partida com id ' + req.params.partidaId
    })
  }
}
