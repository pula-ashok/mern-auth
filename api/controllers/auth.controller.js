import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "./../models/user.model.js";
import { errorHandler } from "./../utils/error.js";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);

  try {
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

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password || email === "" || password === "") {
      return next(errorHandler(400, "All fields are required"));
    }
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return next(errorHandler(404, "User not found"));
    }
    const passwordMatch = bcryptjs.compareSync(password, userFound.password);
    if (!passwordMatch) {
      return next(errorHandler(401, "Password is incorrect"));
    }
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET);
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    const { password: hashedPassword, ...rest } = userFound._doc;
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
