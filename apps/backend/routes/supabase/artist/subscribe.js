import express from "express";
import { subscribeHandler } from "#controllers/supabase/artist/subscribeController";

const router = express.Router();

router.post("/", subscribeHandler);

export default router;
