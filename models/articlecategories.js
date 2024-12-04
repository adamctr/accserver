module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "articlecategories",
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
      categoryid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "categories",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "articlecategories",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "articlecategories_pkey",
          unique: true,
          fields: [{ name: "articleid" }, { name: "categoryid" }],
        },
      ],
    }
  );
};
