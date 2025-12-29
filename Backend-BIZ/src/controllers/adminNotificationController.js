import Log from "../models/Log.js";

export const getNotifications = async (req, res) => {
  const logs = await Log.find({
    type: { $in: ["ORDER", "INCOMING", "SYSTEM"] },
  })
    .sort({ createdAt: -1 })
    .limit(10);

  res.json(logs);
};
