import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { getLogs } from "../controllers/adminLogController.js";

const router = express.Router();
router.get("/", requireAuth, getLogs);
export default router;
