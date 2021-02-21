// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const ClubesPartidas = sequelize.define('ClubesPartidas', {
    clubMatchId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    clubId: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    seasonid: DataTypes.INTEGER,
    passattempts: DataTypes.INTEGER,
    passesmade: DataTypes.INTEGER,
    rating: DataTypes.STRING,
    shots: DataTypes.INTEGER,
    goals: DataTypes.INTEGER,
    goalsConceded: DataTypes.INTEGER,
    assists: DataTypes.INTEGER,
    tackleattempts: DataTypes.INTEGER,
    tacklesmade: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  ClubesPartidas.associate = (models) => {
    ClubesPartidas.belongsTo(models.Partidas, {
      foreignKey: 'matchId',
      as: 'clubesPartidasPartidas'
    })

    ClubesPartidas.belongsTo(models.Clubes, {
      foreignKey: 'clubId',
      as: 'clubesPartidasClubes'
    })
  }

  return ClubesPartidas
}
