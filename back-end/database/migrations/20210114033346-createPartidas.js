'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Partidas', {
      matchId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING
      },
      timestamp: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      homeClub: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      awayClub: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      homeGoals: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      awayGoals: {
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
    return queryInterface.dropTable('Partidas')
  }
}
