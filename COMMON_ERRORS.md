# Common WhatsApp Bot Errors & Solutions

## Error: (#133010) Account not registered

### What it means:
You're trying to send a message to a phone number that hasn't been registered as a test recipient in Meta Developer Console.

### Why it happens:
WhatsApp Business API has restrictions on who you can send messages to:
- In **test/sandbox mode**: You can only send to registered test numbers
- In **production mode**: You can send to anyone who messaged you first (within 24 hours)

### Solution:

#### Step 1: Register Your Phone Number as Test Recipient

1. Go to https://developers.facebook.com/
2. Select your WhatsApp Business App
3. Navigate to **WhatsApp** → **API Setup** or **Getting Started**
4. Look for one of these sections:
   - "To" (recipient section)
   - "Send and receive messages"
   - "Test numbers"
   - "Recipient phone numbers"
5. Click **"Add phone number"** or **"Manage phone numbers"**
6. Enter your phone number in international format:
   - Format: `+[country code][number]`
   - Example: `+919876543210` (India)
   - Example: `+14155551234` (USA)
7. Click **"Send code"** or **"Verify"**
8. You'll receive a 6-digit OTP on WhatsApp
9. Enter the OTP to verify
10. Your number is now registered! ✅

#### Step 2: Test Again

1. Send a message from your registered phone to the business number
2. Check Render logs - you should see:
   ```
   📩 Message from: [your number]
   💬 Text: [your message]
   ✅ Reply sent to [your number]
   ```
3. You should receive the auto-reply on WhatsApp!

### Additional Notes:

- **Test numbers limit**: You can usually register up to 5 test numbers
- **OTP expiry**: The verification code expires in a few minutes
- **Number format**: Must include country code without spaces or dashes
- **WhatsApp requirement**: The phone number must have WhatsApp installed

---

## Error: (#100) Invalid parameter

### What it means:
One of your API parameters is incorrect or missing.

### Common causes:
1. Wrong `PHONE_NUMBER_ID` - doesn't match your business phone
2. Malformed message payload
3. Invalid recipient phone number format

### Solution:
1. Verify your `PHONE_NUMBER_ID` in Meta console:
   - Go to WhatsApp → API Setup
   - Copy the "Phone number ID" (not the phone number itself)
   - Update your Render environment variable
2. Check phone number format in messages (should be without `+` or spaces)

---

## Error: (#190) Access token has expired

### What it means:
Your `WHATSAPP_TOKEN` is no longer valid.

### Common causes:
1. Using a **temporary token** (expires in 24 hours)
2. Token was revoked or regenerated

### Solution:

#### For Testing (Quick Fix):
1. Go to Meta Developer Console
2. Navigate to WhatsApp → API Setup
3. Find "Temporary access token"
4. Click "Generate token" or copy the existing one
5. Update `WHATSAPP_TOKEN` in Render environment variables
6. Redeploy your service

#### For Production (Permanent Fix):
1. Create a **System User** in Meta Business Manager
2. Generate a **permanent access token**
3. Use that token instead of temporary one
4. See: https://developers.facebook.com/docs/whatsapp/business-management-api/get-started

---

## Error: Webhook verification failed

### What it means:
Meta couldn't verify your webhook URL.

### Common causes:
1. Wrong `VERIFY_TOKEN` in Meta console
2. Server not responding (Render app sleeping)
3. Wrong webhook URL

### Solution:
1. Verify webhook URL is: `https://whatsaap-bot-testing.onrender.com/webhook`
2. Verify token matches: `tejas123`
3. If using Render free tier, wake up the app first:
   - Visit `https://whatsaap-bot-testing.onrender.com/` in browser
   - Wait 30 seconds for app to wake up
   - Then try webhook verification again

---

## Error: No webhook events received

### What it means:
Your bot is running but not receiving any messages.

### Common causes:
1. Webhook not configured in Meta console
2. Webhook fields not subscribed
3. Sending messages FROM business number instead of TO it

### Solution:
1. Check webhook configuration:
   - Meta Console → WhatsApp → Configuration → Webhook
   - Callback URL should be set
   - Status should show "Active" or "Verified"
2. Check webhook subscriptions:
   - Click "Manage" webhook fields
   - Ensure "messages" is checked ✅
3. Send message TO the business number, not FROM it

---

## Error: Message received but no auto-reply

### What it means:
Bot receives the message but doesn't send a reply.

### Common causes:
1. Recipient not registered (see #133010 error above)
2. Message type not supported (e.g., image, video)
3. Token or phone number ID incorrect

### Solution:
1. Check Render logs for specific error message
2. Look for `❌ Send failed:` in logs
3. Follow the error-specific solution above
4. Current bot only supports text messages - check message type in logs

---

## Tips for Debugging

### Always check Render logs:
1. Go to Render dashboard
2. Click on your service
3. Go to "Logs" tab
4. Look for these indicators:
   - `🔔 Webhook POST received` - Webhook is working
   - `📩 Message from:` - Message parsed successfully
   - `✅ Reply sent` - Reply sent successfully
   - `❌ Send failed:` - Error sending reply

### Test webhook manually:
```bash
# Test GET (verification)
curl "https://whatsaap-bot-testing.onrender.com/webhook?hub.mode=subscribe&hub.verify_token=tejas123&hub.challenge=test"

# Should return: test
```

### Common Meta Console Locations:
- **Webhook setup**: WhatsApp → Configuration → Webhook
- **Access tokens**: WhatsApp → API Setup → Temporary access token
- **Phone numbers**: WhatsApp → API Setup → From/To sections
- **Test recipients**: WhatsApp → API Setup → Add recipient phone number
