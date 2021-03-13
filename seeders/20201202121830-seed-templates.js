"use strict";
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const html = fs.readFileSync("./seeders/template1.txt", "utf-8");
    return queryInterface.bulkInsert(
      "templates",
      [
        {
          title: "template1",
          description: "template1です。",
          html,
          created_at: new Date(),
          updated_at: new Date()
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
