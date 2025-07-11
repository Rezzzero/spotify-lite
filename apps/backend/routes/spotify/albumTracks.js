import express from "express";
import { albumTracksHandler } from "#controllers/spotify/albumTracksController";

const router = express.Router();

router.get("/:id", albumTracksHandler);

export default router;
