import express from "express";
import { getListUniversity } from "../controllers/university.controller.js";

const router = express.Router();
router.get("/", getListUniversity);

export default router;