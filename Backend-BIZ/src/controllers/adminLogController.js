import Log from "../models/Log.js";

export const getLogs = async (req, res) => {
  const { type, q } = req.query;

  const filter = {};

  if (type) filter.type = type;

  if (q) {
    filter.$or = [
      { phone: { $regex: q, $options: "i" } },
      { message: { $regex: q, $options: "i" } },
      { intent: { $regex: q, $options: "i" } },
    ];
  }

  const logs = await Log.find(filter).sort({ createdAt: -1 }).limit(500);
  res.json(logs);
};

// export const getLogs = async (req, res) => {
//   const { type } = req.query;

//   const filter = type ? { type } : {};
//   const logs = await Log.find(filter)
//     .sort({ createdAt: -1 })
//     .limit(50);

//   res.json(logs);
// };
