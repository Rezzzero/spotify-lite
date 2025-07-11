import express from "express";
import { createPlaylistHandler } from "#controllers/supabase/playlist/createPlaylistController";

const router = express.Router();

router.post("/", createPlaylistHandler);

export default router;
