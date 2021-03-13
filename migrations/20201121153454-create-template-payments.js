'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('template_payments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      template_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'templates',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      price: {
        type: Sequelize.INTEGER
      },
      payjp_token: {
        type: Sequelize.STRING
      },
      refund: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('template_payments');
  }
};