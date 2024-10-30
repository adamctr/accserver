const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('externalproducts', {
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
    imagelink: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    storeurl: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    sku: {
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
    tableName: 'externalproducts',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "externalproducts_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
