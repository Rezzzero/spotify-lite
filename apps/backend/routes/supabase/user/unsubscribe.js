import expresss from "express";
import { unsubscribeHandler } from "#controllers/supabase/user/unsubscribeController";

const router = expresss.Router();

router.post("/:id", unsubscribeHandler);

export default router;
