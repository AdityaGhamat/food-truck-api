import express from "express";
const app = express.Router();
import {
  addToCart,
  getCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../controllers/cart.js";
app.post("/add-to-cart/:id", addToCart);
app.get("/cartItems/:id", getCart);
app.delete("/remove-from-cart/:id", removeFromCart);
app.put("/increment-quantity/:id", increaseQuantity);
app.put("/decrement-quantity/:id", decreaseQuantity);
app.put("/clear-cart/:id", clearCart);
export default app;
