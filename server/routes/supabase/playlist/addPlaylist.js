import express from "express";
import { addPlaylistHandler } from "../../../controllers/supabase/playlist/addPlaylistController.js";

const router = express.Router();

router.post("/:id", addPlaylistHandler);

export default router;
