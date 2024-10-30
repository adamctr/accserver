const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('externalposts', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    metadescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    storeurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    categories: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    brandid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'brands',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'externalposts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "externalposts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
