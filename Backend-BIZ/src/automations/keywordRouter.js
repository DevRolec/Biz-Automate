import { keywordMap } from "./keywordMap.js";

export const detectIntent = (messageText) => {
  if (!messageText) return null;

  const text = messageText.toLowerCase();

  for (const rule of keywordMap) {
    for (const keyword of rule.keywords) {
      if (text.includes(keyword)) {
        return rule.intent;
      }
    }
  }

  return "UNKNOWN";
};
