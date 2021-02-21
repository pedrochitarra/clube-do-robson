// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Robsoners = sequelize.define('Robsoners', {
    memberid: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    proName: DataTypes.STRING,
    number: DataTypes.INTEGER,
    birthdate: DataTypes.STRING,
    vproattr: DataTypes.STRING,
    proHeight: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    face: DataTypes.STRING,
    isfake: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    proNationality: DataTypes.INTEGER,
    proPos: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return Robsoners
}
