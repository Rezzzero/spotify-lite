import express from "express";
import { updatePlaylistHandler } from "#controllers/supabase/playlist/updatePlaylistController";

const router = express.Router();

router.put("/:playlistId", updatePlaylistHandler);

export default router;
