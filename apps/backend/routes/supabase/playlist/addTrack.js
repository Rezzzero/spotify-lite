import express from "express";
import { addTrackHandler } from "#controllers/supabase/playlist/addTrackController";

const router = express.Router();

router.post("/", addTrackHandler);

export default router;
