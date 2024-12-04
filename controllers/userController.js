const { sequelize } = require("../models/index");
const { users } = sequelize.models;

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { usersname, email, password } = req.body;

    const newusers = await users.create({
      usersname,
      email,
      password, // Assurez-vous de hacher le mot de passe avant de le stocker en production
      createdat: new Date(),
      updatedat: new Date(),
    });

    res.status(201).json(newusers);
  } catch (error) {
    console.error("Error in createusers:", error);
    res.status(500).json({ message: "Error creating users", error });
  }
};

// Fonction pour récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const userss = await users.findAll();
    res.status(200).json(userss);
  } catch (error) {
    console.error("Error in getuserss:", error);
    res.status(500).json({ message: "Error retrieving userss", error });
  }
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const users = await users.findOne({ where: { id } });

    if (!users) {
      return res.status(404).json({ message: "users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getusersById:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
