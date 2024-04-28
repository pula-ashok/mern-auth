import express from "express";
import { testapi, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyToken.js";

const router = express.Router();

router.get("/test", testapi);
router.put("/update/:id", verifyToken, updateUser);

export default router;
