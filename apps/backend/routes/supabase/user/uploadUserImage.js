import express from "express";
import multer from "multer";

import { uploadUserImageHandler } from "#controllers/supabase/user/uploadUserImageController";

const router = express.Router();
const upload = multer();

router.post("/:id", upload.single("file"), uploadUserImageHandler);

export default router;
