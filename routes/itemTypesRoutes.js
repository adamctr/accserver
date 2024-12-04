const express = require("express");
const router = express.Router();
const itemTypeController = require("../controllers/itemTypeController"); // Assurez-vous d'avoir un contrôleur pour itemTypes

// Route pour créer un nouvel itemType
router.post("/", itemTypeController.createItemType);

// Route pour récupérer tous les itemTypes
router.get("/", itemTypeController.getAllItemTypes);

// Route pour récupérer un itemType spécifique par ID
router.get("/:id", itemTypeController.getItemTypeById);

// Route pour mettre à jour un itemType spécifique par ID
router.put("/:id", itemTypeController.updateItemType);

// Route pour supprimer un itemType spécifique par ID
router.delete("/:id", itemTypeController.deleteItemType);

module.exports = router;
