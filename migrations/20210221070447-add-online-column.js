'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('events', 'online_url', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('events', 'draft_online_url', {
      type: Sequelize.STRING
    })
    await queryInterface.addColumn('events', 'online_price', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('events', 'draft_online_price', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('events', 'online_capacity', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('events', 'draft_online_capacity', {
      type: Sequelize.INTEGER
    })
    await queryInterface.addColumn('participants', 'form', {
      type: Sequelize.STRING
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.remove('events', 'online_url')
    await queryInterface.remove('events', 'draft_online_url')
    await queryInterface.remove('events', 'online_price')
    await queryInterface.remove('events', 'draft_online_price')
    await queryInterface.remove('events', 'online_capacity')
    await queryInterface.remove('events', 'draft_online_capacity')
    await queryInterface.remove('participants', 'form')
  }
};