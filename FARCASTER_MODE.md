# Farcaster Mini App Mode

## ✅ Updated: Wallet-Based Payment System

Cast-POS now works as a true Farcaster mini app where **each user's connected wallet becomes their merchant address**.

---

## 🔄 How It Works Now

### **1. Connect Wallet First**
- User opens the app in Farcaster (Warpcast/Base app)
- User connects their wallet (MetaMask, Coinbase Wallet, etc.)
- **This wallet = Their merchant address**

### **2. Accept Payments**
- Navigate to "Accept" tab
- Enter amount (e.g., $12.50)
- QR code generates for **YOUR connected wallet**
- Customers scan and pay **directly to YOUR wallet**

### **3. Manage Treasury**
- Same wallet automatically used in Treasury
- View your USDC balance
- Allocate surplus to reserve wallet

---

## 🎯 Key Benefits

✅ **No Hardcoded Addresses** - Each Farcaster user uses their own wallet  
✅ **True Decentralization** - No central merchant address  
✅ **Multi-User** - Different users can run their own POS  
✅ **Farcaster Native** - Works seamlessly with Farcaster auth  
✅ **Still Non-Custodial** - Payments go directly to user's wallet  

---

## 📱 User Flow

```
User opens mini app in Farcaster
            ↓
Connects wallet (e.g., 0xABC...123)
            ↓
Goes to Accept Payment
            ↓
Enters $25.00
            ↓
QR code generated for 0xABC...123 (their wallet!)
            ↓
Customer scans & pays
            ↓
Funds arrive in user's wallet (0xABC...123)
            ↓
User can manage treasury with same wallet
```

---

## 🔧 Technical Changes

### **Before (Hardcoded)**
```typescript
// Payment always went to env variable
const merchantAddress = MERCHANT_ADDRESS; // Fixed address
```

### **After (Dynamic)**
```typescript
// Payment goes to connected wallet
const { address: merchantAddress } = useAccount(); // User's wallet!
```

---

## 🚀 Deployment Changes

### **Environment Variables (Simplified)**

You NO LONGER need:
- ~~`NEXT_PUBLIC_MERCHANT_ADDRESS`~~ ❌

You STILL need:
- `NEXT_PUBLIC_USDC_ADDRESS` ✅ (USDC token contract)
- `NEXT_PUBLIC_RESERVE_ADDRESS` ✅ (Your reserve wallet)
- `NEXT_PUBLIC_CHAIN_ID` ✅ (84532 for Base Sepolia)
- `NEXT_PUBLIC_BLOCK_EXPLORER` ✅ (Block explorer URL)

### **Updated Vercel Setup**

When deploying to Vercel, you only need these environment variables:

```bash
NEXT_PUBLIC_USDC_ADDRESS=0x036CbD53842c5426634e7929541eC2318f3dCF7e
NEXT_PUBLIC_RESERVE_ADDRESS=0xYourReserveWallet
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_BLOCK_EXPLORER=https://sepolia.basescan.org
JWT_SECRET=any-random-string
```

**Note:** Each user's connected wallet automatically becomes their merchant address!

---

## 💡 Use Cases

### **1. Individual Merchants**
Each merchant in Farcaster runs their own POS:
- Alice connects her wallet → accepts payments to her wallet
- Bob connects his wallet → accepts payments to his wallet
- No central server or shared merchant address

### **2. Multiple Employees**
If your business has multiple employees:
- Employee 1 uses their wallet
- Employee 2 uses their wallet
- Both can accept payments independently
- All payments tracked by wallet address

### **3. Marketplace**
Farcaster users can:
- Install Cast-POS mini app
- Connect wallet
- Instantly accept crypto payments
- No signup, no KYC, no accounts

---

## ⚠️ Important Notes

### **Wallet Must Be Connected**
- Users MUST connect wallet before accepting payments
- If not connected, they see a "Connect Wallet" prompt
- This ensures payment address is always valid

### **Same Wallet for Treasury**
- Connected wallet is used for both:
  1. Receiving payments (Accept tab)
  2. Managing balance (Treasury tab)
- This keeps everything in one place

### **Reserve Wallet**
- Reserve wallet is still configured via environment variable
- This is YOUR backup/savings wallet
- Surplus from Treasury allocates here

---

## 🧪 Testing

### **Local Testing**

1. **Start dev server:**
   ```bash
   npm run dev
   ```

2. **Visit Accept page:**
   ```
   http://localhost:3000/accept
   ```

3. **You'll see:**
   - "Connect Your Wallet" prompt
   - Cannot generate QR until wallet connected

4. **Connect wallet:**
   - Click "Connect Wallet" in header
   - Choose MetaMask/Coinbase Wallet
   - Approve connection

5. **Generate QR:**
   - Enter amount: $10.00
   - QR code generates for YOUR wallet!
   - Address shown at bottom is YOUR wallet

6. **Test payment:**
   - Scan QR with another wallet
   - Verify recipient is YOUR wallet address
   - Complete payment

---

## 📊 Comparison

| Feature | Old (Hardcoded) | New (Farcaster Mode) |
|---------|----------------|----------------------|
| Merchant Address | Environment variable | Connected wallet |
| User Experience | Enter wallet address | Connect wallet |
| Multi-user | Single merchant | Each user has own |
| Deployment | Need merchant address | No address needed |
| Flexibility | Fixed | Dynamic |
| Farcaster Native | Partial | ✅ Full |

---

## 🎉 Summary

**Your Cast-POS is now a true Farcaster mini app!**

- ✅ Each user's wallet = merchant address
- ✅ No central configuration needed
- ✅ True peer-to-peer payments
- ✅ Perfect for Farcaster ecosystem

**Ready to deploy to Vercel with the new Farcaster-native mode!** 🚀

---

## 🔗 Next Steps

1. **Deploy to Vercel** - See `DEPLOY_NOW.md`
2. **Test with wallet** - Connect and generate QR
3. **Configure Farcaster** - Add manifest credentials
4. **Share in Warpcast** - Launch your mini app!

