# Cast-POS Testing Guide

This guide provides detailed instructions for testing Cast-POS functionality.

## Test Environment Setup

### Prerequisites

1. **Node.js 18+** installed
2. **Two Ethereum wallets** for testing:
   - Merchant wallet (receives payments)
   - Reserve wallet (receives surplus allocations)
3. **Base Sepolia test assets**:
   - ETH for gas fees
   - USDC for testing payments and allocations

### Getting Test Assets

#### Base Sepolia ETH

1. Visit Base Sepolia faucet: https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet
2. Enter your wallet address
3. Request test ETH
4. Wait for transaction to confirm

#### Base Sepolia USDC

**Option 1: Use existing test USDC**
- Contract: `0x036CbD53842c5426634e7929541eC2318f3dCF7e`
- Find someone with test USDC to send you some

**Option 2: Deploy test USDC contract**

1. Go to [Remix IDE](https://remix.ethereum.org)
2. Create new file: `tUSDC.sol`
3. Copy contents from `contracts/tUSDC.sol`
4. Compile with Solidity 0.8.21+
5. Deploy to Base Sepolia using MetaMask
6. Call `mint(yourAddress, 10000000000)` to mint 10,000 USDC
7. Copy deployed contract address
8. Update `.env.local` with your contract address

## Local Testing

### 1. Setup

```bash
# Clone repository
git clone <your-repo-url>
cd cast-pos

# Install dependencies
npm install --legacy-peer-deps

# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
# Required:
# - NEXT_PUBLIC_MERCHANT_ADDRESS (your test wallet)
# - NEXT_PUBLIC_RESERVE_ADDRESS (another test wallet)
# - NEXT_PUBLIC_USDC_ADDRESS (USDC contract)
```

### 2. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Feature Testing

### Test 1: Accept Payment (No Wallet Required)

**Objective**: Verify QR code generation and payment URI creation

**Steps**:
1. Navigate to `/accept` page
2. Enter amount: `12.50`
3. Verify:
   - QR code appears
   - Payment link displays below QR
   - Order ID is shown
   - Copy link button works

**Expected Results**:
- ✅ QR code updates immediately when amount changes
- ✅ Payment URI format: `ethereum:0x<USDC>/transfer?address=0x<MERCHANT>&uint256=12500000&chainId=84532`
- ✅ Order ID format: `POS-<timestamp>-<random>`
- ✅ Copy button copies URI to clipboard

**Test Cases**:
```
Amount Input    Expected USDC Units    Notes
-----------     -------------------    -----
1               1000000                1 USDC
12.50           12500000               12.50 USDC
0.01            10000                  Minimum amount
999999          999999000000           Large amount
abc             Error                  Invalid input
-5              Error                  Negative not allowed
```

### Test 2: QR Code Scanning

**Objective**: Verify QR codes work with real wallets

**Required**: Mobile phone with MetaMask or Coinbase Wallet

**Steps**:
1. Generate QR code for $10.00
2. Open MetaMask mobile app
3. Tap scan icon
4. Scan the QR code
5. Verify transaction pre-fills

**Expected Results**:
- ✅ Wallet recognizes QR as payment request
- ✅ Recipient matches merchant address
- ✅ Amount shows 10.00 USDC
- ✅ Token shows USDC
- ✅ Network shows Base Sepolia
- ✅ Can confirm transaction

**Alternative Wallets to Test**:
- MetaMask Mobile ✅
- Coinbase Wallet ✅
- Rainbow Wallet ✅
- Trust Wallet (may not support EIP-681)

### Test 3: Mark as Paid

**Objective**: Verify payment confirmation flow

**Steps**:
1. Enter amount: `25.00`
2. Click "Mark as Paid"
3. Observe behavior

**Expected Results**:
- ✅ Success message appears
- ✅ Form resets after 3 seconds
- ✅ New order ID generated
- ✅ Amount cleared

### Test 4: Wallet Connection

**Objective**: Verify wallet connection works

**Required**: Browser with MetaMask extension

**Steps**:
1. Navigate to `/treasury`
2. Click "Connect Wallet" in header
3. Hover to see connector options
4. Click "MetaMask"
5. Approve connection in MetaMask
6. Switch to Base Sepolia if prompted

**Expected Results**:
- ✅ Dropdown shows available connectors
- ✅ MetaMask connects successfully
- ✅ Address displays in header
- ✅ Network switches to Base Sepolia
- ✅ Disconnect button appears

**Test Connectors**:
- ✅ MetaMask
- ✅ Coinbase Wallet
- ✅ WalletConnect

### Test 5: Balance Reading

**Objective**: Verify USDC balance reads correctly

**Required**: Connected wallet with USDC balance

**Steps**:
1. Connect wallet (with USDC balance)
2. Navigate to `/treasury`
3. Observe balance display
4. Click "Refresh" button

**Expected Results**:
- ✅ Balance shows correct USDC amount
- ✅ Format: `$XX.XX` with 2 decimals
- ✅ Refresh updates balance
- ✅ Explorer link works

**Balance Test Cases**:
```
Wallet USDC     Displayed As
-----------     ------------
0               $0.00
1000000         $1.00
12500000        $12.50
1000000000      $1,000.00
```

### Test 6: Surplus Calculation

**Objective**: Verify surplus calculation logic

**Required**: Connected wallet with USDC

**Steps**:
1. Connect wallet with 100 USDC
2. Set operating target to `50`
3. Observe surplus calculation
4. Change target to `150`
5. Observe surplus updates

**Expected Results**:
- ✅ Surplus = Balance - Target
- ✅ Surplus shows $50.00 (when balance=100, target=50)
- ✅ Surplus shows $0.00 (when balance=100, target=150)
- ✅ Allocate button enabled only when surplus > 0
- ✅ Real-time updates as target changes

**Calculation Test Cases**:
```
Balance    Target    Expected Surplus    Button State
-------    ------    ----------------    ------------
100        50        $50.00              Enabled
100        100       $0.00               Disabled
100        150       $0.00               Disabled
0          50        $0.00               Disabled
1000       500       $500.00             Enabled
```

### Test 7: Surplus Allocation

**Objective**: Verify funds transfer to reserve wallet

**Required**: 
- Merchant wallet with >10 USDC
- Reserve wallet address configured
- ETH for gas

**Steps**:
1. Connect merchant wallet
2. Set target to create surplus (e.g., if balance=100, set target=50)
3. Verify surplus shows $50.00
4. Click "Allocate to Reserve"
5. Approve transaction in wallet
6. Wait for confirmation

**Expected Results**:
- ✅ Transaction submitted successfully
- ✅ Loading state shows "Allocating..."
- ✅ Success message appears when confirmed
- ✅ Balance decreases by surplus amount
- ✅ Surplus recalculates to $0.00
- ✅ Transaction link works
- ✅ Reserve wallet receives USDC

**Verification**:
```bash
# Check reserve wallet on explorer
https://sepolia.basescan.org/address/<RESERVE_ADDRESS>

# Verify USDC transfer event
# From: Merchant Address
# To: Reserve Address
# Amount: Surplus
```

### Test 8: Error Handling

**Objective**: Verify app handles errors gracefully

**Test Cases**:

**8.1: Insufficient Gas**
1. Connect wallet with 0 ETH but has USDC
2. Try to allocate surplus
3. Expected: Transaction fails with gas error

**8.2: Insufficient USDC**
1. Set very high operating target
2. Expected: Surplus = $0.00, button disabled

**8.3: Network Switch**
1. Connect wallet on Ethereum mainnet
2. Navigate to Treasury
3. Expected: Prompt to switch to Base Sepolia

**8.4: Wallet Rejection**
1. Try to allocate
2. Reject in wallet
3. Expected: Error message, can retry

**8.5: Invalid Amount Input**
1. Enter `abc` in amount field
2. Expected: Validation error, QR not generated

### Test 9: Responsive Design

**Objective**: Verify mobile responsiveness

**Devices to Test**:
- iPhone (Safari)
- Android (Chrome)
- Tablet (iPad)
- Desktop (1920x1080)
- Desktop (1366x768)

**Test Cases**:
1. Navigation bar visible and functional
2. QR code renders at appropriate size
3. Forms are usable with touch
4. Buttons are touch-friendly (min 44px)
5. Text is readable without zooming
6. No horizontal scroll

### Test 10: Browser Compatibility

**Browsers to Test**:
- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

**Features to Verify**:
- QR code generation
- Wallet connection
- Copy to clipboard
- Navigation
- Form inputs

### Test 11: Farcaster Integration

**Objective**: Verify app works in Farcaster clients

**Required**: Deployed app with Farcaster manifest

**Steps**:
1. Deploy app to Vercel
2. Configure Farcaster manifest
3. Open in Warpcast mobile app
4. Test all features within Farcaster

**Expected Results**:
- ✅ App loads in Warpcast
- ✅ Accept payment works
- ✅ Wallet connection works
- ✅ Treasury allocation works
- ✅ Navigation works

## Performance Testing

### Page Load Speed

**Target**: < 2 seconds on 4G connection

**Test**:
```bash
# Use Lighthouse
npm run build
npm start
# Open DevTools > Lighthouse > Run audit
```

**Metrics**:
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.0s
- Cumulative Layout Shift: < 0.1

### Transaction Speed

**Test**: Time from "Allocate" click to confirmation

**Expected**:
- Transaction submission: < 2s
- Base Sepolia confirmation: ~2-5s
- UI update: immediate after confirmation

## Security Testing

### Test 1: Private Key Security

**Verify**:
- ✅ No private keys in code
- ✅ No private keys in environment variables
- ✅ `.env.local` in `.gitignore`
- ✅ Wallet connection uses standard libraries

### Test 2: Address Validation

**Test**:
1. Set invalid merchant address in `.env`
2. Try to generate QR code
3. Expected: Should handle gracefully or show error

### Test 3: Amount Validation

**Test**:
1. Try negative amounts
2. Try extremely large amounts
3. Try non-numeric input
4. Expected: Validation prevents invalid values

## Automated Testing (Future)

### Unit Tests

```bash
# Run unit tests (when implemented)
npm test
```

**Test Coverage**:
- EIP-681 URI generation
- Amount parsing/formatting
- Surplus calculation
- Utility functions

### Integration Tests

```bash
# Run integration tests (when implemented)
npm run test:integration
```

**Test Scenarios**:
- Accept payment flow
- Treasury allocation flow
- Wallet connection flow

### E2E Tests

```bash
# Run E2E tests (when implemented)
npm run test:e2e
```

**Test Frameworks**:
- Jest (unit)
- Playwright (integration/E2E)
- React Testing Library (components)

## Test Checklist

Use this checklist for each release:

### Phase 1: Accept Payment
- [ ] QR code generates correctly
- [ ] Payment URI format valid
- [ ] Amount parsing works
- [ ] Copy to clipboard works
- [ ] Mark as paid works
- [ ] Mobile responsive
- [ ] Cross-browser compatible
- [ ] Scans with MetaMask mobile
- [ ] Scans with Coinbase Wallet mobile

### Phase 2: Treasury Management
- [ ] Wallet connects (MetaMask)
- [ ] Wallet connects (Coinbase Wallet)
- [ ] Balance reads correctly
- [ ] Surplus calculates correctly
- [ ] Allocation transaction works
- [ ] Transaction confirms on-chain
- [ ] Reserve receives funds
- [ ] Error handling works
- [ ] Network switching works

### Phase 3: Farcaster Integration
- [ ] Manifest endpoint works
- [ ] Account association valid
- [ ] App loads in Warpcast
- [ ] All features work in Farcaster
- [ ] SIWE authentication works

### General
- [ ] No console errors
- [ ] No linter errors
- [ ] Performance acceptable (< 2s load)
- [ ] Security review passed
- [ ] Documentation updated
- [ ] Environment variables documented

## Reporting Issues

When reporting issues, include:

1. **Environment**:
   - OS and version
   - Browser and version
   - Wallet and version
   - Network (Base Sepolia/Mainnet)

2. **Steps to Reproduce**:
   - Detailed step-by-step instructions
   - What you expected to happen
   - What actually happened

3. **Screenshots/Videos**:
   - Console errors
   - Transaction hashes
   - Visual bugs

4. **Additional Context**:
   - Wallet balance at time of error
   - Gas price
   - Network congestion

## Support

For testing assistance:
- GitHub Issues: https://github.com/yourusername/cast-pos/issues
- Email: wesley.f.rios@gmail.com

---

Happy Testing! 🧪

