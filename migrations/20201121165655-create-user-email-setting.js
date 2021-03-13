'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_email_settings', {
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
      when_followed: {
        type: Sequelize.BOOLEAN
      },
      when_messages: {
        type: Sequelize.BOOLEAN
      },
      when_contacted: {
        type: Sequelize.BOOLEAN
      },
      when_purchased: {
        type: Sequelize.BOOLEAN
      },
      when_interested: {
        type: Sequelize.BOOLEAN
      },
      when_paid: {
        type: Sequelize.BOOLEAN
      },
      when_canceled: {
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
    await queryInterface.dropTable('user_email_settings');
  }
};