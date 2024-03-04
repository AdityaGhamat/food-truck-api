import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: ["true", "Enter name of menu item"],
    },
    description: {
      type: String,
      required: ["true", "Enter description of menu item"],
    },
    category: {
      type: String,
      required: ["true", "Enter category of menu item"],
    },
    price: {
      type: Number,
      required: ["true", "Enter price of menu item"],
      min: 0,
    },
    quantity: {
      type: Number,
      required: ["true", "Enter quantity of menu item"],
      min: 0,
    },
    ratings: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalPrice: {
      type: Number,
      min: 0,
    },
    imageUrl: {
      type: String,
      required: ["true", "Enter cloud url of menu item"],
    },
    ingredients: {
      type: Array,
    },
    dietryInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const MenuItem = mongoose.model("MenuItem", menuItemSchema);
