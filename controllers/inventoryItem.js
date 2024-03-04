import { Inventory } from "../models/inventoryItem.js";

export const createNewInventory = async (req, res) => {
  try {
    const {
      itemName,
      stocks_quantity,
      supplier,
      expiryDate,
      category,
      unitPrice,
    } = req.body;
    if (!(itemName && stocks_quantity && unitPrice)) {
      return res.status(400).json({
        success: false,
        message: "Required to fill info",
      });
    }
    const newInventoryItem = await Inventory.create({
      itemName,
      stocks_quantity,
      supplier,
      expiryDate,
      category,
      unitPrice,
    });
    const savedItem = await newInventoryItem.save();
    if (!newInventoryItem) {
      return res.status(400).json({
        success: false,
        message: "Error while creating item.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item created successfully",
    });
  } catch (error) {
    return res.status({
      success: false,
      message: error,
    });
  }
};
export const getInventoryItem = async (req, res) => {
  try {
    const inventoryItem = await Inventory.find();
    if (!inventoryItem) {
      return res.status(400).json({
        success: false,
        message: "Cannot able to get items.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Here are InventoryItems",
      inventoryItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const getInventoryItembyId = async (req, res) => {
  try {
    const itemId = req.params.id;
    const inventoryItem = await Inventory.findById(itemId);
    if (!inventoryItem) {
      return res.status(400).json({
        success: false,
        message: "Error while getting item",
      });
    }
    return res.status(400).json({
      success: true,
      message: "Here is item you got",
      inventoryItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const updateInventoryItem = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      itemName,
      stocks_quantity,
      supplier,
      expiryDate,
      category,
      unitPrice,
    } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      itemId,
      {
        $set: {
          itemName,
          stocks_quantity,
          supplier,
          expiryDate,
          category,
          unitPrice,
        },
      },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inventory item updated successfully",
      item: updatedItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const deleteInventoryItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Inventory.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Inventory item not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Inventory item deleted successfully",
      item: deletedItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
