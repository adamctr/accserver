const { sequelize } = require("../models/index");
const { itemtypes } = sequelize.models;

// Créer un nouvel itemType
exports.createItemType = async (req, res) => {
  try {
    const { name, description } = req.body;

    const newItemType = await itemtypes.create({
      name,
      description,
      createdat: new Date(),
      updatedat: new Date(),
    });

    res.status(201).json(newItemType);
  } catch (error) {
    console.error("Error in createItemType:", error);
    res.status(500).json({ message: "Error creating item type", error });
  }
};

// Récupérer tous les itemTypes
exports.getAllItemTypes = async (req, res) => {
  try {
    const itemTypes = await itemtypes.findAll();
    res.status(200).json(itemTypes);
  } catch (error) {
    console.error("Error in getAllItemTypes:", error);
    res.status(500).json({ message: "Error retrieving item types", error });
  }
};

// Récupérer un itemType par ID
exports.getItemTypeById = async (req, res) => {
  try {
    const { id } = req.params;
    const itemType = await itemtypes.findOne({ where: { id } });

    if (!itemType) {
      return res.status(404).json({ message: "Item type not found" });
    }

    res.status(200).json(itemType);
  } catch (error) {
    console.error("Error in getItemTypeById:", error);
    res.status(500).json({ message: "Error retrieving item type", error });
  }
};

// Mettre à jour un itemType par ID
exports.updateItemType = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedItemType = await itemtypes.update(
      {
        name,
        description,
        updatedat: new Date(),
      },
      { where: { id }, returning: true }
    );

    if (updatedItemType[0] === 0) {
      return res.status(404).json({ message: "Item type not found" });
    }

    res.status(200).json(updatedItemType[1][0]); // Renvoie l'itemType mis à jour
  } catch (error) {
    console.error("Error in updateItemType:", error);
    res.status(500).json({ message: "Error updating item type", error });
  }
};

// Supprimer un itemType par ID
exports.deleteItemType = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await itemtypes.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: "Item type not found" });
    }

    res.status(200).json({ message: "Item type deleted successfully" });
  } catch (error) {
    console.error("Error in deleteItemType:", error);
    res.status(500).json({ message: "Error deleting item type", error });
  }
};
