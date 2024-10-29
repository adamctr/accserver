const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nom de la base de données
  process.env.DB_USER, // Nom de l'utilisateur
  process.env.DB_PASSWORD, // Mot de passe de l'utilisateur
  {
    host: process.env.DB_HOST, // Hôte de la base de données (par exemple, localhost)
    port: process.env.DB_PORT || 5432, // Port de la base de données (par défaut 5432 pour PostgreSQL)
    dialect: "postgres", // Type de base de données utilisé
    logging: false, // Désactiver le logging SQL (facultatif)
  }
);

// Vérifier la connexion
sequelize
  .authenticate()
  .then(() =>
    console.log("Database connection has been established successfully.")
  )
  .catch((error) => console.error("Unable to connect to the database:", error));

module.exports = sequelize;
