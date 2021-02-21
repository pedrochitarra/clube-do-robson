// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Membros = sequelize.define('Membros', {
    name: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    gamesPlayed: DataTypes.STRING,
    winRate: DataTypes.STRING,
    goals: DataTypes.STRING,
    assists: DataTypes.STRING,
    cleanSheetsDef: DataTypes.STRING,
    cleanSheetsGK: DataTypes.STRING,
    shotSuccessRate: DataTypes.STRING,
    passesMade: DataTypes.STRING,
    passSuccessRate: DataTypes.STRING,
    tacklesMade: DataTypes.STRING,
    tackleSuccessRate: DataTypes.STRING,
    proName: DataTypes.STRING,
    proPos: DataTypes.STRING,
    proStyle: DataTypes.STRING,
    proHeight: DataTypes.STRING,
    proNationality: DataTypes.STRING,
    proOverall: DataTypes.STRING,
    manOfTheMatch: DataTypes.STRING,
    redCards: DataTypes.STRING,
    clubid: DataTypes.INTEGER,
    favoritePosition: DataTypes.STRING
  })

  Membros.associate = (models) => {
    Membros.belongsTo(models.Clubes, {
      foreignKey: 'clubid',
      as: 'membrosClubes'
    })
    Membros.hasMany(models.MembrosPartidas, {
      foreignKey: 'name',
      as: 'membrosMembrosPartidas'
    })
  }

  return Membros
}
