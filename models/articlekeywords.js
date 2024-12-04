module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "articlekeywords",
    {
      articleid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "articles",
          key: "id",
        },
      },
      keywordid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "seokeywords",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "articlekeywords",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "articlekeywords_pkey",
          unique: true,
          fields: [{ name: "articleid" }, { name: "keywordid" }],
        },
      ],
    }
  );
};
