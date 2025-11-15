import express from "express";
import { chat, desc } from "../controllers/chat.controller.js";

const router = express.Router();
router.post("/", chat);
router.post("/desc", desc);

export default router;
