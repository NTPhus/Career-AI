import express from "express";
import {index} from "../controllers/mbti.controller.js";

const router = express.Router();

router.get("/", index);

export default router;
