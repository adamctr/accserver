const { sequelize, DataTypes } = require("../config/db");
const User = require("../models/users")(sequelize, DataTypes); // Modèle User correspondant à la table "users"

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await User.create({
      username,
      email,
      password, // Assurez-vous de hacher le mot de passe avant de le stocker en production
      createdat: new Date(),
      updatedat: new Date(),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error in createUser:", error);
    res.status(500).json({ message: "Error creating user", error });
  }
};

// Fonction pour récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUsers:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getUserById:", error);
    res.status(500).json({ message: "Error retrieving user", error });
  }
};
