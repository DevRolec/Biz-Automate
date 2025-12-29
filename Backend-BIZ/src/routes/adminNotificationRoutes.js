import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { getNotifications } from "../controllers/adminNotificationController.js";

const router = express.Router();

router.get("/", requireAuth, getNotifications);

export default router;
