import express from "express";
import { addAlbumToUserHandler } from "#controllers/supabase/album/addAlbumToUserController";

const router = express.Router();

router.post("/", addAlbumToUserHandler);

export default router;
