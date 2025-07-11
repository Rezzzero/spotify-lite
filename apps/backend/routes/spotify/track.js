import express from "express";
import { trackHandler } from "#controllers/spotify/trackController";

const router = express.Router();

router.get("/:id", trackHandler);

export default router;
