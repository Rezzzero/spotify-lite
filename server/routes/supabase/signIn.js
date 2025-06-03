import express from "express";
import { signInHandler } from "../../controllers/supabase/signInController.js";

const router = express.Router();

router.post("/", signInHandler);

export default router;
