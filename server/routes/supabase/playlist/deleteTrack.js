import express from "express";
import { deleteTrackHandler } from "../../../controllers/supabase/playlist/deleteTrackController.js";

const router = express.Router();

router.post("/", deleteTrackHandler);

export default router;
