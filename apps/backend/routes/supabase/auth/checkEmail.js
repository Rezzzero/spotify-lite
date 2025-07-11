import express from "express";
import { checkEmailHandler } from "#controllers/supabase/auth/checkEmailController";

const router = express.Router();

router.get("/", checkEmailHandler);

export default router;
