import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: ["true", "Enter item's name"],
  },
  stocks_quantity: {
    type: Number,
    required: ["true", "Enter quantity of item"],
  },
  supplier: {
    type: String,
    default: null,
  },
  expiryDate: {
    type: Date,
  },
  category: {
    type: String,
  },
  unitPrice: {
    type: Number,
    required: ["true", "Enter unit price for item"],
  },
});
export const Inventory = mongoose.model("Inventory", inventorySchema);
