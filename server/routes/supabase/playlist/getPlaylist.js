import express from "express";
import { getPlaylistHandler } from "../../../controllers/supabase/playlist/getPlaylistController.js";

const router = express.Router();

router.post("/:playlistId", getPlaylistHandler);

export default router;
