import express from "express";
import { togglePlaylistInProfileStatusHandler } from "../../../controllers/supabase/playlist/togglePlaylistInProfileStatusController.js";

const router = express.Router();

router.patch("/:id", togglePlaylistInProfileStatusHandler);

export default router;
