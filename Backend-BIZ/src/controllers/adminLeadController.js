import Lead from "../models/Lead.js";

export const getLeads = async (req, res) => {
  const { status, q } = req.query;

  const filter = {};
  if (status) filter.status = status;
  if (q) {
    filter.$or = [
      { phone: { $regex: q, $options: "i" } },
      { email: { $regex: q, $options: "i" } },
      { name: { $regex: q, $options: "i" } },
    ];
  }

  const leads = await Lead.find(filter).sort({ updatedAt: -1 });
  res.json(leads);
};

export const updateLeadStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const lead = await Lead.findByIdAndUpdate(id, { status }, { new: true });

  res.json(lead);
};
