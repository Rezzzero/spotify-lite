import express from "express";
import { signUpHandler } from "../../controllers/supabase/singUpController.js";

const router = express.Router();

router.post("/", signUpHandler);

export default router;
