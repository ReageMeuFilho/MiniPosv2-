# Cast-POS Setup Guide

Quick start guide to get Cast-POS running locally in under 10 minutes.

## Quick Setup (5 Minutes)

### 1. Clone & Install

```bash
# Clone the repository
git clone https://github.com/yourusername/cast-pos.git
cd cast-pos

# Install dependencies (this may take 2-3 minutes)
npm install --legacy-peer-deps
```

### 2. Configure Environment

```bash
# Copy environment template
cp .env.example .env.local
```

Edit `.env.local`:

```bash
# Minimum required configuration for local testing
NEXT_PUBLIC_URL=http://localhost:3000
NEXT_PUBLIC_MERCHANT_ADDRESS=0xYourTestWallet
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourReserveWallet
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e
```

**Where to get these values?**

- `MERCHANT_ADDRESS`: Your MetaMask wallet address (where you'll receive payments)
- `RESERVE_ADDRESS`: Another wallet address (can be same as merchant for testing)
- `USDC_ADDRESS`: Use the default test USDC address provided

### 3. Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

🎉 **Done!** You should see the Cast-POS home page.

## Testing Your Setup

### Test 1: Accept Payment (No wallet needed)

1. Go to http://localhost:3000/accept
2. Type `10.00` in the amount field
3. See QR code appear? ✅ Working!

### Test 2: Treasury (Requires wallet)

1. Install [MetaMask browser extension](https://metamask.io/download/)
2. Add Base Sepolia network to MetaMask:
   - Network Name: `Base Sepolia`
   - RPC URL: `https://sepolia.base.org`
   - Chain ID: `84532`
   - Currency Symbol: `ETH`
   - Block Explorer: `https://sepolia.basescan.org`
3. Go to http://localhost:3000/treasury
4. Click "Connect Wallet"
5. Connected? ✅ Working!

## Getting Test Funds

You'll need test funds to fully test the app:

### 1. Get Base Sepolia ETH

Visit: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
- Enter your wallet address
- Request ETH
- Wait 1-2 minutes

### 2. Get Base Sepolia USDC

**Option A: Ask in Discord/Telegram**
Find someone with test USDC to send you some.

**Option B: Deploy Test USDC** (Advanced)

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create file `tUSDC.sol`
3. Copy from `contracts/tUSDC.sol`
4. Compile (Solidity 0.8.21+)
5. Deploy to Base Sepolia
6. Call `mint(yourAddress, 10000000000)` to get 10,000 USDC
7. Update `NEXT_PUBLIC_USDC_ADDRESS` in `.env.local`
8. Restart dev server

## Common Issues

### Issue: `npm install` fails

**Solution**:
```bash
# Use legacy peer deps flag
npm install --legacy-peer-deps
```

### Issue: Port 3000 already in use

**Solution**:
```bash
# Use different port
PORT=3001 npm run dev
```

Then visit: http://localhost:3001

### Issue: "Cannot connect to wallet"

**Solutions**:
1. Make sure MetaMask is installed
2. Make sure you're on Base Sepolia network
3. Try refreshing the page
4. Try different browser

### Issue: "QR code doesn't show"

**Solutions**:
1. Check that amount is valid number (e.g., `12.50`)
2. Check browser console for errors (F12)
3. Verify `NEXT_PUBLIC_MERCHANT_ADDRESS` is set in `.env.local`
4. Restart dev server

### Issue: "Balance shows $0.00"

**Solutions**:
1. Make sure you have Base Sepolia USDC
2. Make sure wallet is connected
3. Click "Refresh" button
4. Check wallet on [Base Sepolia Explorer](https://sepolia.basescan.org)

## Environment Variables Explained

### Required for Accept Payment

```bash
NEXT_PUBLIC_MERCHANT_ADDRESS=0xYourAddress
```
Where customer payments will be sent.

```bash
NEXT_PUBLIC_USDC_ADDRESS=0xTokenAddress
```
USDC token contract address on Base Sepolia.

### Required for Treasury

```bash
NEXT_PUBLIC_RESERVE_ADDRESS=0xReserveAddress
```
Where surplus funds will be allocated.

### Optional

```bash
NEXT_PUBLIC_CHAIN_ID=84532
```
Network chain ID (84532 = Base Sepolia).

```bash
NEXT_PUBLIC_BLOCK_EXPLORER=https://sepolia.basescan.org
```
Block explorer URL for transaction links.

```bash
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```
WalletConnect project ID (optional, get from https://cloud.walletconnect.com).

```bash
JWT_SECRET=your-random-secret
```
Secret for JWT tokens (not used in current phase).

### Farcaster (Phase 3 only)

```bash
NEXT_PUBLIC_FARCASTER_HEADER=
NEXT_PUBLIC_FARCASTER_PAYLOAD=
NEXT_PUBLIC_FARCASTER_SIGNATURE=
```
Leave empty for local development. Only needed for Farcaster integration.

## Next Steps

1. ✅ **Test Accept Payment**: Generate QR codes, scan with mobile wallet
2. ✅ **Test Treasury**: Connect wallet, view balance, allocate surplus
3. 📖 **Read Testing Guide**: See [TESTING.md](./TESTING.md) for detailed tests
4. 🚀 **Deploy**: See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel

## Project Structure

```
cast-pos/
├── src/
│   ├── app/              # Next.js pages
│   │   ├── accept/       # Accept Payment page
│   │   ├── treasury/     # Treasury page
│   │   └── page.tsx      # Home page
│   ├── components/       # React components
│   │   ├── Navigation.tsx
│   │   ├── Header.tsx
│   │   ├── WalletButton.tsx
│   │   └── Providers.tsx
│   └── lib/              # Utilities
│       ├── eip681.ts     # Payment URI builder
│       ├── constants.ts  # App constants
│       ├── utils.ts      # Helper functions
│       └── wagmi.ts      # Wallet config
├── public/               # Static files
├── contracts/            # Smart contracts
│   └── tUSDC.sol        # Test USDC
├── .env.example         # Environment template
├── package.json         # Dependencies
└── README.md            # Main documentation
```

## Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Check for linter errors
npm run lint

# Type check
npm run type-check
```

## IDE Setup (Optional)

### VS Code Extensions

Recommended extensions:
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Error Translator

### VS Code Settings

Create `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Resources

- **Documentation**: See [README.md](./README.md)
- **Testing**: See [TESTING.md](./TESTING.md)
- **Deployment**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **PRD**: See [docs/PRD.md](./docs/PRD.md)

## Support

Need help?
- 📧 Email: wesley.f.rios@gmail.com
- 🐛 Issues: https://github.com/yourusername/cast-pos/issues
- 💬 Discussions: https://github.com/yourusername/cast-pos/discussions

---

**Happy Coding!** 💻

