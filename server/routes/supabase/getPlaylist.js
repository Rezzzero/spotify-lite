import express from "express";
import { getPlaylistHandler } from "../../controllers/supabase/getPlaylistController.js";

const router = express.Router();

router.get("/:playlistId", getPlaylistHandler);

export default router;
