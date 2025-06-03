import express from "express";
import { getNewReleasesHandler } from "../../controllers/spotify/newReleasesController.js";

const router = express.Router();

router.get("/", getNewReleasesHandler);

export default router;
