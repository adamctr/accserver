const { sequelize, DataTypes } = require("../config/db");
const Settings = require("../models/settings")(sequelize, DataTypes);

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();
    res.status(200).json(settings);
  } catch (error) {
    console.error("Error in getSettings:", error); // Log d'erreur direct

    res.status(500).json({ message: "Error retrieving settings", error });
  }
};

exports.addSettings = async (req, res) => {
  try {
    const {
      logo,
      brand_name,
      email,
      phone,
      address,
      openai_api_key,
      product_api_link,
      blog_articles_api_link,
    } = req.body;

    // Créez une nouvelle entrée dans Settings
    const newSettings = await Settings.create({
      logo,
      brand_name,
      email,
      phone,
      address,
      openai_api_key,
      product_api_link,
      blog_articles_api_link,
    });

    res.status(201).json(newSettings);
  } catch (error) {
    console.error("Error in addSettings:", error); // Log d'erreur direct

    res.status(500).json({ message: "Error adding settings", error });
  }
};
