import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getOrders,
  markOrderPaid,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", requireAuth, getOrders);

// Quick payment hook (existing)
router.patch("/:id/paid", requireAuth, markOrderPaid);

// NEW: Admin-controlled status update
router.patch("/:id/status", requireAuth, updateOrderStatus);

export default router;
