# Quick Start Guide - Register Your Phone Number

## 🎯 Goal
Register your phone number so you can receive auto-replies from your WhatsApp bot.

## 📍 Step-by-Step Instructions

### Step 1: Open Meta Developer Console
1. Go to: https://developers.facebook.com/
2. Click on **"My Apps"** (top right)
3. Select your WhatsApp Business App

### Step 2: Navigate to WhatsApp Settings
1. In the left sidebar, find **"WhatsApp"**
2. Click on **"API Setup"** or **"Getting Started"**
3. You should see a page with sections like:
   - "From" (your business phone number)
   - "To" (recipient phone numbers)
   - "Send and receive messages"

### Step 3: Add Your Phone Number
1. Look for the **"To"** section or **"Recipient phone numbers"**
2. You might see:
   - A button: **"Add phone number"**
   - Or a link: **"Manage phone numbers"**
   - Or text: **"Add recipient phone number"**
3. Click on it

### Step 4: Enter Your Phone Number
1. Enter your phone number in **international format**:
   ```
   Format: +[country code][phone number]
   
   Examples:
   India:  +919876543210
   USA:    +14155551234
   UK:     +447911123456
   ```
2. **Important**: 
   - Include the `+` sign
   - Include country code
   - No spaces, dashes, or parentheses
   - This must be a WhatsApp-enabled number

### Step 5: Verify with OTP
1. Click **"Send code"** or **"Verify"**
2. You'll receive a **6-digit code** on WhatsApp
3. Open WhatsApp on your phone
4. You should see a message from **"WhatsApp"** with the code
5. Enter the code in the Meta console
6. Click **"Verify"** or **"Confirm"**

### Step 6: Success! ✅
You should see:
- Your phone number listed as a verified recipient
- Status: "Verified" or "Active"
- You can now receive messages from your bot!

## 🧪 Test Your Bot

### Send a Test Message:
1. Open WhatsApp on your phone
2. Start a chat with your **business phone number**
   - This is the "From" number in Meta console
   - Format: Usually shown as a regular phone number
3. Send any text message, for example: "Hello"
4. Wait 2-3 seconds
5. You should receive: **"Bot is live ✅"**

### If You Don't Receive a Reply:
1. Check Render logs (https://dashboard.render.com)
2. Look for:
   ```
   📩 Message from: [your number]
   💬 Text: [your message]
   ✅ Reply sent to [your number]
   ```
3. If you see `❌ Send failed:`, check the error message
4. Refer to `COMMON_ERRORS.md` for solutions

## 📝 Important Notes

### About Test Numbers:
- You can register **up to 5 test numbers** (usually)
- Each number needs to be verified with OTP
- Test numbers can receive messages from your bot
- In production, anyone can message your bot (no registration needed)

### About the Business Phone Number:
- This is provided by Meta (in test mode)
- You don't own this number
- It's only for testing
- For production, you need to register your own business number

### About Message Limits:
- Test mode: Limited messages per day (usually 250)
- Production: Higher limits based on your tier
- See: https://developers.facebook.com/docs/whatsapp/messaging-limits

## 🆘 Troubleshooting

### "I don't see the 'To' section"
- Try scrolling down on the API Setup page
- Or look for "Send and receive messages" section
- Or check "Configuration" tab instead of "Getting Started"

### "I didn't receive the OTP"
- Make sure WhatsApp is installed on that phone
- Check if the number is correct (with country code)
- Wait 1-2 minutes and try again
- Check WhatsApp notifications aren't blocked

### "OTP verification failed"
- Make sure you entered the code correctly
- OTP expires in a few minutes - request a new one
- Try removing any spaces when entering the code

### "My number is verified but I still get error #133010"
- Wait 1-2 minutes after verification
- Try sending a new message
- Check if you're sending TO the business number (not FROM it)
- Verify the PHONE_NUMBER_ID in Render matches Meta console

## 🎉 Next Steps After Success

Once your bot is working:
1. Test different message types
2. Implement your custom bot logic
3. Add more features (commands, AI responses, etc.)
4. Consider upgrading to production mode
5. Get a permanent access token (temporary ones expire in 24h)

## 📚 Additional Resources

- Meta WhatsApp Docs: https://developers.facebook.com/docs/whatsapp
- Getting Started: https://developers.facebook.com/docs/whatsapp/cloud-api/get-started
- Message Templates: https://developers.facebook.com/docs/whatsapp/message-templates
- Webhook Reference: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks
