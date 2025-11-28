import express from "express";
import { getListUniversity, searchUniversity } from "../controllers/university.controller.js";

const router = express.Router();
router.get("/", getListUniversity);
router.post("/search", searchUniversity);

export default router;