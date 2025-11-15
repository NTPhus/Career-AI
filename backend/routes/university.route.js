import express from "express";
import { getListUniversity, searchUniversity } from "../controllers/university.controller.js";

const router = express.Router();
router.get("/", getListUniversity);
router.get("/search", searchUniversity);

export default router;