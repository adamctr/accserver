module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "brands",
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
      logourl: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING(20),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      openaiapikey: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      productapilink: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      blogarticlesapilink: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      createdat: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
      updatedat: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: "brands",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "brands_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
