import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    password: { type: String, required: true },
    photo: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/11/26/10/04/lord-shiva-8413252_1280.png",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
