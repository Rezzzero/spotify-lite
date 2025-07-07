import express from "express";
import { updateUserNameHandler } from "../../../controllers/supabase/user/updateUserNameController.js";

const router = express.Router();

router.post("/:id", updateUserNameHandler);

export default router;
