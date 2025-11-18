import express from "express";
import { getListLocation } from "../controllers/location.controller.js";

const router = express.Router();
router.get("/", getListLocation);

export default router;