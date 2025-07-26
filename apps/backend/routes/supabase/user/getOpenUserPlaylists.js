import express from "express";
import { getOpenUserPlaylistsHandler } from "#controllers/supabase/user/getOpenUserPlaylistsController";

const router = express.Router();

router.get("/:id", getOpenUserPlaylistsHandler);

export default router;
