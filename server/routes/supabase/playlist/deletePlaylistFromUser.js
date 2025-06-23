import express from "express";
import { deletePlaylistFromUserHandler } from "../../../controllers/supabase/playlist/deletePlaylistFromUserController.js";

const router = express.Router();

router.post("/:id", deletePlaylistFromUserHandler);

export default router;
