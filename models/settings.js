module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "settings",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      logo: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      brand_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      openai_api_key: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      product_api_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      blog_articles_api_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "settings",
      schema: "public",
      timestamps: false,
      indexes: [
        {
          name: "settings_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
