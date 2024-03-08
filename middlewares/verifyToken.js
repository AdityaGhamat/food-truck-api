import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(400).json({
      success: false,
      message: "Login Please to continue",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.secret_key);
    req.id = decoded.id;
    next();
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};
