const { sequelize } = require("../models/index");
const { articles, brands } = sequelize.models; // Assurez-vous que le modèle est nommé 'articles'

// Fonction pour créer un article
exports.createArticle = async (req, res) => {
  try {
    const { brandid, title, content } = req.body;

    if (!brandid || !title || !content) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    // Optionnel : Vérifier si la brand existe
    const brand = await brands.findOne({ where: { id: brandid } });
    if (!brand) {
      return res.status(404).json({ message: "Brand non trouvée" });
    }

    const newArticle = await articles.create({
      brandid,
      title,
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Préparer la réponse sans les informations sensibles si nécessaire
    res.status(201).json(newArticle);
  } catch (error) {
    console.error("Error in createArticle:", error);
    res.status(500).json({ message: "Error creating article", error });
  }
};

// Fonction pour récupérer tous les articles d'une brand spécifique
exports.getAllArticles = async (req, res) => {
  try {
    const { brandid } = req.params;
    const articlesList = await articles.findAll({ where: { brandid } });
    res.status(200).json(articlesList);
  } catch (error) {
    console.error("Error in getAllArticles:", error);
    res.status(500).json({ message: "Error retrieving articles", error });
  }
};

// Fonction pour récupérer un article spécifique d'une brand spécifique
exports.getArticleById = async (req, res) => {
  try {
    const { brandid, id } = req.params;
    const article = await articles.findOne({ where: { brandid, id } });

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    res.status(200).json(article);
  } catch (error) {
    console.error("Error in getArticleById:", error);
    res.status(500).json({ message: "Error retrieving article", error });
  }
};

// Fonction pour mettre à jour un article spécifique d'une brand spécifique
exports.updateArticle = async (req, res) => {
  try {
    const { brandid, id } = req.params;
    const { title, content } = req.body;

    const article = await articles.findOne({ where: { brandid, id } });

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    // Mettre à jour les champs nécessaires
    article.title = title || article.title;
    article.content = content || article.content;
    article.updatedAt = new Date();

    await article.save();

    res.status(200).json(article);
  } catch (error) {
    console.error("Error in updateArticle:", error);
    res.status(500).json({ message: "Error updating article", error });
  }
};

// Fonction pour supprimer un article spécifique d'une brand spécifique
exports.deleteArticle = async (req, res) => {
  try {
    const { brandid, id } = req.params;

    const article = await articles.findOne({ where: { brandid, id } });

    if (!article) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    await article.destroy();

    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error("Error in deleteArticle:", error);
    res.status(500).json({ message: "Error deleting article", error });
  }
};
