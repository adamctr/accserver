const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour créer un utilisateur
router.post("/", userController.createUser);

// Route pour récupérer tous les utilisateurs
router.get("/", userController.getUsers);

// Route pour récupérer un utilisateur par son ID
router.get("/:id", userController.getUserById);

module.exports = router;
