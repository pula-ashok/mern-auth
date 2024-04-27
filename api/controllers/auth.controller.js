import bcryptjs from "bcryptjs";
import User from "./../models/user.model.js";
import { errorHandler } from "./../utils/error.js";
export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const findUser = await User.findOne({ username });
    const findUser1 = await User.findOne({ email });
    if (findUser || findUser1) {
      return next(errorHandler(400, "User already registered"));
    }
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    return res.status(201).json({ message: "signup successfully" });
  } catch (error) {
    next(error);
  }
};
