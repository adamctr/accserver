// server.js
require("dotenv").config(); // Charger les variables d'environnement
const http = require("http");
const app = require("./app");

const PORT = process.env.PORT || 3000; // Port par défaut à 3000 si non spécifié

// Crée et démarre le serveur
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
