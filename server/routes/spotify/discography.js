import express from "express";
import { discographyHandler } from "../../controllers/spotify/discographyController.js";

const router = express.Router();

router.get("/:artistId", discographyHandler);

export default router;
