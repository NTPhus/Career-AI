import express from "express";
import { getListMajor } from "../controllers/major.controller.js";

const router = express.Router();
router.get("/", getListMajor);

export default router;