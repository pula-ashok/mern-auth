import express from "express";
import { verifyToken } from "./../utils/verifyToken.js";
import {
  google,
  signin,
  signout,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", verifyToken, signout);

export default router;
