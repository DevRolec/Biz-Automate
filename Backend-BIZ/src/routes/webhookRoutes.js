import express from "express";
import {
  receiveMessage,
  verifyWebhook,
} from "../controllers/messageController.js";

const router = express.Router();

// Meta webhook verification
router.get("/", verifyWebhook);

// Incoming WhatsApp messages
router.post("/", receiveMessage);

export default router;
