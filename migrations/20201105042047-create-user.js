'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      birthday: {
        type: Sequelize.STRING
      },
      furi: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      gender: {
        type: Sequelize.STRING
      },
      university: {
        type: Sequelize.STRING
      },
      company: {
        type: Sequelize.STRING
      },
      occupation: {
        type: Sequelize.STRING
      },
      contracted_plan: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      twitter_uid: {
        type: Sequelize.STRING
      },
      facebook_uid: {
        type: Sequelize.STRING
      },
      instagram_uid: {
        type: Sequelize.STRING
      },
      note_uid: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
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
  down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};
