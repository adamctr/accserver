const { sequelize } = require("../models/index");
const { brands } = sequelize.models;

exports.getBrands = async (req, res) => {
  try {
    const brands = await brands.findAll(); // Récupère toutes les marques
    res.status(200).json(brands); // Renvoie les marques sous forme de JSON
  } catch (error) {
    console.error("Error in getBrands:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error retrieving brands", error });
  }
};

exports.getBrandSettings = async (req, res) => {
  try {
    const { id } = req.params; // Récupérer l'ID de la marque à partir des paramètres de la requête
    const brand = await brands.findOne({ where: { id: id } });

    if (!brand) {
      return res.status(404).json({ message: "Brand not found" });
    }

    res.status(200).json(brand);
  } catch (error) {
    console.error("Error in getBrandSettings:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error retrieving brand settings", error });
  }
};

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

    // Créez une nouvelle marque
    const newBrand = await brands.create({
      name,
      logourl,
      email,
      phone,
      address,
      openaiapikey,
      productapilink,
      blogarticlesapilink,
      userid,
    });

    res.status(201).json(newBrand);
  } catch (error) {
    console.error("Error in addBrandSettings:", error); // Log d'erreur direct
    res.status(500).json({ message: "Error adding brand settings", error });
  }
};
