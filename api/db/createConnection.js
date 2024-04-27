import mongoose from "mongoose";

export const conncectDB = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("mongodb connected"))
    .catch((error) => console.log(error));
};
