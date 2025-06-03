import express from "express";
import { artistHandler } from "../../controllers/spotify/artistController.js";

const router = express.Router();

router.get("/:id", artistHandler);

export default router;
