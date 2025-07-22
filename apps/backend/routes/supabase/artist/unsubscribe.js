import express from "express";
import { unsubscribeHandler } from "#controllers/supabase/artist/unsubscribeController";

const router = express.Router();

router.post("/:id", unsubscribeHandler);

export default router;