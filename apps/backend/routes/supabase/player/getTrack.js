import express from "express";
import { getTrackHandler } from "#controllers/supabase/player/getTrackController";

const router = express.Router();

router.post("/", getTrackHandler);

export default router;
