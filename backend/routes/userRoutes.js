import express from "express"
import { createUser, giveUserInfo, loginUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router=express.Router();

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/verify",auth,giveUserInfo)

export default router