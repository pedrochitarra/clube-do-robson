// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Seasonals = sequelize.define('Seasonals', {
    clubid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    seasons: DataTypes.INTEGER,
    titleswon: DataTypes.INTEGER,
    leaguewins: DataTypes.INTEGER,
    divswon1: DataTypes.INTEGER,
    divswon2: DataTypes.INTEGER,
    divswon3: DataTypes.INTEGER,
    divswon4: DataTypes.INTEGER,
    promotions: DataTypes.INTEGER,
    holds: DataTypes.INTEGER,
    relegations: DataTypes.INTEGER,
    rankingpoints: DataTypes.INTEGER,
    bestdivision: DataTypes.INTEGER,
    bestpoints: DataTypes.INTEGER,
    starlevel: DataTypes.INTEGER,
    alltimegoals: DataTypes.INTEGER,
    alltimegoalsagainst: DataTypes.INTEGER,
    skill: DataTypes.INTEGER,
    wins: DataTypes.INTEGER,
    ties: DataTypes.INTEGER,
    losses: DataTypes.INTEGER,
    currentdivision: DataTypes.INTEGER,
    totalgames: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return Seasonals
}
