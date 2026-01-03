import express from "express";
import { requireAuth } from "../middleware/auth.js";
import { globalSearch } from "../controllers/adminSearchController.js";

const router = express.Router();

router.get("/", requireAuth, globalSearch);

export default router;
