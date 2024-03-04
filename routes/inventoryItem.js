import express from "express";
const app = express.Router();
import {
  createNewInventory,
  getInventoryItem,
  getInventoryItembyId,
  updateInventoryItem,
  deleteInventoryItem,
} from "../controllers/inventoryItem.js";
//here id is item's id
app.post("/newitem", createNewInventory);
app.get("/allitems", getInventoryItem);
app.get("/singleitem/:id", getInventoryItembyId);
app.put("/updateitem/:id", updateInventoryItem);
app.delete("/deleteitem/:id", deleteInventoryItem);
export default app;
