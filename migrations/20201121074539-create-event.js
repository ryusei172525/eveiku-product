'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('events', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        onDelete: 'cascade',
        onUpdate: 'cascade'
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
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      capacity: {
        type: Sequelize.INTEGER
      },
      url: {
        type: Sequelize.STRING
      },
      category: {
        type: Sequelize.INTEGER
      },
      entry_way: {
        type: Sequelize.INTEGER
      },
      zipcode: {
        type: Sequelize.STRING
      },
      prefecture: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      area: {
        type: Sequelize.STRING
      },
      building: {
        type: Sequelize.STRING
      },
      date: {
        type: Sequelize.DATE
      },
      open_date: {
        type: Sequelize.DATE
      },
      close_date: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('events');
  }
};