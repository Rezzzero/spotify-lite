import express from "express";
import { signInWithOtpHandler } from "#controllers/supabase/auth/signInWithOtpController";

const router = express.Router();

router.post("/", signInWithOtpHandler);

export default router;
