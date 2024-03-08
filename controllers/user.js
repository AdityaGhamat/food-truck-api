import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!(name && email && password)) {
      return res.status(400).json({
        success: false,
        message: "Please Enter all fields",
      });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exits.Enter new Email.",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: encryptedPassword,
    });
    const token = jwt.sign({ id: user._id, email }, process.env.secret_key, {
      expiresIn: "2h",
    });
    user.token = token;
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "Account created Sucessfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      return res.status(400).json({
        success: false,
        message: "Fields are empty",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // const encryptedPassword = await bcrypt.compare(password, user.password);
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user._id, email }, process.env.secret_key, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: true,
      };

      return res.status(200).cookie("token", token, options).json({
        success: true,
        token,
        user,
        message: "login successfull",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid credientials",
      });
    }
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .clearCookie("token")
      .json({ success: true, message: "Logged Out Sucessfully" });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const allUsersList = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "User has been found",
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    await user.deleteOne();
    return res.status(200).json({
      success: true,
      message: "User deleted Succesfully",
    });
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error,
    });
  }
};
export const getUser = async (req, res) => {
  try {
    const reqId = req.id;

    let user = await User.findById(reqId).select("-password");

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    return res.status(200).json({ success: true, user, message: "User found" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
