const { sequelize, DataTypes } = require("../config/db");
const Mail = require("../models/mails")(sequelize, DataTypes); // Modèle Mail correspondant à la table "mails"

// Créer un nouvel email
exports.createMail = async (req, res) => {
  try {
    const {
      subject,
      structure,
      content,
      topic,
      type,
      status,
      brandId,
      itemTypeId,
    } = req.body;

    const newMail = await Mail.create({
      subject,
      structure,
      content,
      topic,
      type,
      status,
      brandId,
      itemTypeId,
      createdat: new Date(),
      updatedat: new Date(),
    });

    res.status(201).json(newMail);
  } catch (error) {
    console.error("Error in createMail:", error);
    res.status(500).json({ message: "Error creating mail", error });
  }
};

// Récupérer tous les emails
exports.getMails = async (req, res) => {
  try {
    const mails = await Mail.findAll();
    res.status(200).json(mails);
  } catch (error) {
    console.error("Error in getMails:", error);
    res.status(500).json({ message: "Error retrieving mails", error });
  }
};

// Récupérer un email par ID
exports.getMailById = async (req, res) => {
  try {
    const { id } = req.params;
    const mail = await Mail.findOne({ where: { id } });

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.status(200).json(mail);
  } catch (error) {
    console.error("Error in getMailById:", error);
    res.status(500).json({ message: "Error retrieving mail", error });
  }
};

// Mettre à jour un email par ID
exports.updateMail = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      subject,
      structure,
      content,
      topic,
      type,
      status,
      brandId,
      itemTypeId,
    } = req.body;

    const updatedMail = await Mail.update(
      {
        subject,
        structure,
        content,
        topic,
        type,
        status,
        brandId,
        itemTypeId,
        updatedat: new Date(),
      },
      { where: { id }, returning: true }
    );

    if (updatedMail[0] === 0) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.status(200).json(updatedMail[1][0]); // Renvoie l'email mis à jour
  } catch (error) {
    console.error("Error in updateMail:", error);
    res.status(500).json({ message: "Error updating mail", error });
  }
};

// Supprimer un email par ID
exports.deleteMail = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Mail.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMail:", error);
    res.status(500).json({ message: "Error deleting mail", error });
  }
};
