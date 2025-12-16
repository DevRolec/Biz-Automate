import Log from "../models/Log.js";

export const getLogs = async (req, res) => {
  const logs = await Log.find().sort({ createdAt: -1 }).limit(200);
  res.json(logs);
};
