# Cast-POS Quick Start

Get up and running with Cast-POS in 5 minutes!

## 1. Install (2 minutes)

```bash
git clone https://github.com/yourusername/cast-pos.git
cd cast-pos
npm install --legacy-peer-deps
```

## 2. Configure (1 minute)

```bash
cp .env.example .env.local
```

Edit `.env.local` - add your wallet address:

```bash
NEXT_PUBLIC_MERCHANT_ADDRESS=0xYourWalletAddress
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourWalletAddress
```

## 3. Run (30 seconds)

```bash
npm run dev
```

Visit: **http://localhost:3000**

## 4. Test (1 minute)

### Accept a Payment

1. Click **Accept** tab
2. Type `10.00`
3. See QR code? ✅ Working!

### Connect Wallet

1. Click **Treasury** tab
2. Click **Connect Wallet**
3. Select MetaMask
4. Connected? ✅ Working!

## What's Next?

### Get Test Funds

Need Base Sepolia ETH and USDC to fully test:

1. **ETH**: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. **USDC**: Deploy `contracts/tUSDC.sol` or ask in community

### Full Testing

See [TESTING.md](./TESTING.md) for comprehensive testing guide.

### Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) to deploy to Vercel.

## Troubleshooting

**Can't install?**
```bash
npm install --legacy-peer-deps
```

**Port 3000 busy?**
```bash
PORT=3001 npm run dev
```

**Wallet won't connect?**
1. Install MetaMask
2. Add Base Sepolia network
3. Refresh page

**Still stuck?**
- Read [SETUP.md](./SETUP.md) for detailed setup
- Check [README.md](./README.md) for full docs
- Open issue on GitHub

## Key Features

✅ **Accept Payments** - Generate QR codes for USDC payments  
✅ **Treasury Management** - View balance and allocate surplus  
✅ **Wallet Connection** - MetaMask, Coinbase Wallet  
✅ **Mobile Ready** - Responsive design  
✅ **Farcaster Integration** - Works in Warpcast  

## Commands

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Check for errors
```

## File Structure

```
src/
├── app/
│   ├── accept/      # 💰 Payment QR codes
│   ├── treasury/    # 🏦 Balance & allocation
│   └── page.tsx     # 🏠 Home page
├── components/      # 🧩 React components
└── lib/            # 🔧 Utilities
```

## Support

📧 wesley.f.rios@gmail.com  
🐛 GitHub Issues  
📖 Full docs in README.md

---

Built with ❤️ for Farcaster

