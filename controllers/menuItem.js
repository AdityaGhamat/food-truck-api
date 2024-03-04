import { MenuItem } from "../models/menuItem.js";

export const createMenuItem = async (req, res) => {
  try {
    const {
      itemName,
      description,
      category,
      price,
      quantity,
      ratings,
      totalPrice,
      imageUrl,
      ingredients,
      dietryInfo,
    } = req.body;
    if (
      !(itemName && description && category && price && quantity && imageUrl)
    ) {
      return res.status(400).json({
        success: false,
        message: "Fields are empty,fill all the fields",
      });
    }
    const newMenuItem = await MenuItem.create({
      itemName,
      description,
      category,
      price,
      quantity,
      ratings,
      totalPrice,
      imageUrl,
      ingredients,
      dietryInfo,
    });
    if (!newMenuItem) {
      return res.status(400).json({
        success: false,
        message: "Failed to create menuitem",
      });
    }
    const savedMenuItem = newMenuItem.save();
    return res.status(200).json({
      success: true,
      message: "menuitem created succsessfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const getAllItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({});
    return res.status(200).json({
      success: true,
      message: "Here are all items",
      menuItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getSingleItem = async (req, res) => {
  try {
    const id = req.params.id;
    const item = await MenuItem.findById(id);
    if (!item) {
      return res.status(400).json({
        success: false,
        message: "menuitem not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Item has been found",
      item,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedItem = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updatedItem);
    if (!updateMenuItem) {
      return res.status(400).json({
        success: false,
        message: "Cannot update menuitem",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Menuitem updated successfully",
      updatedMenuItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMenuItem = await MenuItem.findByIdAndDelete(id);
    if (!deleteMenuItem) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete menuitem",
      });
    }
    return res.status(200).json({
      success: true,
      message: "MenuItem deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
