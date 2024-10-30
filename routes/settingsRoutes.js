const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settingsController"); // Import du contrôleur

// Route pour créer un nouveau mail
router.get("/", settingsController.getSettings);

router.post("/", settingsController.addSettings);

module.exports = router;
