// allRoutes.js
const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/authenticateToken");
// Import des routes spécifiques
//const mailRoutes = require("./routes/mailRoutes");
//const articleRoutes = require("./routes/articleRoutes");
const brandRoutes = require("./brandRoutes");
const userRoutes = require("./userRoutes");
const mailRoutes = require("./mailRoutes");
const itemTypesRoutes = require("./itemTypesRoutes.js");

// Définissez les routes sous des chemins spécifiques
//router.use("/mails", mailRoutes); // Toutes les routes de mails seront sous "/api/mails"
//router.use("/articles", articleRoutes); // Toutes les routes d'articles seront sous "/api/articles"
router.use("/brands", authenticateToken, brandRoutes);
router.use("/users", userRoutes);
router.use("/mails", authenticateToken, mailRoutes);
router.use("/itemtypes", authenticateToken, itemTypesRoutes);

// Export du routeur combiné
module.exports = router;
