const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('itemtype', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'itemtype',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "itemtype_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
