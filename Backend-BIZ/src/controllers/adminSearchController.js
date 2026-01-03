import Lead from "../models/Lead.js";
import Order from "../models/Order.js";
import Log from "../models/Log.js";

export const globalSearch = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ leads: [], orders: [], logs: [] });

  const regex = { $regex: q, $options: "i" };

  const [leads, orders, logs] = await Promise.all([
    Lead.find({
      $or: [{ phone: regex }, { name: regex }, { email: regex }],
    }).limit(10),

    Order.find({
      $or: [{ userPhone: regex }, { email: regex }],
    }).limit(10),

    Log.find({
      $or: [{ phone: regex }, { message: regex }, { intent: regex }],
    })
      .sort({ createdAt: -1 })
      .limit(20),
  ]);

  res.json({ leads, orders, logs });
};
