// models/mail.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import de l'instance Sequelize

const Mail = sequelize.define(
  "Mail",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    structure: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    topic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "ItemType", // Assurez-vous que le modèle ItemType existe
        key: "id",
      },
    },
  },
  {
    tableName: "Mail", // Nom de la table dans la base de données
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

module.exports = Mail;
