import express from "express";
import { deleteUserImageHandler } from "../../../controllers/supabase/user/deleteUserImageController.js";

const router = express.Router();

router.delete("/:id", deleteUserImageHandler);

export default router;
