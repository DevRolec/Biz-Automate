import Lead from "../models/Lead.js";
import Order from "../models/Order.js";

export const getOverviewStats = async (req, res) => {
  const totalLeads = await Lead.countDocuments();
  const totalOrders = await Order.countDocuments();
  const revenueAgg = await Order.aggregate([
    { $match: { status: "PAID" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  res.json({
    totalLeads,
    totalOrders,
    totalRevenue: revenueAgg[0]?.total || 0,
  });
};

export const getChartData = async (req, res) => {
  const leads = await Lead.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  const orders = await Order.aggregate([
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        revenue: { $sum: "$amount" },
        count: { $sum: 1 },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  res.json({ leads, orders });
};
