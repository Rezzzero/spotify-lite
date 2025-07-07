import express from "express";
import { initialUserHandler } from "../../../controllers/supabase/auth/initialUserController.js";

const router = express.Router();

router.get("/", initialUserHandler);

export default router;
