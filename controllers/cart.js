import { User } from "../models/user.js";
import { Cart } from "../models/cart.js";

export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;
  try {
    const existingItem = await Cart.findOne({ id, userId: userId });
    if (existingItem) {
      let updatedItem = await Cart.findOneAndUpdate(
        { id, userId },
        {
          $set: {
            quantity: existingItem.quantity + 1,
            totalPrice: price * (existingItem + 1),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      if (!updatedItem) {
        return res.status(400).json({
          success: false,
          message: "Failed to add item in cart",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Item added to cart",
      });
    }
    let newMenuItem = await Cart.create({
      id: id,
      itemName: name,
      price: price,
      ratings: rating,
      imageUrl: image,
      quantity: quantity,
      totalPrice: price * quantity,
    });
    const savedItem = await newMenuItem.save();
    let user = await User.findByIdAndUpdate(userId, {
      $push: {
        cartItems: savedItem._id,
      },
    });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Failed to add to cart",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Added to cart succesfully",
    });
  } catch (error) {}
};
export const getCart = async (req, res) => {
  try {
    const id = req.params.id;
    const cartItems = await Cart.find({ id });
    if (!cartItems) {
      return res.status(400).json({
        success: false,
        message: "No items are found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Items are found",
      cartItems,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
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
    return res.status(200).json({
      success: true,
      message: "Item in cart removed succesfully",
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
            quantity: { $add: ["$quantity" + 1] },
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
