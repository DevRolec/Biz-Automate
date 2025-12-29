import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getOverviewStats,
  getChartData,
} from "../controllers/adminAnalyticsController.js";

const router = express.Router();

router.get("/overview", requireAuth, getOverviewStats);
router.get("/charts", requireAuth, getChartData);

export default router;
