import express from "express";
import { updatePlaylistHandler } from "../../../controllers/supabase/playlist/updatePlaylistController.js";

const router = express.Router();

router.put("/:playlistId", updatePlaylistHandler);

export default router;
