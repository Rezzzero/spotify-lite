import express from "express";
import { deleteAlbumFromUserHandler } from "#controllers/supabase/album/deleteAlbumFromUserController";

const router = express.Router();

router.post("/", deleteAlbumFromUserHandler);

export default router;
