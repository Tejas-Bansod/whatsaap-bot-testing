# Railway Deployment Guide

## Environment Variables Setup

Your WhatsApp bot requires the following environment variables to be set in Railway:

### Required Variables:

1. **VERIFY_TOKEN** - Your webhook verification token
   - Example: `tejas123`

2. **WHATSAPP_TOKEN** - Your WhatsApp Business API access token
   - Get this from Meta/Facebook Developer Console
   - This is a long token starting with `EAA...`

3. **PHONE_NUMBER_ID** - Your WhatsApp Business Phone Number ID
   - Example: `960945580428959`

### Optional Variables:

4. **NODE_ENV** - Set to `production` (Railway usually sets this automatically)
   - This tells the app not to load `.env` file

5. **PORT** - Railway provides this automatically, no need to set it manually

## How to Add Variables in Railway:

1. Go to your Railway project dashboard
2. Click on your service/deployment
3. Navigate to the **Variables** tab
4. Click **+ New Variable**
5. Add each variable with its name and value
6. Click **Add** for each one
7. Railway will automatically redeploy your app

## Troubleshooting:

If you see "Missing environment variables" error:
- Double-check that all 3 required variables are set in Railway
- Make sure there are no typos in variable names (they are case-sensitive)
- Check the deployment logs for the "🔍 Environment check" output
- Ensure the variables are set in the correct service (if you have multiple)

## Security Note:

⚠️ **Never commit your `.env` file to Git!** 
- The `.env` file should be in `.gitignore`
- Environment variables in Railway are secure and encrypted
- Regenerate your WHATSAPP_TOKEN periodically for security
