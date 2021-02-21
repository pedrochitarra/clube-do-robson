// const sequelize = require("sequelize");
// import { Partidas, Membros } from '../models'

module.exports = (sequelize, DataTypes) => {
  const MembrosPartidas = sequelize.define('MembrosPartidas', {
    memberMatchId: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    passattempts: DataTypes.STRING,
    passesmade: DataTypes.STRING,
    rating: DataTypes.STRING,
    shots: DataTypes.INTEGER,
    goals: DataTypes.STRING,
    mom: DataTypes.STRING,
    assists: DataTypes.STRING,
    tackleattempts: DataTypes.INTEGER,
    tacklesmade: DataTypes.INTEGER,
    pos: DataTypes.STRING,
    vproattr: DataTypes.STRING,
    name: DataTypes.INTEGER,
    matchId: DataTypes.INTEGER,
    clubid: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  MembrosPartidas.associate = (models) => {
    MembrosPartidas.belongsTo(models.Membros, {
      foreignKey: 'name',
      as: 'membrosPartidasMembros'
    })

    MembrosPartidas.belongsTo(models.Partidas, {
      foreignKey: 'matchId'
    })
  }

  return MembrosPartidas
}
