import express from "express";
import { sendOtpHandler } from "../../controllers/supabase/sendOtpController.js";

const router = express.Router();

router.post("/", sendOtpHandler);

export default router;
