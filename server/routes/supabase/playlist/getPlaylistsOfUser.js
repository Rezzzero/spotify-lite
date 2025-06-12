import express from "express";
import { getPlaylistsOfUserHandler } from "../../../controllers/supabase/playlist/getPlaylistsOfUserController.js";

const router = express.Router();

router.post("/", getPlaylistsOfUserHandler);

export default router;
