import express from "express";
import { artistAlbumsHandler } from "#controllers/spotify/artistAlbumsController";

const router = express.Router();

router.get("/:id", artistAlbumsHandler);

export default router;
