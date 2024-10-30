// allRoutes.js
const express = require("express");
const router = express.Router();

// Import des routes spécifiques
//const mailRoutes = require("./routes/mailRoutes");
//const articleRoutes = require("./routes/articleRoutes");
const settingsRoutes = require("./settingsRoutes");

// Définissez les routes sous des chemins spécifiques
//router.use("/mails", mailRoutes); // Toutes les routes de mails seront sous "/api/mails"
//router.use("/articles", articleRoutes); // Toutes les routes d'articles seront sous "/api/articles"
router.use("/settings", settingsRoutes); // Toutes les routes d'articles seront sous "/api/articles"

// Export du routeur combiné
module.exports = router;
