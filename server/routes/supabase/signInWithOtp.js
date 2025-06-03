import express from "express";
import { signInWithOtpHandler } from "../../controllers/supabase/signInWithOtpController.js";

const router = express.Router();

router.post("/", signInWithOtpHandler);

export default router;
