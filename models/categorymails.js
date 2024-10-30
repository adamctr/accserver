const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('categorymails', {
    mailid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mails',
        key: 'id'
      }
    },
    categoryid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'categories',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'categorymails',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "categorymails_pkey",
        unique: true,
        fields: [
          { name: "mailid" },
          { name: "categoryid" },
        ]
      },
    ]
  });
};
