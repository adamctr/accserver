const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

// Route pour créer un nouveau mail
router.get("/:id", brandController.getBrandSettings);

router.post("/", brandController.addBrandSettings);

module.exports = router;
