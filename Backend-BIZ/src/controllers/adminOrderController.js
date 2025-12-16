import Order from "../models/Order.js";

export const getOrders = async (req, res) => {
  const { status } = req.query;
  const filter = status ? { status } : {};
  const orders = await Order.find(filter).sort({ createdAt: -1 });
  res.json(orders);
};

export const markOrderPaid = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findByIdAndUpdate(
    id,
    { status: "PAID" },
    { new: true }
  );
  res.json(order);
};
