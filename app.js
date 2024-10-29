// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//const { errorHandler } = require("./middlewares/errorHandler"); // Middleware de gestion des erreurs
const mailRoutes = require("./routes/mailRoutes");
//const articleRoutes = require("./routes/articleRoutes");
const db = require("./config/db"); // Initialisation de la connexion à la base de données

// Configurations de base
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connexion à la base de données
db.authenticate()
  .then(() => console.log("Database connected..."))
  .catch((err) => console.log("Error: " + err));

// Routes
app.use("/api/mails", mailRoutes); // Routes pour les mails
app.use("/api/articles", articleRoutes); // Routes pour les articles

// Gestionnaire d'erreurs global
app.use(errorHandler);

module.exports = app;
