import express from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  getLeads,
  updateLeadStatus,
} from "../controllers/adminLeadController.js";

const router = express.Router();

router.get("/", requireAuth, getLeads);
router.patch("/:id/status", requireAuth, updateLeadStatus);

export default router;
