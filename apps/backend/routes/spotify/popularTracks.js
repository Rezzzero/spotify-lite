import express from "express";
import { getPopularTracksHandler } from '../../controllers/spotify/popularTracksController.js';

const router = express.Router();

router.get("/", getPopularTracksHandler);

export default router;
