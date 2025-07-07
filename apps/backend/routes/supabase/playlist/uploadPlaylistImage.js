import express from "express";
import multer from "multer";

import { uploadPlaylistImageHandler } from "../../../controllers/supabase/playlist/uploadPlaylistImageController.js";

const router = express.Router();
const upload = multer();

router.post("/:playlistId", upload.single("file"), uploadPlaylistImageHandler);

export default router;
