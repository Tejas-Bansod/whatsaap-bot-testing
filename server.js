import express from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

const {
  PORT,
  VERIFY_TOKEN,
  WHATSAPP_TOKEN,
  PHONE_NUMBER_ID
} = process.env;

if (!PORT || !VERIFY_TOKEN || !WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
  throw new Error("Missing environment variables");
}

app.get("/", (req, res) => {
  res.send("WhatsApp Bot is running");
});

/* ===============================
   WEBHOOK VERIFICATION (GET)
================================ */
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

/* ===============================
   WEBHOOK RECEIVER (POST)
================================ */
app.post("/webhook", async (req, res) => {
  // Always respond immediately
  res.sendStatus(200);

  try {
    const entry = req.body.entry?.[0];
    const change = entry?.changes?.[0];
    const value = change?.value;

    // Ignore non-message events
    if (!value?.messages) return;

    const message = value.messages[0];

    // Only text messages (testing phase)
    if (message.type !== "text") return;

    const from = message.from; // sender phone
    const text = message.text.body;

    console.log("📩 Message from:", from);
    console.log("💬 Text:", text);

    // Auto-reply (static)
    await sendMessage(from, "Bot is live ✅");

  } catch (err) {
    console.error("Webhook error:", err.message);
  }
});

/* ===============================
   SEND MESSAGE FUNCTION
================================ */
async function sendMessage(to, body) {
  try {
    await axios.post(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body }
      },
      {
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json"
        }
      }
    );

    console.log("✅ Reply sent to", to);

  } catch (err) {
    console.error(
      "❌ Send failed:",
      err.response?.data || err.message
    );
  }
}

/* ===============================
   SERVER START
================================ */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
