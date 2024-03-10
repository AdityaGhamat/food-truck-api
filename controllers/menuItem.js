import { get } from "mongoose";
import { MenuItem } from "../models/menuItem.js";
import NodeCache from "node-cache";
const nodeCache = new NodeCache();

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
    nodeCache.del("menuItems");
    nodeCache.del("menuItem");
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
    let menuItems = nodeCache.get("menuItems");

    if (!menuItems) {
      menuItems = await MenuItem.find({});
      nodeCache.set("menuItems", menuItems);
    }

    return res.status(200).json({
      success: true,
      message: "Here are all items",
      menuItems,
    });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getSingleItem = async (req, res) => {
  let item;
  try {
    const id = req.params.id;
    if (nodeCache.has("menuItem")) {
      item = JSON.parse(nodeCache.get("menuItem"));
    } else {
      item = await MenuItem.findById(id);
      nodeCache.set("menuItem", JSON.stringify(item));
    }

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
    if (!updatedMenuItem) {
      return res.status(400).json({
        success: false,
        message: "Cannot update menuitem",
      });
    }
    nodeCache.del("menuItems");
    nodeCache.del("menuItem");
    nodeCache.del("searchResults");
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
export const searchMenuItems = async (req, res) => {
  let searchResults;
  try {
    const { q } = req.query;

    const keys = ["itemName", "category", "ingredients", "dietaryInfo"];

    const search = (data) => {
      return data.filter((item) =>
        keys.some((key) => {
          const itemValue = item[key];
          return (
            typeof itemValue === "string" &&
            itemValue.toLowerCase().includes(q.toLowerCase())
          );
        })
      );
    };

    const allMenuItems = await MenuItem.find({});

    searchResults = q ? search(allMenuItems) : allMenuItems;

    return res.status(200).json({
      success: true,
      message: "Search results for menu items",
      menuItems: searchResults,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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
    nodeCache.del("menuItems");
    nodeCache.del("menuItem");
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
