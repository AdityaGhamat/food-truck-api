import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.mongo_url, {
      dbName: "foodApplication",
    })
    .then((c) => console.log(`Db is connected to ${c.connection.host}`))
    .catch((error) => console.log(error));
};
