module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "itemtypes",
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
    },
    {
      sequelize,
      tableName: "itemtypes",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "itemtypes_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
