import express from "express";
import { getListMajor, predictMajor, searchMajor } from "../controllers/major.controller.js";

const router = express.Router();
router.get("/", getListMajor);
router.post("/search", searchMajor);
router.post("/predict", predictMajor);

export default router;