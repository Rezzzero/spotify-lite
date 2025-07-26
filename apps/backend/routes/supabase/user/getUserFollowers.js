import express from "express";
import { getUserFollowersHandler } from "#controllers/supabase/user/getUserFollowersController";

const router = express.Router();

router.get("/:id", getUserFollowersHandler);

export default router;
