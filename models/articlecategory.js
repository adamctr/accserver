const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('articlecategory', {
    articleid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'article',
        key: 'id'
      }
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'category',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'articlecategory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "articlecategory_pkey",
        unique: true,
        fields: [
          { name: "articleid" },
          { name: "categoryid" },
        ]
      },
    ]
  });
};
