import Lead from "../models/Lead.js";

export const captureLead = async ({
  phone,
  message,
  intent = null,
  name = null,
  email = null,
  status = "ENGAGED",
}) => {
  if (!phone) return;

  await Lead.findOneAndUpdate(
    { phone },
    {
      phone,
      lastMessage: message,
      lastIntent: intent,
      status,
      ...(name && { name }),
      ...(email && { email }),
    },
    { upsert: true, new: true }
  );
};
