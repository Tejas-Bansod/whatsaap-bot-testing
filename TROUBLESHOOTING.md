# WhatsApp Bot Troubleshooting Guide

## ✅ Current Status
- ✅ App deployed successfully on Render
- ✅ Server is running at: https://whatsaap-bot-testing.onrender.com
- ✅ Environment variables loaded correctly
- ✅ Webhook verification endpoint working
- ✅ Enhanced logging added for debugging

## 🔧 Setup Checklist for Meta/Facebook

### Step 1: Configure Webhook in Meta Developer Console

1. Go to https://developers.facebook.com/
2. Select your WhatsApp Business App
3. Navigate to: **WhatsApp** → **Configuration** → **Webhook**
4. Click **Edit** or **Configure Webhook**
5. Enter the following:
   - **Callback URL**: `https://whatsaap-bot-testing.onrender.com/webhook`
   - **Verify Token**: `tejas123`
6. Click **Verify and Save**
   - ✅ You should see a success message
   - ❌ If it fails, check your Render logs

### Step 2: Subscribe to Webhook Fields

1. In the same Webhook section, find **Webhook fields**
2. Click **Manage** or **Subscribe to fields**
3. Make sure these are **checked/enabled**:
   - ✅ **messages** (REQUIRED)
   - ✅ **message_status** (optional, for delivery status)
4. Click **Save** or **Subscribe**

### Step 3: Verify Phone Number Configuration

1. Go to **WhatsApp** → **API Setup** or **Getting Started**
2. Make sure your test phone number is added:
   - Click **Add phone number** or **Manage phone numbers**
   - Add YOUR personal phone number (the one you're testing with)
   - Verify it with the OTP sent to your phone
3. Check that the **Phone Number ID** matches your env variable:
   - Your PHONE_NUMBER_ID: `960945580428959`

### Step 4: Check Access Token

1. Go to **WhatsApp** → **API Setup**
2. Find the **Temporary access token** or **Permanent token**
3. Make sure it's not expired
4. If using temporary token:
   - ⚠️ It expires in 24 hours
   - Generate a new one if needed
   - Update WHATSAPP_TOKEN in Render environment variables

### Step 5: Test Message Flow

1. Send a test message from your phone to the WhatsApp Business number
2. Check Render logs immediately (within 5 seconds)
3. You should see:
   ```
   🔔 Webhook POST received at: [timestamp]
   📦 Full request body: [JSON data]
   ```

## 🐛 Debugging Steps

### If you don't see ANY webhook logs:

**Problem**: Meta is not sending webhooks to your server

**Solutions**:
1. ✅ Verify webhook URL is correct in Meta console
2. ✅ Check webhook subscription fields are enabled
3. ✅ Ensure your test phone number is registered
4. ✅ Try re-verifying the webhook in Meta console
5. ✅ Check if your WhatsApp Business account is approved

### If you see webhook logs but no message data:

**Problem**: Webhook is receiving events but not message events

**Check the logs for**:
- `⚠️ No messages in value, ignoring event`
- This means Meta is sending status updates, not messages
- Look at the "Value content" in logs to see what type of event it is

**Solutions**:
1. Make sure you're sending TO the business number, not FROM it
2. Check if the message type is supported (text only for now)
3. Verify the webhook subscription includes "messages" field

### If you see message logs but no reply:

**Problem**: Bot is receiving messages but can't send replies

**Check the logs for**:
- `❌ Send failed:` error messages
- This usually means token or phone number ID is wrong

**Solutions**:
1. Verify WHATSAPP_TOKEN is valid and not expired
2. Verify PHONE_NUMBER_ID matches the business number
3. Check if you have permission to send messages to that number
4. Look for specific error messages in the logs

## 🔑 Important Notes

### About WhatsApp Business API:
- You can only send messages to phone numbers that have:
  1. Messaged your business first (within 24 hours), OR
  2. Been added as test numbers in Meta console

### About Render Free Tier:
- ⚠️ Free tier apps sleep after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds to wake up
- This might cause webhook verification to fail
- Consider upgrading or using a paid tier for production

### About Access Tokens:
- **Temporary tokens**: Expire in 24 hours
- **Permanent tokens**: Need to create a System User in Meta Business Manager
- For production, always use permanent tokens

## 📊 Next Steps After It Works

Once you receive your first message successfully:

1. Remove debug logging (or reduce verbosity)
2. Implement your actual bot logic
3. Add error handling for edge cases
4. Set up proper logging/monitoring
5. Consider upgrading Render plan for production use
6. Generate a permanent access token

## 🆘 Still Not Working?

Share the following information:
1. Screenshot of Meta webhook configuration
2. Screenshot of webhook subscription fields
3. Render logs after sending a test message
4. Confirmation that your phone number is registered as a test number
