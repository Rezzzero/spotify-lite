import express from "express";
import { albumTracksHandler } from "../../controllers/spotify/albumTracksController.js";

const router = express.Router();

router.get("/:id", albumTracksHandler);

export default router;
