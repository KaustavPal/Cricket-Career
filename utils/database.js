const Sequelize = require("sequelize");

const sequelize = new Sequelize("cricket_career", "root", "8100472356", {
  dialect: "mysql",
  host: "localhost",
  // logging: false,
});

module.exports = sequelize;
