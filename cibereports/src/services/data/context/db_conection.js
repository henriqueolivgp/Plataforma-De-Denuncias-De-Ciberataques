const Sequelize = require("sequelize");

const pool = new Sequelize({
  host: "localhost",
  port: "3306",
  username: "henry",
  password: "457832",
  database: "ciberreports",
  dialect: "mysql",
});

module.exports = pool;
 