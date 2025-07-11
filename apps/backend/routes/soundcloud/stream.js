import express from "express";

import { streamHandler } from "#controllers/soundcloud/streamController";

const router = express.Router();

router.get("/", streamHandler);

export default router;
