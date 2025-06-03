import express from "express";
import { searchHandler } from "../../controllers/spotify/searchController.js";

const router = express.Router();

router.get("/", searchHandler);

export default router;
