const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const errorHandler = require("./middlewares/errorHandler"); // Middleware de gestion des erreurs
const allRoutes = require("./routes/allRoutes.js");
//const articleRoutes = require("./routes/articleRoutes");
const { sequelize } = require("./config/db"); // Initialisation de la connexion à la base de données

// Configurations de base
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
sequelize
  .authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Routes
app.use("/api/v1", allRoutes);

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;
