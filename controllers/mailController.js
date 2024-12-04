const { sequelize } = require("../models/index");
const { mails } = sequelize.models;

// Créer un nouvel email pour une brand spécifique
exports.createMail = async (req, res) => {
  try {
    const {
      subject,
      structure,
      content,
      topic,
      type,
      status,
      brandid, // Utilise brandid depuis le corps de la requête
      itemtypeid,
    } = req.body;

    // Validation : Assurez-vous que brandid est fourni et n'est pas null
    if (brandid === undefined || brandid === null) {
      return res.status(400).json({ message: "Brand ID is required" });
    }

    const newMail = await mails.create({
      subject,
      structure,
      content,
      topic,
      type,
      status,
      brandid,
      itemtypeid,
      createdat: new Date(),
      updatedat: new Date(),
    });

    res.status(201).json(newMail);
  } catch (error) {
    console.error("Error in createMail:", error);
    res.status(500).json({ message: "Error creating mail", error });
  }
};

// Récupérer tous les emails d'une brand spécifique
exports.getAllMails = async (req, res) => {
  try {
    const { brandid } = req.params; // Utilise brandid depuis les paramètres
    const Mails = await mails.findAll({ where: { brandid } });
    res.status(200).json(Mails);
  } catch (error) {
    console.error("Error in getAllMails:", error);
    res.status(500).json({ message: "Error retrieving mails", error });
  }
};

// Récupérer un email par ID pour une brand spécifique
exports.getMailById = async (req, res) => {
  try {
    const { brandid, id } = req.params;
    const mail = await mails.findOne({ where: { id, brandid } });

    if (!mail) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.status(200).json(mail);
  } catch (error) {
    console.error("Error in getMailById:", error);
    res.status(500).json({ message: "Error retrieving mail", error });
  }
};

// Mettre à jour un email par ID pour une brand spécifique
exports.updateMail = async (req, res) => {
  try {
    const { brandid, id } = req.params;
    const { subject, structure, content, topic, type, status, itemtypeid } =
      req.body;

    const updatedMail = await mails.update(
      {
        subject,
        structure,
        content,
        topic,
        type,
        status,
        brandid,
        itemtypeid,
        updatedat: new Date(),
      },
      { where: { id, brandid }, returning: true }
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

// Supprimer un email par ID pour une brand spécifique
exports.deleteMail = async (req, res) => {
  try {
    const { brandid, id } = req.params;
    const deleted = await mails.destroy({ where: { id, brandid } });

    if (!deleted) {
      return res.status(404).json({ message: "Mail not found" });
    }

    res.status(200).json({ message: "Mail deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMail:", error);
    res.status(500).json({ message: "Error deleting mail", error });
  }
};
