import express from "express";
import upload from "../middlewares/document.upload.js";
import { analyzeDocument } from "../controllers/document.controller.js";

const router = express.Router();

router.post(
  "/analyze",
  upload.single("file"),
  analyzeDocument
);

export default router;