const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const token = req.cookies.token; // Récupérer le JWT depuis les cookies

  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET); // Valide le token
    req.user = user; // Attache les informations utilisateur au req
    next(); // Passe au prochain middleware ou contrôleur
  } catch (error) {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authenticateToken;
