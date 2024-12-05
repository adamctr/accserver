// controllers/brandController.js

const { sequelize } = require("../models/index");
const { brands } = sequelize.models; // Utilisation du nom du modèle tel quel

// Fonction pour récupérer toutes les brands d'un utilisateur spécifique
exports.getBrands = async (req, res) => {
  try {
    const userId = req.user.id; // Assurez-vous que le middleware d'authentification attache l'utilisateur à req.user
    const brandsList = await brands.findAll({ where: { userid: userId } }); // Récupère les marques de l'utilisateur authentifié
    res.status(200).json(brandsList); // Renvoie les marques sous forme de JSON
  } catch (error) {
    console.error("Error in getBrands:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error retrieving brands", error });
  }
};

// Fonction pour récupérer les paramètres d'une brand spécifique
exports.getBrandSettings = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID de la marque à partir des paramètres de la requête
    const userId = req.user.id; // Assurez-vous que l'utilisateur est authentifié et autorisé à accéder à cette brand
    const brand = await brands.findOne({ where: { id: id, userid: userId } });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error in getBrandSettings:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error retrieving brand settings", error });
  }
};

// Nouvelle Fonction `addBrand` qui prend uniquement `name` et `userid`
exports.addBrand = async (req, res) => {
  try {
    const { name } = req.body; // Extraire uniquement 'name' et 'userid'
    const userid = req.user.id;
    // Validation des entrées
    if (!name || !userid) {
      return res.status(400).json({
        message: "Le nom de la brand et l'ID de l'utilisateur sont requis.",
      });
    }

    // Optionnel : Vérifier si la brand existe déjà pour cet utilisateur
    const existingBrand = await brands.findOne({
      where: { name: name, userid: userid },
    });
    if (existingBrand) {
      return res.status(400).json({
        message: "Une brand avec ce nom existe déjà pour cet utilisateur.",
      });
    }

    // Créez une nouvelle brand avec 'name' et 'userid'
    const newBrand = await brands.create({
      name,
      userid,
    });

    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error in addBrand:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error adding brand", error });
  }
};

// Fonction pour ajouter les paramètres d'une brand (anciennement addBrandSettings)
exports.addBrandSettings = async (req, res) => {
  try {
    const {
      name,
      logourl,
      email,
      phone,
      address,
      openaiapikey,
      productapilink,
      blogarticlesapilink,
      userid,
    } = req.body;

    // Validation des entrées (optionnel)
    if (!name || !userid) {
      return res.status(400).json({
        message: "Le nom de la brand et l'ID de l'utilisateur sont requis.",
      });
    }

    // Optionnel : Vérifier si la brand existe déjà pour cet utilisateur
    const existingBrand = await brands.findOne({
      where: { name: name, userid: userid },
    });
    if (existingBrand) {
      return res.status(400).json({
        message: "Une brand avec ce nom existe déjà pour cet utilisateur.",
      });
    }

    // Créez une nouvelle brand avec tous les paramètres
    const newBrandSettings = await brands.create({
      name,
      logourl,
      email,
      phone,
      address,
      openaiapikey,
      productapilink,
      blogarticlesapilink,
      userid,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    res.status(201).json(newBrandSettings);
  } catch (error) {
    console.error("Error in addBrandSettings:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error adding brand settings", error });
  }
};

// Fonction pour mettre à jour une brand spécifique
exports.updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body; // Exemple : Mise à jour uniquement du nom

    const userId = req.user.id;
    const brand = await brands.findOne({ where: { id: id, userid: userId } });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    // Mettre à jour les champs nécessaires
    brand.name = name || brand.name;
    brand.updatedAt = new Date();

    await brand.save();

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error in updateBrand:", error);
    res.status(500).json({ message: "Error updating brand", error });
  }
};

// Fonction pour supprimer une brand spécifique
exports.deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const brand = await brands.findOne({ where: { id: id, userid: userId } });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    await brand.destroy();

    res.status(200).json({ message: "Brand deleted successfully" });
  } catch (error) {
    console.error("Error in deleteBrand:", error);
    res.status(500).json({ message: "Error deleting brand", error });
  }
};

// Fonction pour rechercher une brand par son nom (slug)
exports.searchBrand = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res
        .status(400)
        .json({ message: "Le nom de la brand est requis." });
    }

    // Transformer le nom en slug (remplace les espaces par des tirets)
    const slug = name.replace(/\s+/g, "-").toLowerCase();

    // Recherche dans la base de données par le slug
    const brand = await brands.findOne({
      where: sequelize.where(
        sequelize.fn(
          "replace",
          sequelize.fn("lower", sequelize.col("name")),
          " ",
          "-"
        ),
        slug
      ),
    });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error in searchBrand:", error);
    res.status(500).json({ message: "Error searching brand", error });
  }
};
