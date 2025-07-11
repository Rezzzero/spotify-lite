import express from "express";
import { deleteTrackHandler } from "#controllers/supabase/playlist/deleteTrackController";

const router = express.Router();

router.post("/", deleteTrackHandler);

export default router;
