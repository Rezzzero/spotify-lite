import express from "express";
import { soundcloudSearchHandler } from "#controllers/soundcloud/searchController";

const router = express.Router();

router.get("/", soundcloudSearchHandler);

export default router;
