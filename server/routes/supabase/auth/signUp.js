import express from "express";
import { signUpHandler } from "../../../controllers/supabase/auth/singUpController.js";

const router = express.Router();

router.post("/", signUpHandler);

export default router;
