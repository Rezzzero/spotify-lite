import express from "express";
import { albumHandler } from "../../controllers/spotify/albumController.js";

const router = express.Router();

router.get("/:id", albumHandler);

export default router;
