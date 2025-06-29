import { checkUser, login, register } from "../controller/userController.js";

import authMiddleware from "../middleware/auth.js";
import express from "express";

const router = express.Router();

//register route
router.post("register", register);  //http://localhost:3002/api/auth/register

//login user
router.post("/login", login);

//check user
router.get("/checkUser", authMiddleware, checkUser);  //changed to checkUser for testing

export default router;
