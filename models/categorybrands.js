module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "categorybrands",
    {
      brandid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: "brands",
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
      tableName: "categorybrands",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "categorybrands_pkey",
          unique: true,
          fields: [{ name: "brandid" }, { name: "categoryid" }],
        },
      ],
    }
  );
};
