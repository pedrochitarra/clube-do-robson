'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Membros', {
      name: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING
      },
      gamesPlayed: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      winRate: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      goals: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      assists: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      cleanSheetsDef: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      cleanSheetsGK: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      shotSuccessRate: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      passesMade: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      passSuccessRate: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      tacklesMade: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      tackleSuccessRate: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proName: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proPos: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proStyle: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proHeight: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proNationality: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      proOverall: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      manOfTheMatch: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      redCards: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      favoritePosition: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.fn('now')
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Membros')
  }
}
