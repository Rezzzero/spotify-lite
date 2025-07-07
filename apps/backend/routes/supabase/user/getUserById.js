import express from "express";
import { getUserByIdHandler } from "../../../controllers/supabase/user/getUserByIdController.js";

const router = express.Router();

router.get("/:id", getUserByIdHandler);

export default router;
