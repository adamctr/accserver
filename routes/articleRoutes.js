const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

// Route pour créer un article pour une brand spécifique
router.post("/", articleController.createArticle);

// Route pour récupérer tous les articles d'une brand spécifique
router.get("/:brandid", articleController.getAllArticles);

// Route pour récupérer un article spécifique d'une brand spécifique
router.get("/:brandid/:id", articleController.getArticleById);

// Route pour mettre à jour un article spécifique d'une brand spécifique
router.put("/:brandid/:id", articleController.updateArticle);

// Route pour supprimer un article spécifique d'une brand spécifique
router.delete("/:brandid/:id", articleController.deleteArticle);

module.exports = router;
