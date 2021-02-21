// const sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Estadios = sequelize.define('Estadios', {
    stadium_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    name: DataTypes.STRING,
    home_team: DataTypes.INTEGER,
    capacity: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  })

  return Estadios
}
