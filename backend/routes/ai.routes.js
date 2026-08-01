import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  chatWithAI,
  healthCheck,
  getChatHistory,
  clearChatHistory,
} from "../controllers/ai.controller.js";

const router = express.Router();

router.get("/health", healthCheck);

// Protected routes
router.post("/chat", authMiddleware, chatWithAI);
router.get("/history", authMiddleware, getChatHistory);
router.delete("/history", authMiddleware, clearChatHistory);

export default router;