import Session from "../models/Session.js";

export const getSession = async (userPhone) => {
  let s = await Session.findOne({ userPhone });
  if (!s)
    s = await Session.create({ userPhone, flow: null, step: null, data: {} });
  return s;
};

export const saveSession = async (s) => {
  s.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 4); // refresh TTL
  await s.save();
};

export const resetSession = async (userPhone) => {
  await Session.deleteOne({ userPhone });
};
