'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('events', 'draft_title', {
      type: Sequelize.STRING
    }),
      await queryInterface.addColumn('events', 'draft_description', {
        type: Sequelize.TEXT
      }),
      await queryInterface.addColumn('events', 'draft_thumbnail', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_capacity', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.addColumn('events', 'draft_url', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_category', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.addColumn('events', 'draft_entry_way', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.addColumn('events', 'draft_zipcode', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_prefecture', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_city', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_area', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_building', {
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn('events', 'draft_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.addColumn('events', 'draft_open_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.addColumn('events', 'draft_close_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.addColumn('events', 'draft_status', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.addColumn('events', 'draft_price', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.addColumn('events', 'draft_html', {
        type: Sequelize.JSON
      }),
      await queryInterface.addColumn('events', 'draft_organizer', {
        type: Sequelize.STRING
      })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('events', 'draft_title', {
      type: Sequelize.STRING
    }),
      await queryInterface.removeColumn('events', 'draft_description', {
        type: Sequelize.TEXT
      }),
      await queryInterface.removeColumn('events', 'draft_thumbnail', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_capacity', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.removeColumn('events', 'draft_url', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_category', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.removeColumn('events', 'draft_entry_way', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.removeColumn('events', 'draft_zipcode', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_prefecture', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_city', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_area', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_building', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.removeColumn('events', 'draft_open_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.removeColumn('events', 'draft_close_date', {
        type: Sequelize.DATE
      }),
      await queryInterface.removeColumn('events', 'draft_status', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.removeColumn('events', 'draft_price', {
        type: Sequelize.INTEGER
      }),
      await queryInterface.removeColumn('events', 'draft_html', {
        type: Sequelize.STRING
      }),
      await queryInterface.removeColumn('events', 'draft_organizer', {
        type: Sequelize.STRING
      })
  }
};
