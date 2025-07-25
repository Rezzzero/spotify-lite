import express from "express";
import { getUserSubscriptionsHandler } from "#controllers/supabase/user/getUserSubscriptions";

const router = express.Router();

router.get("/:id", getUserSubscriptionsHandler);

export default router;
