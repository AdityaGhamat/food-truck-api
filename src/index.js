import express from "express";

//mongodb connection import
import { connectDB } from "../utils/connection.js";

//middlewares-parsers import
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

//routers import
import userRouter from "../routes/user.js";
import menuRouter from "../routes/menuItem.js";
import cartRouter from "../routes/cart.js";
import inventoryRouter from "../routes/inventoryItem.js";

const app = express();
const port = 8000;
dotenv.config();
connectDB(); //for connection with mongodb

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

//routes
app.get("/", (req, res) => {
  res.json({
    Name: "Food-Truck API",
    Author: "Aditya Ghamat",
    Services: [
      "Authentication-Api",
      "MenuItem-Api",
      "Inventory-Management",
      "Cart-Handling",
      "Orders",
    ],
    Routes: [
      {
        "Authentication-Api": [
          {
            //middlewares not mentioned.Check middlewares.
            //there express text query is here somewhere check the middlewares to confirm
            register: ["http://localhost:8000:/api/v1/user/register", "POST"],
          },
          {
            login: ["http://localhost:8000:/api/v1/user/login", "POST"],
          },
          {
            logout: ["http://localhost:8000:/api/v1/user/logout", "PUT"],
          },
          {
            allUsers: [
              "http://localhost:8000/api/v1/user/allusers?id='id of admin accounnt",
              "GET",
            ],
          },
          {
            singleUser: [
              "http://localhost:8000:/api/v1/user/singleuser/:id?id='id of admin account",
              "GET",
            ],
          },
          {
            deleteUser: [
              "http://localhost:8000:/api/v1/user/deleteuser/:id?id ='id of admin account",
              "DELETE",
            ],
          },
        ],
        "MenuItem API": [
          {
            create: ["http://localhost:8000:/api/v1/user/create", "POST"],
          },
          {
            getAllItems: [
              "http://localhost:8000:/api/v1/user/menuitems",
              "GET",
            ],
          },
          {
            getSingleItem: [
              "http://localhost:8000:/api/v1/user/menuitems/:id",
              "GET",
            ],
          },
          {
            updateMenuItem: [
              "http://localhost:8000:/api/v1/user/update/:id",
              "PUT",
            ],
          },
          {
            deleteMenuItem: [
              "http://localhost:8000:/api/v1/user/delete/:id",
              "DELETE",
            ],
          },
        ],
        "Inventory-Management": [
          {
            createNewItem: [
              "http://localhost:8000:/api/v1/user/item/newitem",
              "POST",
            ],
          },
          {
            getAllItem: [
              "http://localhost:8000:/api/v1/user/item/allitems",
              "GET",
            ],
          },
          {
            getItem: [
              "http://localhost:8000:/api/v1/user/item/singleitem/:id",
              "GET",
            ],
          },
          {
            updateItem: [
              "http://localhost:8000:/api/v1/user/item/updateitem/:id",
              "PUT",
            ],
            deleteItem: [
              "http://localhost:8000:/api/v1/user/item/deleteitem/:id",
              "DELETE",
            ],
          },
        ],
        "Cart-Handling": [
          {
            addToCart: [
              "http://localhost:8000:/api/v1/user/cart/add-to-cart/:id",
              "POST",
            ],
            removeFromCart: [
              "http://localhost:8000:/api/v1/user/cart/remove-from-cart/:id",
              "DELETE",
            ],
            GetItemsFromCart: [
              "http://localhost:8000:/api/v1/user/cart/cartItems/:id",
              "GET",
            ],
            incrementQuantity: [
              "http://localhost:8000:/api/v1/user/cart/increment-quantity/:id",
              "PUT",
            ],
            decrementQuantity: [
              "http://localhost:8000:/api/v1/user/cart/decrement-quantity/:id",
              "PUT",
            ],
            clearCart: [
              "http://localhost:8000:/api/v1/user/cart/clear-cart/:id",
            ],
          },
        ],
      },
    ],
  });
});
//main routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product", menuRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/item", inventoryRouter);

//listener
app.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
