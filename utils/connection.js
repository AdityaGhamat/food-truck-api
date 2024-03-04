import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/", {
      dbName: "foodApplication",
    })
    .then((c) => console.log(`Db is connected to ${c.connection.host}`))
    .catch((error) => console.log(error));
};
