# Cast-POS: Mini-POS for SMBs

Accept crypto payments as easily as cash, with built-in treasury management.

## Overview

Cast-POS is a Farcaster Mini App that enables small and medium businesses (SMBs) to accept cryptocurrency payments via QR codes and manage their treasury with simple allocation tools. Built on Base Sepolia testnet using USDC.

### Key Features

- ✅ **Accept Payments**: Generate EIP-681 QR codes for instant USDC payments
- 🏦 **Treasury Management**: View balance and allocate surplus to reserve wallets (Phase 2)
- 🔐 **Non-Custodial**: Payments go directly to your wallet
- ⚡ **Fast Settlement**: ~2 second finality on Base L2
- 💰 **Low Fees**: ~$0.01 per transaction
- 📱 **Mobile-First**: PWA with offline support (Phase 4)

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask or Coinbase Wallet
- Base Sepolia test ETH and USDC

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/cast-pos.git
cd cast-pos
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Configure environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```bash
# Your merchant wallet address (where payments will be received)
NEXT_PUBLIC_MERCHANT_ADDRESS=0xYourWalletAddress

# Your reserve wallet address (for surplus allocation)
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourReserveWallet

# Base Sepolia USDC contract address
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Accepting Payments

1. Navigate to the **Accept** tab
2. Enter the payment amount in USD (e.g., `12.50`)
3. Show the QR code to your customer
4. Customer scans with their wallet app (MetaMask, Coinbase Wallet, etc.)
5. Customer approves the pre-filled USDC transfer
6. Click "Mark as Paid" when payment is received

### Testing Payments

You can test payments using:

- **MetaMask Mobile**: Scan QR code with built-in scanner
- **Coinbase Wallet**: Scan QR code with wallet scanner
- **Desktop Testing**: Copy the payment link and paste into your wallet

### Getting Test USDC

You'll need test USDC on Base Sepolia to test payments:

1. Get Base Sepolia ETH from a faucet
2. Use an existing Base Sepolia USDC contract, or
3. Deploy the test USDC contract from `contracts/tUSDC.sol`

## Project Structure

```
cast-pos/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── accept/       # Payment acceptance page
│   │   ├── treasury/     # Treasury management (Phase 2)
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   └── Navigation.tsx
│   └── lib/              # Utilities and helpers
│       ├── eip681.ts     # EIP-681 URI builder
│       ├── constants.ts  # App constants
│       └── utils.ts      # Helper functions
├── public/               # Static assets
├── contracts/            # Smart contracts
│   └── tUSDC.sol        # Test USDC contract
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Blockchain**: Viem, Wagmi, Base Sepolia
- **Farcaster**: @farcaster/frame-sdk
- **QR Codes**: qrcode.react
- **Deployment**: Vercel

## Development Roadmap

### ✅ Phase 1: Core Payment Acceptance (Current)
- Accept payment screen with QR code generation
- EIP-681 URI builder
- Basic navigation
- Mobile-responsive design

### 🚧 Phase 2: Treasury Management (Next)
- Wallet connection (Wagmi + Viem)
- USDC balance reading
- Surplus calculation
- One-click allocation to reserve wallet

### 📋 Phase 3: Farcaster Integration
- Farcaster manifest endpoint
- Sign-In With Farcaster (SIWE)
- Account association
- Mini app discovery in Warpcast

### 📋 Phase 4: Progressive Web App
- Service worker for offline support
- Web app manifest
- Installability
- Background sync

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Configure environment variables in Vercel dashboard
4. Deploy!

```bash
# Or use Vercel CLI
vercel --prod
```

### Environment Variables for Production

Make sure to set these in your Vercel project settings:

- `NEXT_PUBLIC_URL`: Your deployed app URL
- `NEXT_PUBLIC_MERCHANT_ADDRESS`: Your merchant wallet
- `NEXT_PUBLIC_RESERVE_ADDRESS`: Your reserve wallet
- `NEXT_PUBLIC_USDC_ADDRESS`: USDC contract address

## EIP-681 Payment URI Format

Cast-POS generates payment URIs following the EIP-681 standard:

```
ethereum:<token>/transfer?address=<to>&uint256=<amount>&chainId=<chainId>
```

Example:
```
ethereum:0x036CbD53842c5426634e7929541eC2318f3dCF7e/transfer?address=0xMerchant&uint256=12500000&chainId=84532
```

This pre-fills the wallet transaction for the customer, making payment as simple as scanning and confirming.

## Security Considerations

- ✅ Non-custodial: Payments go directly to your wallet
- ✅ No private keys stored in the app
- ✅ Client-side QR generation (no server-side data)
- ✅ Standard ERC-20 transfers (no custom logic)
- ⚠️ Always verify merchant address in `.env`
- ⚠️ Use testnet for development/testing
- ⚠️ Consider additional validation for production

## Testing

### Manual Testing Checklist

**Accept Payment Screen:**
- [ ] Enter amount → QR code updates
- [ ] Scan QR with wallet → transfer pre-fills
- [ ] Copy link → URI copied to clipboard
- [ ] Mark as paid → confirmation shows
- [ ] Works on mobile browsers

**Navigation:**
- [ ] Switch between tabs
- [ ] Active tab highlighted
- [ ] Mobile responsive

## Troubleshooting

### QR Code Not Scanning

- Ensure your wallet app supports EIP-681 URIs
- Try increasing brightness/contrast
- Use the "Copy Link" button and paste manually

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install --legacy-peer-deps
npm run build
```

### TypeScript Errors

Ensure your `tsconfig.json` has `target: "ES2020"` for BigInt support.

## Contributing

This project was built following the [Farcaster Mini App Starter Template](https://github.com/builders-garden/farcaster-miniapp-starter) and [Base Mini Apps QuickStart](https://docs.base.org/mini-apps/quickstart/create-new-miniapp).

## Resources

- [Product Requirements Document](./docs/PRD.md)
- [EIP-681 Specification](https://eips.ethereum.org/EIPS/eip-681)
- [Farcaster Mini Apps Docs](https://docs.farcaster.xyz/developers/frames/mini-apps)
- [Base Documentation](https://docs.base.org)
- [Viem Documentation](https://viem.sh)

## License

MIT

## Contact

- Developer: Wesley Rios
- Email: wesley.f.rios@gmail.com
- GitHub: https://github.com/ReageMeuFilho/crypto-brokerage-miniapp

---

Built with ❤️ for the Farcaster ecosystem

