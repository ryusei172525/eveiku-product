'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('event_templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      event_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'events',
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
      theme_color: {
        type: Sequelize.INTEGER
      },
      html: {
        type: Sequelize.JSON
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
    await queryInterface.dropTable('event_templates');
  }
};