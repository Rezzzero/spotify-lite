import express from "express";
import { checkEmailHandler } from "../../../controllers/supabase/auth/checkEmailController.js";

const router = express.Router();

router.get("/", checkEmailHandler);

export default router;
