// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Partidas = sequelize.define('Partidas', {
    matchId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    timestamp: DataTypes.INTEGER,
    homeClub: DataTypes.STRING,
    awayClub: DataTypes.STRING,
    homeGoals: DataTypes.STRING,
    awayGoals: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  Partidas.associate = (models) => {
    Partidas.hasMany(models.MembrosPartidas, {
      foreignKey: 'matchId',
      as: 'partidasMembrosPartidas'
    })

    Partidas.hasMany(models.ClubesPartidas, {
      foreignKey: 'matchId',
      as: 'partidasClubesPartidas'
    })

    Partidas.belongsTo(models.Clubes, {
      foreignKey: 'homeClub',
      as: 'partidasHomeClub'
    })

    Partidas.belongsTo(models.Clubes, {
      foreignKey: 'awayClub',
      as: 'partidasAwayClub'
    })
  }

  return Partidas
}
