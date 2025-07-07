import express from "express";
import { signInHandler } from "../../../controllers/supabase/auth/signInController.js";

const router = express.Router();

router.post("/", signInHandler);

export default router;
