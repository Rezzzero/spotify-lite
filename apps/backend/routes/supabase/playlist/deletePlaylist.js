import express from "express";
import { deletePlaylistHandler } from "#controllers/supabase/playlist/deletePlaylistController";

const router = express.Router();

router.delete("/:playlistId", deletePlaylistHandler);

export default router;
