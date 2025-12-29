import axios from "axios";
import { logEvent } from "./logger.js";

const baseUrl = (id) => `https://graph.facebook.com/v17.0/${id}/messages`;

const headers = {
  Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
  "Content-Type": "application/json",
};

/* ---------- TEXT MESSAGE ---------- */
export const sendTextMessage = async (to, text) => {
  await axios.post(
    baseUrl(process.env.PHONE_NUMBER_ID),
    {
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text },
    },
    { headers }
  );

  // ✅ LOG OUTGOING MESSAGE
  await logEvent({
    phone: to,
    type: "OUTGOING",
    message: text,
  });
};

/* ---------- BUTTON MESSAGE ---------- */
export const sendButtonMessage = async (to, buttons, text) => {
  await axios.post(
    baseUrl(process.env.PHONE_NUMBER_ID),
    {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "button",
        body: { text },
        action: { buttons },
      },
    },
    { headers }
  );

  await logEvent({
    phone: to,
    type: "OUTGOING",
    message: text,
  });
};

/* ---------- ORDER TYPE LIST ---------- */
export const sendOrderTypeList = async (to) => {
  await axios.post(
    baseUrl(process.env.PHONE_NUMBER_ID),
    {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: "🛒 Select the bot you want to order:" },
        footer: { text: "JBiz Automations" },
        action: {
          button: "Choose bot",
          sections: [
            {
              title: "Available Bots",
              rows: [
                {
                  id: "WHATSAPP_BOT",
                  title: "WhatsApp Automation Bot",
                  description: "Sales & support automation",
                },
                {
                  id: "CRM_BOT",
                  title: "CRM Bot",
                  description: "Lead capture & follow-up",
                },
                {
                  id: "ECOM_BOT",
                  title: "E-commerce Bot",
                  description: "Orders & payments",
                },
              ],
            },
          ],
        },
      },
    },
    { headers }
  );

  await logEvent({
    phone: to,
    type: "OUTGOING",
    message: "Order type list sent",
  });
};

/* ---------- PACKAGE LIST ---------- */
export const sendPackageList = async (to) => {
  await axios.post(
    baseUrl(process.env.PHONE_NUMBER_ID),
    {
      messaging_product: "whatsapp",
      to,
      type: "interactive",
      interactive: {
        type: "list",
        body: { text: "📦 Choose a package:" },
        footer: {
          text: "BASIC → starter • PRO → growth • ENTERPRISE → advanced",
        },
        action: {
          button: "Select package",
          sections: [
            {
              title: "Packages",
              rows: [
                { id: "BASIC", title: "BASIC" },
                { id: "PRO", title: "PRO" },
                { id: "ENTERPRISE", title: "ENTERPRISE" },
              ],
            },
          ],
        },
      },
    },
    { headers }
  );

  await logEvent({
    phone: to,
    type: "OUTGOING",
    message: "Package list sent",
  });
};

/* ---------- QUANTITY BUTTONS ---------- */
export const sendQuantityButtons = async (to) => {
  await sendButtonMessage(
    to,
    [
      { type: "reply", reply: { id: "QTY_1", title: "1" } },
      { type: "reply", reply: { id: "QTY_5", title: "5" } },
      { type: "reply", reply: { id: "QTY_10", title: "10" } },
    ],
    "🔢 How many licenses do you want?"
  );
};

/* ---------- CONFIRM BUTTONS ---------- */
export const sendConfirmButtons = async (to, summaryText) => {
  await sendButtonMessage(
    to,
    [
      { type: "reply", reply: { id: "CONFIRM_ORDER", title: "✅ Confirm" } },
      { type: "reply", reply: { id: "CANCEL_ORDER", title: "❌ Cancel" } },
    ],
    summaryText
  );
};
