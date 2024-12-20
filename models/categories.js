module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "categories",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      createdat: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "categories",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "categories_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
