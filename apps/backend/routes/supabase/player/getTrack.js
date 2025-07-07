import express from "express";
import { getTrackHandler } from "../../../controllers/supabase/player/getTrackController.js";

const router = express.Router();

router.post("/", getTrackHandler);

export default router;
