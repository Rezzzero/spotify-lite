import { subscribeHandler } from "#controllers/supabase/user/subscribeController";
import exress from "express";

const router = exress.Router();

router.post("/", subscribeHandler);

export default router;
