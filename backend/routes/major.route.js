import express from "express";
import { getListMajor, predictMajor } from "../controllers/major.controller.js";

const router = express.Router();
router.get("/", getListMajor);
router.post("/predict", predictMajor);

export default router;