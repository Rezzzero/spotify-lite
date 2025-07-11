import express from "express";
import { updateUserNameHandler } from "#controllers/supabase/user/updateUserNameController";

const router = express.Router();

router.post("/:id", updateUserNameHandler);

export default router;
