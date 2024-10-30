const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('mailcategory', {
    mailid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'mail',
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
    tableName: 'mailcategory',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mailcategory_pkey",
        unique: true,
        fields: [
          { name: "mailid" },
          { name: "categoryid" },
        ]
      },
    ]
  });
};
