const { sequelize } = require("../models/index");
const { users } = sequelize.models;

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newusers = await users.create({
      username,
      email,
      password,
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
    const Users = await users.findAll();
    res.status(200).json(Users);
  } catch (error) {
    console.error("Error in getuserss:", error);
    res.status(500).json({ message: "Error retrieving userss", error });
  }
};

// Fonction pour récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const Users = await users.findOne({ where: { id } });

    if (!Users) {
      return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getusersById:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};
