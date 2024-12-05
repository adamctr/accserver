const { sequelize } = require("../models/index");
const { users } = sequelize.models;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

// Fonction pour créer un utilisateur
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const existingUser = await users.findOne({
      where: {
        [sequelize.Sequelize.Op.or]: [{ email }, { username }],
      },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "L'email ou le nom d'utilisateur est déjà utilisé" });
    }

    // Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await users.create({
      username,
      email,
      password: hashedPassword,
      createdat: new Date(),
      updatedat: new Date(),
    });

    // Préparer la réponse sans le mot de passe
    const userResponse = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
    };

    res.status(201).json(userResponse);
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
    const user = await users.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error in getuserbyid:", error);
    res.status(500).json({ message: "Error retrieving users", error });
  }
};

// Fonction pour connecter un utilisateur (login)
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Vérifier si l'utilisateur existe
    const user = await users.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe invalide" });
    }

    const validPassword = async (user, password) => {
      return await bcrypt.compare(password, user.password);
    };

    // Vérifier le mot de passe
    const isMatch = await validPassword(user, password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "Email ou mot de passe invalide" });
    }

    // Générer le JWT
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    // Envoyer le token dans un cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "Strict", // Ajustez selon vos besoins ('Lax' ou 'Strict')
      maxAge: 3600000, // 1 heure
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

// Fonction pour déconnecter un utilisateur (logout)
exports.logoutUser = (req, res) => {
  try {
    // Efface le cookie 'token' du navigateur
    res.clearCookie("token", {
      httpOnly: true,
      secure: false, // Assurez-vous que cela correspond à votre configuration actuelle
      sameSite: "Strict", // Ajustez selon vos besoins ('Lax' ou 'Strict')
    });

    res.status(200).json({ message: "Déconnexion réussie" });
  } catch (error) {
    console.error("Error in logoutUser:", error);
    res.status(500).json({ message: "Error logging out", error });
  }
};
