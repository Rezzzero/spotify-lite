import express from "express";
import { artistTopTracksHandler } from "../../controllers/spotify/artistTopTracksController.js";

const router = express.Router();

router.get("/:id", artistTopTracksHandler);

export default router;
