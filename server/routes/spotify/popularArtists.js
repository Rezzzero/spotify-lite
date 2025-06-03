import express from "express";
import { getPopularArtistsHandler } from "../../controllers/spotify/popularArtistsController.js";

const router = express.Router();

router.get("/", getPopularArtistsHandler);

export default router;
