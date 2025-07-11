import express from "express";
import { searchHandler } from "#controllers/spotify/searchController";

const router = express.Router();

router.get("/", searchHandler);

export default router;
