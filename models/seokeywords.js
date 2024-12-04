module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "seokeywords",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      keyword: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      relevance: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      ismainkeyword: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      tableName: "seokeywords",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "seokeywords_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
