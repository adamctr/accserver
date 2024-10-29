const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController"); // Import du contrôleur

// Route pour créer un nouveau mail
router.post("/", mailController.createMail);

// Route pour obtenir tous les mails
router.get("/", mailController.getAllMails);

// Route pour obtenir un mail par ID
router.get("/:id", mailController.getMailById);

// Route pour mettre à jour un mail par ID
router.put("/:id", mailController.updateMail);

// Route pour supprimer un mail par ID
router.delete("/:id", mailController.deleteMail);

module.exports = router;
