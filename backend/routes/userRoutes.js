import express from "express"
import { createUser, logineUser } from "../controller/userController.js";

const router=express.Router();

router.post("/register",createUser)
router.post("/login",logineUser)


export default router