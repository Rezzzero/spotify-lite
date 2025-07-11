import express from "express";
import { addPlaylistHandler } from "#controllers/supabase/playlist/addPlaylistController";

const router = express.Router();

router.post("/:id", addPlaylistHandler);

export default router;
