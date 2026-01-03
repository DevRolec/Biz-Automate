import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhookRoutes.js";
import { connectDB } from "./db/mongoose.js";
import cors from "cors";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // frontend
    credentials: true,
  })
);
app.use(bodyParser.json());

import adminAuthRoutes from "./routes/adminAuthRoutes.js";
import adminLeadRoutes from "./routes/adminLeadRoutes.js";
import adminOrderRoutes from "./routes/adminOrderRoutes.js";
import adminLogRoutes from "./routes/adminLogRoutes.js";
import adminAnalyticsRoutes from "./routes/adminAnalyticsRoutes.js";
import adminNotificationRoutes from "./routes/adminNotificationRoutes.js";
import adminSearchRoutes from "./routes/adminSearchRoutes.js";

app.use("/admin/search", adminSearchRoutes);
app.use("/admin/analytics", adminAnalyticsRoutes);
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin/leads", adminLeadRoutes);
app.use("/admin/orders", adminOrderRoutes);
app.use("/admin/logs", adminLogRoutes);
app.use("/admin/notifications", adminNotificationRoutes);

// Connect DB once on boot
connectDB().catch((e) => {
  console.error("Mongo connect error:", e);
  process.exit(1);
});

app.use("/webhook", webhookRoutes);

app.get("/", (req, res) =>
  res.send("JBiz Automations WhatsApp Bot is running 🚀")
);

const PORT = process.env.PORT || 4040;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
