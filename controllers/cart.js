import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";
import NodeCache from "node-cache";
const nodeCache = new NodeCache();

export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;

  try {
    let existingItem = await Cart.findOne({ id, userId: userId });

    if (existingItem) {
      let updatedItem = await Cart.findOneAndUpdate(
        { id, userId },
        {
          $set: {
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.price * (existingItem.quantity + 1),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      if (!updatedItem) {
        return res
          .status(400)
          .json({ success: false, message: "Failed to add to cart" });
      }

      return res.status(200).json({ success: true, message: "Added to cart" });
    }

    let newCartItem = await Cart.create({
      id,
      name,
      price,
      rating,
      image,
      quantity,
      userId,
      totalPrice: price * quantity,
    });

    const savedCartItem = await newCartItem.save();

    let user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cartItems: savedCartItem._id,
        },
      }
    );

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Failed to add to cart" });
    }
    nodeCache.del("cartItems");
    return res.status(200).json({
      success: true,

      message: "Added to cart",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
export const getCart = async (req, res) => {
  const userId = req.params.id;
  let cartItems;
  try {
    if (nodeCache.has("cartItems")) {
      cartItems = JSON.parse(nodeCache.get("cartItems"));
    } else {
      cartItems = await Cart.find({ userId }).populate("id");
      nodeCache.set("cartItems", JSON.stringify(cartItems));
    }

    if (!cartItems) {
      return res
        .status(400)
        .json({ success: false, message: "No items found" });
    }

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await Cart.findByIdAndDelete({ _id: id });

    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Item in the cart not found",
      });
    }
    nodeCache.del("cartItems");
    return res.status(200).json({
      success: true,
      message: "Removed from cart",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
export const increaseQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            quantity: { $add: ["$quantity", 1] },
            totalPrice: { $multiply: ["$price", { $add: ["$quantity", 1] }] },
          },
        },
      ],
      {
        upsert: true,
        new: true,
      }
    );

    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Cart item not found",
      });
    }
    nodeCache.del("cartItems");
    return res.status(200).json({
      success: true,
      message: "Food quantity incremented",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const decreaseQuantity = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItem = await Cart.findByIdAndUpdate(
      id,
      [
        {
          $set: {
            quantity: { $subtract: ["$quantity", 1] },
            totalPrice: { $subtract: ["$totalPrice", "$price"] },
          },
        },
      ],
      {
        upsert: true,
        new: true,
      }
    );

    if (!cartItem) {
      return res.status(400).json({
        success: false,
        message: "Cart item not found",
      });
    }
    nodeCache.del("cartItems");
    return res.status(200).json({
      success: true,
      message: "Cart item quantity decreased",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export const clearCart = async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedItem = await Cart.deleteMany({ userId });
    const deltedList = await User.findOneAndUpdate(
      { _id: userId },
      {
        cartItems: [],
      }
    );
    if (!deletedItem) {
      res.status(400).json({
        success: false,
        message: "Failed to clear the cart",
      });
    }
    nodeCache.del("cartItems");
    return res.status(200).json({
      success: true,
      message: "Order Confirmed",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};
