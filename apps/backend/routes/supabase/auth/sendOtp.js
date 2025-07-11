import express from "express";
import { sendOtpHandler } from "#controllers/supabase/auth/sendOtpController";

const router = express.Router();

router.post("/", sendOtpHandler);

export default router;
