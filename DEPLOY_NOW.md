# 🚀 Deploy Cast-POS to Vercel - Step by Step

**Ready to deploy your Cast-POS mini app? Follow these steps!**

---

## Step 1: Go to Vercel

**Click this link:** https://vercel.com/new

(You'll need to sign in with GitHub if you haven't already)

---

## Step 2: Import Your Repository

1. On the "Import Git Repository" page, you should see your repositories
2. Look for **`ReageMeuFilho/MiniPosv2-`**
3. Click the **"Import"** button next to it

**If you don't see it:**
- Click "Add GitHub Account"
- Authorize Vercel to access your repositories
- Select "ReageMeuFilho/MiniPosv2-"

---

## Step 3: Configure Your Project

Vercel will show a configuration screen. Here's what to set:

### Project Settings:
- **Project Name**: `cast-pos` (or whatever you prefer)
- **Framework Preset**: Next.js ✅ (should auto-detect)
- **Root Directory**: `./` (leave as is)
- **Build Command**: `npm run build` (already configured)
- **Install Command**: `npm install --legacy-peer-deps` (already configured)

---

## Step 4: Add Environment Variables

**This is CRITICAL!** Click "Environment Variables" and add these:

### Required Variables:

```
NEXT_PUBLIC_MERCHANT_ADDRESS
```
**Value:** Your MetaMask wallet address (where payments will go)  
**Example:** `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

```
NEXT_PUBLIC_RESERVE_ADDRESS
```
**Value:** Your reserve wallet address (where surplus goes)  
**Example:** `0x1234567890123456789012345678901234567890`

```
NEXT_PUBLIC_USDC_ADDRESS
```
**Value:** `0x036CbD53842c5426634e7929541eC2318f3dCF7e`  
(Base Sepolia USDC - keep this as is)

```
NEXT_PUBLIC_CHAIN_ID
```
**Value:** `84532`  
(Base Sepolia chain ID - keep this as is)

```
NEXT_PUBLIC_BLOCK_EXPLORER
```
**Value:** `https://sepolia.basescan.org`  
(Keep this as is)

```
JWT_SECRET
```
**Value:** Any random string  
**Example:** `my-super-secret-jwt-key-change-in-production`

### How to Add Each Variable:

1. Type the variable name (e.g., `NEXT_PUBLIC_MERCHANT_ADDRESS`)
2. Paste the value
3. Click "Add"
4. Repeat for all variables above

**IMPORTANT:** 
- Replace the wallet addresses with YOUR actual addresses!
- The MERCHANT_ADDRESS is where customers will send payments
- The RESERVE_ADDRESS is where surplus funds will be allocated

---

## Step 5: Deploy!

1. After adding all environment variables, scroll down
2. Click the big **"Deploy"** button
3. Wait 2-3 minutes while Vercel builds your app

**You'll see:**
- ✅ Installing dependencies
- ✅ Building application  
- ✅ Deploying...
- 🎉 Deployment ready!

---

## Step 6: Get Your URL

Once deployed, Vercel will show you:

**Your live URL:** `https://cast-pos-xxx.vercel.app`

Click it to view your deployed app! 🎉

---

## Step 7: Test Your Deployment

Visit your deployed URL and test:

1. **Home Page** - Should load ✅
2. **Accept Payment** (`/accept`) - Enter `10.00` and see QR code ✅
3. **Treasury** (`/treasury`) - Click "Connect Wallet" ✅

---

## Step 8: Update Your Environment

After deployment, update ONE more environment variable:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Find `NEXT_PUBLIC_URL`
4. Change it from `https://your-app.vercel.app` to your actual URL
5. Example: `https://cast-pos-abc123.vercel.app`
6. Click "Save"
7. Go to "Deployments" and click "Redeploy" on the latest deployment

---

## ⚠️ Common Issues & Solutions

### Issue: "Build Failed"

**Solution:**
- Check that Install Command is: `npm install --legacy-peer-deps`
- Verify all environment variables are added
- Check deployment logs for specific errors

### Issue: "QR Code Doesn't Generate"

**Solution:**
- Verify `NEXT_PUBLIC_MERCHANT_ADDRESS` is set correctly
- Make sure it's a valid Ethereum address (starts with 0x)

### Issue: "Can't Connect Wallet"

**Solution:**
- This is normal on first deploy
- The WalletConnect error you saw is expected without a project ID
- Wallet connection via MetaMask/Coinbase will still work

### Issue: "Icon Missing Warnings"

**Solution:**
- These warnings are normal (404 for icon-192x192.png)
- App works fine without icons
- You can add icons later to `public/` folder

---

## 🎯 After Deployment Checklist

- [ ] Visit your deployed URL
- [ ] Test Accept Payment page
- [ ] Generate a QR code
- [ ] Test Treasury page (requires MetaMask)
- [ ] Share your URL!

---

## 🔄 Making Updates

When you make changes to your code:

1. Commit and push to GitHub:
   ```powershell
   git add .
   git commit -m "Your update message"
   git push
   ```

2. Vercel will **automatically redeploy**! 🎉
   - No manual deployment needed
   - Takes 2-3 minutes
   - You'll get notified when ready

---

## 📱 Optional: Add Custom Domain

1. In Vercel dashboard, go to "Settings" → "Domains"
2. Add your custom domain (e.g., `pos.yourcompany.com`)
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_URL` environment variable

---

## 🎊 Next Steps: Farcaster Integration

After your app is deployed, you can integrate with Farcaster:

1. Go to https://www.base.dev/preview
2. Enter your deployed URL
3. Generate Farcaster credentials
4. Add them to Vercel environment variables:
   - `NEXT_PUBLIC_FARCASTER_HEADER`
   - `NEXT_PUBLIC_FARCASTER_PAYLOAD`
   - `NEXT_PUBLIC_FARCASTER_SIGNATURE`
5. Redeploy

---

## 📞 Need Help?

If you get stuck:
1. Check Vercel deployment logs (click on deployment → "View Logs")
2. Review the `DEPLOYMENT.md` file for detailed troubleshooting
3. Check that all environment variables are correct

---

## ✅ Success Criteria

Your deployment is successful when:
- ✅ Vercel shows "Deployment Ready"
- ✅ Your URL loads the home page
- ✅ Accept page shows QR code when you enter an amount
- ✅ Treasury page prompts to connect wallet

---

**Ready? Let's deploy! Go to:** https://vercel.com/new

**Your GitHub repo:** https://github.com/ReageMeuFilho/MiniPosv2-

---

**🚀 You're about to launch your crypto payment app to the world!**

