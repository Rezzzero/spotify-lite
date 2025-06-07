import express from "express";
import { createPlaylistHandler } from "../../controllers/supabase/createPlaylistController.js";

const router = express.Router();

router.post("/", createPlaylistHandler);

export default router;
