import express from "express";
import { getUserSubscriptionsHandler } from "#controllers/supabase/user/getUserSubscriptionsController";

const router = express.Router();

router.get("/:id", getUserSubscriptionsHandler);

export default router;
