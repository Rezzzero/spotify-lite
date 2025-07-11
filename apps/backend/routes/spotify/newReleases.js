import express from "express";
import { getNewReleasesHandler } from "#controllers/spotify/newReleasesController";

const router = express.Router();

router.get("/", getNewReleasesHandler);

export default router;
