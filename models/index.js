const Sequelize = require("sequelize");
const { initModels } = require("./init-models");
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const models = initModels(sequelize);
db.models = models;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
