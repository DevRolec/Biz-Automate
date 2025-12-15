// Simple inline price table (can later load from DB)
export const PRICE_TABLE = {
  WHATSAPP_BOT: { BASIC: 50000, PRO: 120000, ENTERPRISE: 250000 },
  CRM_BOT: { BASIC: 80000, PRO: 160000, ENTERPRISE: 300000 },
  ECOM_BOT: { BASIC: 90000, PRO: 180000, ENTERPRISE: 350000 },
};

export const computeTotal = ({ botType, pkg, quantity }) => {
  const unit = PRICE_TABLE?.[botType]?.[pkg] || 0;
  return unit * Number(quantity || 1);
};
