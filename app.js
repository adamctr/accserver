const express = require("express");
const { DataTypes, Op } = require("Sequelize");
const app = express();
const db = require("./models");
const PORT = process.env.PORT || 3000;
const cors = require("cors");

// Middleware pour parser les données JSON
app.use(express.json());

app.use(cors());

// Requires des routes
const allRoutes = require("./routes/allRoutes");

// Routes
app.use("/api/v1", allRoutes);

// Gérer les erreurs 404
app.use((req, res, next) => {
  res.status(404).json({ message: "Ressource non trouvée" });
});

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Lancer le serveur
db.sequelize.sync().then((req) => {
  app.listen(PORT, () => {
    console.log(`Serveur lancé sur le port ${PORT}`);
  });
});
