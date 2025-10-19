# Cast-POS Deployment Guide

This guide will walk you through deploying Cast-POS to Vercel and integrating it with Farcaster.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Base Sepolia test wallets (merchant and reserve)
- Base Sepolia test USDC and ETH

## Step 1: Prepare Your Environment

### 1.1 Get Test Funds

1. **Get Base Sepolia ETH**:
   - Visit a Base Sepolia faucet (e.g., https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet)
   - Request test ETH for your merchant and reserve wallets

2. **Get Test USDC**:
   - Option A: Use existing Base Sepolia USDC contract: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
   - Option B: Deploy the `contracts/tUSDC.sol` contract using Remix IDE
   - Mint test USDC to your merchant wallet for testing

### 1.2 Create Wallets

You need two wallet addresses:
- **Merchant Wallet**: Where customer payments will be received
- **Reserve Wallet**: Where surplus funds will be allocated

You can use the same wallet for testing or create separate wallets for better separation.

## Step 2: Deploy to Vercel

### 2.1 Push to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Cast-POS v2.0"

# Add your GitHub repository as remote
git remote add origin https://github.com/yourusername/cast-pos.git

# Push to GitHub
git push -u origin main
```

### 2.2 Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Import Project"
3. Import your GitHub repository
4. Configure project settings:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Install Command: `npm install --legacy-peer-deps`

### 2.3 Configure Environment Variables

In the Vercel dashboard, add these environment variables:

```bash
# Required
NEXT_PUBLIC_URL=https://your-app.vercel.app
NEXT_PUBLIC_MERCHANT_ADDRESS=0xYourMerchantWallet
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourReserveWallet
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e

# Network Configuration
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_BLOCK_EXPLORER=https://sepolia.basescan.org

# Authentication (generate a random string)
JWT_SECRET=your-random-256-bit-secret

# Farcaster (leave empty for now, will fill in Step 3)
NEXT_PUBLIC_FARCASTER_HEADER=
NEXT_PUBLIC_FARCASTER_PAYLOAD=
NEXT_PUBLIC_FARCASTER_SIGNATURE=

# Optional: WalletConnect
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-walletconnect-project-id
```

### 2.4 Deploy

1. Click "Deploy"
2. Wait for deployment to complete
3. Visit your app at `https://your-app.vercel.app`

## Step 3: Farcaster Integration

### 3.1 Generate Account Association

1. Visit your deployed app at `https://your-app.vercel.app`

2. Use the Base Mini Apps preview tool:
   - Go to [base.dev/preview](https://www.base.dev/preview)
   - Enter your app URL
   - Follow the instructions to generate account association credentials

3. Alternative method using Warpcast:
   - Open Warpcast mobile app
   - Go to Settings → Developer → Domains
   - Add your domain: `your-app.vercel.app`
   - Sign the account association request
   - Copy the generated credentials:
     - `farcaster_header`
     - `farcaster_payload`
     - `farcaster_signature`

### 3.2 Update Environment Variables

1. Go back to Vercel dashboard
2. Navigate to Settings → Environment Variables
3. Update these variables with your credentials:

```bash
NEXT_PUBLIC_FARCASTER_HEADER=<your-header>
NEXT_PUBLIC_FARCASTER_PAYLOAD=<your-payload>
NEXT_PUBLIC_FARCASTER_SIGNATURE=<your-signature>
```

### 3.3 Redeploy

```bash
# Trigger a new deployment in Vercel
# Or use CLI:
vercel --prod --yes --force
```

### 3.4 Verify Manifest

1. Visit `https://your-app.vercel.app/.well-known/farcaster.json`
2. Verify that the JSON contains your account association credentials
3. Check that all URLs are correct

## Step 4: Testing

### 4.1 Test Accept Payment Flow

1. Visit `https://your-app.vercel.app/accept`
2. Enter an amount (e.g., `12.50`)
3. Verify QR code appears
4. Scan with MetaMask or Coinbase Wallet mobile app
5. Verify transaction pre-fills with correct:
   - Recipient address (your merchant wallet)
   - Amount (12.50 USDC)
   - Token (USDC)
   - Network (Base Sepolia)

### 4.2 Test Treasury Management

1. Visit `https://your-app.vercel.app/treasury`
2. Click "Connect Wallet" in header
3. Connect your merchant wallet
4. Verify your USDC balance appears
5. Set operating target (e.g., `100`)
6. If you have surplus:
   - Click "Allocate to Reserve"
   - Approve transaction
   - Verify funds transfer to reserve wallet

### 4.3 Test in Farcaster

1. Open Warpcast or Base app on mobile
2. Navigate to Mini Apps section
3. Search for "Cast-POS"
4. Open the mini app
5. Test all features within Farcaster client

## Step 5: Production Deployment

### 5.1 Switch to Base Mainnet (Optional)

⚠️ **Only do this when ready for production!**

1. Update environment variables:
```bash
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
NEXT_PUBLIC_BLOCK_EXPLORER=https://basescan.org
```

2. Update `src/lib/wagmi.ts` to use `base` instead of `baseSepolia`

3. Redeploy

### 5.2 Custom Domain (Optional)

1. Go to Vercel dashboard → Settings → Domains
2. Add your custom domain (e.g., `pos.yourcompany.com`)
3. Update DNS records as instructed
4. Update `NEXT_PUBLIC_URL` environment variable
5. Regenerate Farcaster account association with new domain
6. Redeploy

## Troubleshooting

### Build Fails

**Issue**: Build fails with package errors

**Solution**:
```bash
# Clear Vercel cache
vercel env pull
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### QR Code Not Working

**Issue**: Scanning QR doesn't pre-fill wallet

**Solutions**:
- Verify `NEXT_PUBLIC_MERCHANT_ADDRESS` is correct
- Verify `NEXT_PUBLIC_USDC_ADDRESS` matches Base Sepolia USDC
- Try different wallet apps (MetaMask, Coinbase Wallet)
- Check that wallet supports EIP-681 URIs

### Wallet Won't Connect

**Issue**: Wallet connection fails

**Solutions**:
- Ensure you're on Base Sepolia network
- Clear browser cache
- Try different connector (MetaMask vs Coinbase Wallet)
- Check browser console for errors

### Transaction Fails

**Issue**: Allocation transaction fails

**Solutions**:
- Ensure you have enough ETH for gas
- Verify you have USDC balance
- Check that reserve address is correct
- Ensure surplus > 0

### Farcaster Manifest Not Loading

**Issue**: `/.well-known/farcaster.json` returns 404

**Solutions**:
- Check that route file is in correct location: `src/app/.well-known/farcaster.json/route.ts`
- Verify environment variables are set
- Clear Vercel cache and redeploy
- Check Next.js config allows JSON responses

## Monitoring & Maintenance

### Check App Health

```bash
# View deployment logs
vercel logs <deployment-url>

# Check environment variables
vercel env ls
```

### Update Dependencies

```bash
# Check for updates
npm outdated

# Update packages
npm update

# Test locally
npm run build
npm start

# If all works, commit and push
git add package.json package-lock.json
git commit -m "Update dependencies"
git push
```

### Monitor Usage

1. Vercel Analytics: Track page views and performance
2. Base Sepolia Explorer: Monitor transactions
3. Wallet balance: Check merchant and reserve wallets regularly

## Security Checklist

Before going to production:

- [ ] Use different wallets for merchant and reserve
- [ ] Store private keys securely (never commit to git)
- [ ] Enable 2FA on Vercel account
- [ ] Enable 2FA on GitHub account
- [ ] Review all environment variables
- [ ] Test on mainnet with small amounts first
- [ ] Set up monitoring and alerts
- [ ] Have backup plan for wallet recovery

## Support

If you encounter issues:

1. Check the [README.md](./README.md) for basic troubleshooting
2. Review Vercel deployment logs
3. Check Base Sepolia explorer for transaction errors
4. Open an issue on GitHub

## Next Steps

After successful deployment:

1. Test thoroughly with small amounts
2. Gather user feedback
3. Implement Phase 4 (PWA features)
4. Add analytics
5. Consider mainnet deployment
6. Promote in Farcaster ecosystem

---

**Congratulations!** 🎉 Your Cast-POS app is now deployed and ready to accept crypto payments!

