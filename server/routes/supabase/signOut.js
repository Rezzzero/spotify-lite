import express from "express";
import { signOutHandler } from "../../controllers/supabase/signOutController.js";

const router = express.Router();

router.post("/", signOutHandler);

export default router;
