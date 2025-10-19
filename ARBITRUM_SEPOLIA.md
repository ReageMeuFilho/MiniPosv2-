# Arbitrum Sepolia Configuration

Cast-POS is now configured for **Arbitrum Sepolia** testnet!

---

## 🌐 Network Details

| Property | Value |
|----------|-------|
| **Network Name** | Arbitrum Sepolia |
| **Chain ID** | `421614` |
| **RPC URL** | `https://sepolia-rollup.arbitrum.io/rpc` |
| **Block Explorer** | https://sepolia.arbiscan.io |
| **Currency Symbol** | ETH |
| **Type** | Layer 2 (Optimistic Rollup) |

---

## 💰 USDC Token Address

**Arbitrum Sepolia USDC**: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`

This is the official USDC.e (bridged USDC) on Arbitrum Sepolia testnet.

---

## 🔧 Configuration Changes

### Updated Files:
- ✅ `src/lib/wagmi.ts` - Changed from `baseSepolia` to `arbitrumSepolia`
- ✅ `src/lib/constants.ts` - Updated chain ID to `421614` and explorer URL
- ✅ `.env.local` - Updated all environment variables
- ✅ `src/app/accept/page.tsx` - Updated network display text

### Key Changes:
```typescript
// Before (Base Sepolia)
CHAIN_ID: 84532
USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
Explorer: https://sepolia.basescan.org

// After (Arbitrum Sepolia)
CHAIN_ID: 421614
USDC: 0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d
Explorer: https://sepolia.arbiscan.io
```

---

## 🎯 Why Arbitrum Sepolia?

**Benefits:**
- ✅ **Lower Fees** - Even cheaper than Base (typically < $0.001 per transaction)
- ✅ **Fast Finality** - Sub-second transaction confirmation
- ✅ **EVM Compatible** - Full Ethereum compatibility
- ✅ **Active Testnet** - Well-maintained with available faucets
- ✅ **Mature Ecosystem** - Large DeFi presence

**Perfect for:**
- Testing payment flows
- Mini app development
- Multi-chain deployment testing
- DeFi integrations

---

## 🚰 Getting Test Funds

### 1. Get Arbitrum Sepolia ETH

**Option A: Official Faucet**
- Visit: https://faucet.quicknode.com/arbitrum/sepolia
- Enter your wallet address
- Request ETH
- Wait 1-2 minutes

**Option B: Alchemy Faucet**
- Visit: https://www.alchemy.com/faucets/arbitrum-sepolia
- Sign in with Alchemy account
- Request ETH

**Option C: ChainLink Faucet**
- Visit: https://faucets.chain.link/arbitrum-sepolia
- Connect wallet
- Request test ETH

### 2. Get Test USDC

**Option A: Use Existing USDC.e**
- Contract: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`
- This is the bridged USDC on Arbitrum Sepolia
- You may need to bridge from Ethereum Sepolia or ask in Discord

**Option B: Deploy Your Own Test Token**
- Use the `contracts/tUSDC.sol` contract
- Deploy to Arbitrum Sepolia using Remix
- Mint tokens to your wallet
- Update `NEXT_PUBLIC_USDC_ADDRESS` with your contract

**Option C: Bridge from Ethereum Sepolia**
- Get Ethereum Sepolia ETH and USDC
- Use Arbitrum Bridge: https://bridge.arbitrum.io
- Bridge to Arbitrum Sepolia
- Wait for finalization (~15 minutes)

---

## 🔌 Add Network to MetaMask

### Manual Configuration:

1. Open MetaMask
2. Click network dropdown
3. Click "Add Network"
4. Enter these details:

```
Network Name: Arbitrum Sepolia
RPC URL: https://sepolia-rollup.arbitrum.io/rpc
Chain ID: 421614
Currency Symbol: ETH
Block Explorer: https://sepolia.arbiscan.io
```

5. Click "Save"
6. Switch to Arbitrum Sepolia

### Quick Add (MetaMask):

Visit: https://chainlist.org/chain/421614

Click "Add to MetaMask"

---

## 📱 Testing Your App

### Local Testing:

1. **Restart dev server** (changes require restart):
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Connect wallet**:
   - Open http://localhost:3000/accept
   - Click "Connect Wallet"
   - Make sure MetaMask is on **Arbitrum Sepolia**
   - If wrong network, MetaMask will prompt to switch

3. **Generate QR Code**:
   - Enter amount: `$10.00`
   - QR code generates
   - Verify "Arbitrum Sepolia" shown at bottom

4. **Test Payment**:
   - Scan QR with another wallet
   - Verify network is Arbitrum Sepolia
   - Verify token is USDC
   - Complete transaction
   - Check on https://sepolia.arbiscan.io

---

## 🌍 Environment Variables

### For Vercel Deployment:

```bash
# Required
NEXT_PUBLIC_CHAIN_ID=421614
NEXT_PUBLIC_USDC_ADDRESS=0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d
NEXT_PUBLIC_BLOCK_EXPLORER=https://sepolia.arbiscan.io
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourReserveWallet
JWT_SECRET=your-random-secret

# Optional
NEXT_PUBLIC_URL=https://your-app.vercel.app
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your-project-id
```

---

## 🔄 Switching Between Networks

Want to switch back to Base or try other networks?

### Base Sepolia:
```typescript
// src/lib/wagmi.ts
import { baseSepolia } from 'wagmi/chains';
chains: [baseSepolia]

// src/lib/constants.ts
CHAIN_ID: 84532
USDC: 0x036CbD53842c5426634e7929541eC2318f3dCF7e
Explorer: https://sepolia.basescan.org
```

### Ethereum Sepolia:
```typescript
// src/lib/wagmi.ts
import { sepolia } from 'wagmi/chains';
chains: [sepolia]

// src/lib/constants.ts
CHAIN_ID: 11155111
USDC: 0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238
Explorer: https://sepolia.etherscan.io
```

### Polygon Mumbai (deprecated, use Amoy):
```typescript
// src/lib/wagmi.ts
import { polygonAmoy } from 'wagmi/chains';
chains: [polygonAmoy]

// src/lib/constants.ts
CHAIN_ID: 80002
USDC: Deploy your own or find existing
Explorer: https://www.oklink.com/amoy
```

---

## 🎯 Production Deployment

### For Arbitrum Mainnet:

When ready for production:

```typescript
// src/lib/wagmi.ts
import { arbitrum } from 'wagmi/chains';
chains: [arbitrum]

// Environment variables
NEXT_PUBLIC_CHAIN_ID=42161
NEXT_PUBLIC_USDC_ADDRESS=0xaf88d065e77c8cC2239327C5EDb3A432268e5831
NEXT_PUBLIC_BLOCK_EXPLORER=https://arbiscan.io
```

**⚠️ Important**: Test thoroughly on Sepolia before mainnet!

---

## 📊 Comparison

| Network | Chain ID | USDC Address | Avg Tx Fee | Finality |
|---------|----------|--------------|------------|----------|
| **Arbitrum Sepolia** | 421614 | 0x75fa...AA4d | ~$0.001 | <1s |
| Base Sepolia | 84532 | 0x036C...CF7e | ~$0.01 | ~2s |
| Ethereum Sepolia | 11155111 | 0x1c7D...7238 | ~$0.50 | ~15s |

---

## 🐛 Troubleshooting

### "Wrong Network" Error

**Solution**: Switch MetaMask to Arbitrum Sepolia
- Click MetaMask
- Select "Arbitrum Sepolia" from dropdown
- Refresh page

### "Insufficient Funds" Error

**Solution**: Get test ETH from faucet
- Need ETH for gas fees
- Visit faucet: https://faucet.quicknode.com/arbitrum/sepolia
- Request test ETH

### "Invalid USDC Address" Error

**Solution**: Verify USDC contract address
- Check `.env.local` has: `0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d`
- Or deploy your own test token

### MetaMask Not Prompting to Switch

**Solution**: Add network manually first
- Follow "Add Network to MetaMask" section above
- Then try connecting again

---

## 📚 Resources

- **Arbitrum Docs**: https://docs.arbitrum.io
- **Arbitrum Sepolia Explorer**: https://sepolia.arbiscan.io
- **Arbitrum Bridge**: https://bridge.arbitrum.io
- **Faucets**: https://faucet.quicknode.com/arbitrum/sepolia
- **RPC Info**: https://chainlist.org/chain/421614

---

## ✅ Quick Checklist

Before deploying:

- [ ] MetaMask has Arbitrum Sepolia network added
- [ ] Wallet has Arbitrum Sepolia ETH (for gas)
- [ ] Wallet has test USDC (for testing payments)
- [ ] `.env.local` updated with Arbitrum Sepolia values
- [ ] Dev server restarted to pick up changes
- [ ] Tested wallet connection
- [ ] Tested QR code generation
- [ ] Verified network shows "Arbitrum Sepolia"

---

**🎉 Your Cast-POS is now running on Arbitrum Sepolia!**

Lower fees, faster transactions, ready for testing! 🚀

