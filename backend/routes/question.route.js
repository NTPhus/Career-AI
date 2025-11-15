import express from "express";
import { getQuestion } from "../controllers/question.controller.js";

const router = express.Router();
router.get("/", getQuestion);

export default router;