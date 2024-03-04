import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
  },
  price: {
    type: Number,
  },
  totalPrice: {
    type: Number,
  },
  quantity: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  image: {
    type: String,
  },
  userId: {
    type: String,
  },
});
export const Cart = mongoose.model("Cart", cartSchema);
