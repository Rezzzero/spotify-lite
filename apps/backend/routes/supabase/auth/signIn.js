import express from "express";
import { signInHandler } from "#controllers/supabase/auth/signInController";

const router = express.Router();

router.post("/", signInHandler);

export default router;
