import express from "express"
import { auth } from "../middleware/auth.js";
import { createform, formResponse, getForm, getNumberOfForms } from "../controller/formController.js";

const router=express.Router();

router.post("/", auth, createform);
router.get("/", auth, getNumberOfForms);
router.get("/:id",auth,getForm );
router.post("/response",auth,formResponse );



export default router