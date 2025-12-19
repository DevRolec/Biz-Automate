import { detectIntent } from "../automations/keywordRouter.js";
import {
  sendTextMessage,
  // if you still use it elsewhere
  sendOrderTypeList,
  sendPackageList,
  sendQuantityButtons,
  sendConfirmButtons,
} from "../utils/sendMessage.js";
import { getSession, saveSession, resetSession } from "../utils/session.js";
import { captureLead } from "../utils/leadCapture.js";
import { computeTotal } from "../utils/pricing.js";
import Order from "../models/Order.js";
import validator from "validator";

// ... verifyWebhook unchanged ...
export const verifyWebhook = (req, res) => {
  const VERIFY_TOKEN = process.env.WEBHOOK_VERIFY_TOKEN;

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return res.status(200).send(challenge);
  }

  console.log("❌ Webhook verification failed");
  return res.sendStatus(403);
};

export const receiveMessage = async (req, res) => {
  try {
    const data = req.body;
    const message = data?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!message) return res.sendStatus(200);

    const from = message.from; // e.g. "23480xxxxxxx"
    const session = await getSession(from);

    // Helper to gracefully cancel
    const ifCancelled = async (txt) => {
      if (!txt) return false;
      const t = txt.toLowerCase();
      if (["cancel", "stop", "end"].some((x) => t.includes(x))) {
        await resetSession(from);
        await sendTextMessage(
          from,
          "❌ Order cancelled. Type *order* to start again."
        );
        return true;
      }
      return false;
    };

    /* ---------- INTERACTIVE REPLIES (buttons/lists) ---------- */
    if (message.type === "interactive") {
      const replyId =
        message.interactive?.button_reply?.id ||
        message.interactive?.list_reply?.id;

      // Quantity quick buttons
      if (replyId?.startsWith("QTY_")) {
        session.flow = "ORDER";
        session.step = "ORDER_QTY";
        session.data.quantity = Number(replyId.split("_")[1]) || 1;
        await saveSession(session);
        await sendTextMessage(from, "🧑‍💼 Please enter your *Full Name*:");
        session.step = "ORDER_NAME";
        await saveSession(session);
        return res.sendStatus(200);
      }

      switch (replyId) {
        case "ORDER": // from your main menu buttons
          session.flow = "ORDER";
          session.step = "ORDER_BOTTYPE";
          session.data = {};
          await saveSession(session);
          await sendOrderTypeList(from);
          return res.sendStatus(200);

        case "WHATSAPP_BOT":
        case "CRM_BOT":
        case "ECOM_BOT":
          if (session.flow !== "ORDER") {
            session.flow = "ORDER";
          }
          session.data.botType = replyId;
          session.step = "ORDER_PACKAGE";
          await saveSession(session);
          await sendPackageList(from);
          return res.sendStatus(200);

        case "BASIC":
        case "PRO":
        case "ENTERPRISE":
          session.data.pkg = replyId;
          session.step = "ORDER_QTY";
          await saveSession(session);
          await sendQuantityButtons(from);
          return res.sendStatus(200);

        case "CONFIRM_ORDER": {
          // Finalize order
          const { botType, pkg, quantity, fullName, email } =
            session.data || {};
          const amount = computeTotal({ botType, pkg, quantity });
          const order = await Order.create({
            userPhone: from,
            botType,
            pkg,
            quantity,
            fullName,
            email,
            amount,
            status: "PENDING",
          });

          // TODO: Replace with generated payment link
          const payLink = "https://paystack.com/pay/your-link"; // placeholder

          await sendTextMessage(
            from,
            `🧾 *Order Created!* (#${order._id.toString().slice(-6)})\n` +
              `• Bot: ${botType}\n• Package: ${pkg}\n• Qty: ${quantity}\n` +
              `• Customer: ${fullName}\n• Email: ${email}\n` +
              `• Total: ${amount.toLocaleString()} ${
                process.env.CURRENCY || "NGN"
              }\n\n` +
              `💳 Pay here to complete: ${payLink}`
          );

          await resetSession(from);
          return res.sendStatus(200);
        }

        case "CANCEL_ORDER":
          await resetSession(from);
          await sendTextMessage(
            from,
            "❌ Order cancelled. Type *order* to start again."
          );
          return res.sendStatus(200);

        default:
          await sendTextMessage(
            from,
            "I didn't recognize that selection. Please try again."
          );
          return res.sendStatus(200);
      }
    }

    /* ---------- TEXT MESSAGES ---------- */
    if (message.type === "text") {
      const userText = message.text?.body || "";

      await captureLead({
        phone: from,
        message: userText,
        intent,
      });

      // Allow user to cancel at any step
      if (await ifCancelled(userText)) return res.sendStatus(200);

      // If we're mid-order, follow the step machine
      if (session.flow === "ORDER" && session.step) {
        switch (session.step) {
          case "ORDER_BOTTYPE": {
            // If user typed instead of tapping list, try to map quickly
            const t = userText.toLowerCase();
            if (t.includes("whatsapp")) session.data.botType = "WHATSAPP_BOT";
            else if (t.includes("crm")) session.data.botType = "CRM_BOT";
            else if (t.includes("ecom") || t.includes("commerce"))
              session.data.botType = "ECOM_BOT";
            if (!session.data.botType) {
              await sendOrderTypeList(from);
              return res.sendStatus(200);
            }
            session.step = "ORDER_PACKAGE";
            await saveSession(session);
            await sendPackageList(from);
            return res.sendStatus(200);
          }

          case "ORDER_PACKAGE": {
            const t = userText.toUpperCase();
            if (!["BASIC", "PRO", "ENTERPRISE"].includes(t)) {
              await sendPackageList(from);
              return res.sendStatus(200);
            }
            session.data.pkg = t;
            session.step = "ORDER_QTY";
            await saveSession(session);
            await sendQuantityButtons(from);
            return res.sendStatus(200);
          }

          case "ORDER_QTY": {
            const qty = parseInt(userText.replace(/\D/g, ""), 10);
            if (!qty || qty <= 0) {
              await sendTextMessage(
                from,
                "Please enter a valid number for quantity (e.g., 1, 5, 10)."
              );
              return res.sendStatus(200);
            }
            session.data.quantity = qty;
            session.step = "ORDER_NAME";
            await saveSession(session);
            await sendTextMessage(from, "🧑‍💼 Please enter your *Full Name*:");
            return res.sendStatus(200);
          }

          case "ORDER_NAME": {
            if (userText.length < 2) {
              await sendTextMessage(
                from,
                "Name seems too short. Please enter your *Full Name*:"
              );
              return res.sendStatus(200);
            }
            session.data.fullName = userText.trim();

            await captureLead({
              phone: from,
              name: userText.trim(),
            });
            session.step = "ORDER_EMAIL";
            await saveSession(session);
            await sendTextMessage(from, "📧 Enter your *email address*:");
            return res.sendStatus(200);
          }

          case "ORDER_EMAIL": {
            if (!validator.isEmail(userText.trim())) {
              await sendTextMessage(
                from,
                "That doesn't look like a valid email. Please try again:"
              );
              return res.sendStatus(200);
            }
            session.data.email = userText.trim();

            await captureLead({
              phone: from,
              email: userText.trim(),
            });

            await captureLead({
              phone: from,
              status: "ORDERED",
            });

            // Build summary + confirm
            const { botType, pkg, quantity, fullName, email } = session.data;
            const amount = computeTotal({ botType, pkg, quantity });
            const summary =
              `🧾 *Review your order*\n` +
              `• Bot: ${botType}\n• Package: ${pkg}\n• Qty: ${quantity}\n` +
              `• Customer: ${fullName}\n• Email: ${email}\n` +
              `• Total: ${amount.toLocaleString()} ${
                process.env.CURRENCY || "NGN"
              }\n\n` +
              `Confirm to create your order.`;
            session.step = "ORDER_CONFIRM";
            await saveSession(session);
            await sendConfirmButtons(from, summary);
            return res.sendStatus(200);
          }

          case "ORDER_CONFIRM":
            await sendTextMessage(from, "Tap ✅ Confirm or ❌ Cancel.");
            return res.sendStatus(200);

          default:
            await resetSession(from);
            await sendTextMessage(
              from,
              "Session reset. Type *order* to start again."
            );
            return res.sendStatus(200);
        }
      }

      // No active flow → detect intent
      const intent = detectIntent(userText);
      if (intent === "ORDER") {
        session.flow = "ORDER";
        session.step = "ORDER_BOTTYPE";
        session.data = {};
        await saveSession(session);
        await sendOrderTypeList(from);
        return res.sendStatus(200);
      }

      // Fallback to your existing keyword responses
      switch (intent) {
        case "WELCOME":
          await sendTextMessage(
            from,
            "👋 Welcome to JBiz Automations!\nType *menu* to see options."
          );
          break;
        case "MENU":
          await sendTextMessage(
            from,
            "📋 *Main Menu*\n1️⃣ Pricing\n2️⃣ Order Bot\n3️⃣ Talk to Agent\n\nReply with a keyword."
          );
          break;
        case "PRICING":
          await sendTextMessage(
            from,
            "💰 Our WhatsApp Bot starts from ₦50,000.\nType *order* to proceed."
          );
          break;
        case "AGENT":
          await sendTextMessage(
            from,
            "👨‍💼 Connecting you to a human agent shortly..."
          );
          break;
        default:
          await sendTextMessage(
            from,
            "🤖 Sorry, I didn’t understand that.\nType *menu* to see available options."
          );
      }
      return res.sendStatus(200);
    }

    // Ignore other types for now
    return res.sendStatus(200);
  } catch (err) {
    console.error("❌ Webhook error:", err?.response?.data || err);
    return res.sendStatus(500);
  }
};
