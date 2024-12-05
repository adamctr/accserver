const express = require("express");
const router = express.Router();
const brandController = require("../controllers/brandController");

// Route pour créer un nouveau mail
router.get("/", brandController.getBrands);

router.get("/brandsearch/:name", brandController.searchBrand);

//router.get("/:id", brandController.getBrandSettings);
router.post("/addbrandname", brandController.addBrand);

router.post("/", brandController.addBrandSettings);

module.exports = router;
