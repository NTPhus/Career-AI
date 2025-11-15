import express from "express";
import { getQuestion } from "../controllers/question.controller.js";

const router = express.Router();
// router.get("/:form", getQuestion);
router.get("/", getQuestion);


export default router;