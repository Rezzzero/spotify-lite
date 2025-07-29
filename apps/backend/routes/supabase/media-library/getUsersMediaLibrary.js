import express from "express";
import { getUsersMediaLibraryHandler } from "#controllers/supabase/media-library/getUsersMediaLibraryController";

const router = express.Router();

router.post("/", getUsersMediaLibraryHandler);

export default router;
