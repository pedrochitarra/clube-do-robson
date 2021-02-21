// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Clubes = sequelize.define('Clubes', {
    clubId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    regionId: DataTypes.STRING,
    teamId: DataTypes.STRING,
    stadname: DataTypes.STRING,
    iscustomteam: DataTypes.INTEGER,
    standardcrestid: DataTypes.INTEGER,
    customcrestid: DataTypes.INTEGER,
    kitcolor1: DataTypes.STRING,
    kitcolor2: DataTypes.STRING,
    kitcolor3: DataTypes.STRING,
    kitacolor1: DataTypes.INTEGER,
    kitacolor2: DataTypes.INTEGER,
    kitacolor3: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return Clubes
}
