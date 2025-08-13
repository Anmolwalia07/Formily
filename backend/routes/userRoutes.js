import express from "express"
import { createUser, dashboardInfo, giveUserInfo, loginUser } from "../controller/userController.js";
import { auth } from "../middleware/auth.js";

const router=express.Router();

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/verify",auth,giveUserInfo)
router.get("/dashboard", auth, dashboardInfo);


export default router