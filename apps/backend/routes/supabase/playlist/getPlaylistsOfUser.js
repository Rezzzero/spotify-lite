import express from "express";
import { getPlaylistsOfUserHandler } from "#controllers/supabase/playlist/getPlaylistsOfUserController";

const router = express.Router();

router.post("/", getPlaylistsOfUserHandler);

export default router;
