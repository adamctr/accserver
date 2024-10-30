const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('article', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    topic: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    structure: {
      type: DataTypes.JSON,
      allowNull: true
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    seokeywords: {
      type: DataTypes.JSON,
      allowNull: true
    },
    metadescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    readtime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    },
    itemtypeid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'itemtype',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'article',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "article_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
