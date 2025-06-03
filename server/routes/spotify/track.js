import express from "express";
import { trackHandler } from "../../controllers/spotify/trackController.js";

const router = express.Router();

router.get("/:id", trackHandler);

export default router;
