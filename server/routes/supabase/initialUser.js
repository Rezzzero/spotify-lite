import express from "express";
import { initialUserHandler } from "../../controllers/supabase/initialUserController.js";

const router = express.Router();

router.get("/", initialUserHandler);

export default router;
