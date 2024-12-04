const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// Route pour créer un email pour une brand spécifique
router.post("/", mailController.createMail);

// Route pour récupérer tous les emails d'une brand spécifique
router.get("/:brandid", mailController.getAllMails);

// Route pour récupérer un email spécifique d'une brand spécifique
router.get("/:brandid/:id", mailController.getMailById);

// Route pour mettre à jour un email spécifique d'une brand spécifique
router.put("/:brandid/:id", mailController.updateMail);

// Route pour supprimer un email spécifique d'une brand spécifique
router.delete("/:brandid/:id", mailController.deleteMail);

module.exports = router;
