import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const testapi = async (req, res) => {
  res.json({ message: "test api is working" });
};

export const updateUser = async (req, res, next) => {
  // console.log(req.user.id);
  // console.log(req.params.id);

  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can only updated your profile"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          photo: req.body.photo,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(201).json(rest);
  } catch (error) {
    next(error);
  }
};
