import express from "express";
import { artistHandler } from "#controllers/spotify/artistController";

const router = express.Router();

router.get("/:id", artistHandler);

export default router;
