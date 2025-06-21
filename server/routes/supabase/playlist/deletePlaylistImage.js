import express from "express";
import { deletePlaylistImageHandler } from "../../../controllers/supabase/playlist/deletePlaylistImageController.js";

const router = express.Router();

router.delete("/:id", deletePlaylistImageHandler);

export default router;