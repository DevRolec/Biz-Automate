import Log from "../models/Log.js";

export const logEvent = async ({ phone, type, message, intent, meta }) => {
  try {
    await Log.create({
      phone,
      type,
      message,
      intent,
      meta,
    });
  } catch (err) {
    console.error("❌ Log error:", err.message);
  }
};
