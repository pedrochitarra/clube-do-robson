'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('ClubesPartidas', {
      clubMatchId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      clubId: {
        references: {
          model: 'Clubes',
          key: 'clubId'
        },
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
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
        type: Sequelize.DataTypes.INTEGER
      },
      passsesmade: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      rating: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      shots: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      goals: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      goalsConceded: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      assists: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      tackleattempts: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      tacklesmade: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
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
    return queryInterface.dropTable('ClubesPartidas')
  }
}
