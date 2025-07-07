import express from "express";
import { signOutHandler } from "../../../controllers/supabase/auth/signOutController.js";

const router = express.Router();

router.post("/", signOutHandler);

export default router;
