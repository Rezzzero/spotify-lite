import express from "express";
import { testAddAlbumHandler } from "#controllers/supabase/album/testAddAlbumController";

const router = express.Router();

router.post("/:id", testAddAlbumHandler);

export default router;
