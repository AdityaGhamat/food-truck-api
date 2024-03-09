import express from "express";

const app = express.Router();
import {
  createMenuItem,
  getAllItems,
  getSingleItem,
  updateMenuItem,
  deleteMenuItem,
  searchMenuItems,
} from "../controllers/menuItem.js";
app.post("/create", createMenuItem);
app.get("/menuitems", getAllItems);
app.get("/menuitems/:id", getSingleItem);
app.put("/update/:id", updateMenuItem);
app.get("/search", searchMenuItems);
app.delete("/delete/:id", deleteMenuItem);

export default app;
