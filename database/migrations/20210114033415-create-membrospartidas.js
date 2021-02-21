'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('MembrosPartidas', {
      memberMatchId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.STRING
      },
      name: {
        references: {
          model: 'Membros',
          key: 'name'
        },
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      matchId: {
        references: {
          model: 'Partidas',
          key: 'matchId'
        },
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      passattempts: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      passesmade: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      rating: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      shots: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      goals: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      mom: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      assists: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      tackleattempts: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      tacklesmade: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      pos: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      vproattr: {
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
    return queryInterface.dropTable('MembrosPartidas')
  }
}
