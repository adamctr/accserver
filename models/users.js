module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "users",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: "users_email_key",
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
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
      tableName: "users",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "users_email_key",
          unique: true,
          fields: [{ name: "email" }],
        },
        {
          name: "users_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
        {
          name: "users_username_key",
          unique: true,
          fields: [{ name: "username" }],
        },
      ],
    }
  );
};
