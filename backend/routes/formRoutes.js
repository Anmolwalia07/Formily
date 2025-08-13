import express from "express"
import { auth } from "../middleware/auth.js";
import { createform, getForm, getNumberOfForms } from "../controller/formController.js";

const router=express.Router();

router.post("/", auth, createform);
router.get("/", auth, getNumberOfForms);

router.get("/:id",getForm );


export default router