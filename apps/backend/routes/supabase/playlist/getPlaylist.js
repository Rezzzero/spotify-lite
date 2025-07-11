import express from "express";
import { getPlaylistHandler } from "#controllers/supabase/playlist/getPlaylistController";

const router = express.Router();

router.post("/:playlistId", getPlaylistHandler);

export default router;
