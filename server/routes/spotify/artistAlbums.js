import express from "express";
import { artistAlbumsHandler } from "../../controllers/spotify/artistAlbumsController.js";

const router = express.Router();

router.get("/:id", artistAlbumsHandler);

export default router;
