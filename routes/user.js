import express from "express";
import { adminChecker } from "../middlewares/adminChecker.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const app = express.Router();
import {
  register,
  login,
  allUsersList,
  getSingleUser,
  deleteUser,
  logout,
  getUser,
} from "../controllers/user.js";

app.post("/register", register);
app.post("/login", login);
app.put("/logout", logout);
app.get("/allusers", adminChecker, allUsersList);
app.get("/singleuser/:id", adminChecker, getSingleUser);
app.get("/get-user", verifyToken, getUser);
app.delete("/deleteuser/:id", adminChecker, deleteUser);
export default app;
