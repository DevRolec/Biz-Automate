import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getOrders,
  markOrderPaid,
} from "../controllers/adminOrderController.js";

const router = express.Router();

router.get("/", requireAuth, getOrders);
router.patch("/:id/pay", requireAuth, markOrderPaid);

export default router;
