import { User } from "../models/user.js";
export const adminChecker = async (req, res, next) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Login to access",
    });
  }
  const user = await User.findById(id);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }
  if (user.role !== "admin") {
    return res.status(400).json({
      success: false,
      message: "Unauthorized, access denied contact admin to get access",
    });
  }
  next();
};
