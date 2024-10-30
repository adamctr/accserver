var DataTypes = require("sequelize").DataTypes;
var _settings = require("./settings");

function initModels(sequelize) {
  var settings = _settings(sequelize, DataTypes);


  return {
    settings,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
