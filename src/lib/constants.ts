import { Address } from 'viem';

// Network Configuration
export const CHAIN_ID = parseInt(process.env.NEXT_PUBLIC_CHAIN_ID || '421614');
export const BLOCK_EXPLORER = process.env.NEXT_PUBLIC_BLOCK_EXPLORER || 'https://sepolia.arbiscan.io';

// Contract Addresses
export const USDC_ADDRESS = (process.env.NEXT_PUBLIC_USDC_ADDRESS || '0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d') as Address;
export const MERCHANT_ADDRESS = (process.env.NEXT_PUBLIC_MERCHANT_ADDRESS || '') as Address;
export const RESERVE_ADDRESS = (process.env.NEXT_PUBLIC_RESERVE_ADDRESS || '') as Address;

// App Configuration
export const APP_NAME = 'Cast-POS';
export const APP_DESCRIPTION = 'Accept crypto payments as easily as cash';
export const APP_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

// ERC-20 ABI for USDC operations
export const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: '_owner', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: 'balance', type: 'uint256' }],
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { name: '_to', type: 'address' },
      { name: '_value', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', type: 'bool' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', type: 'string' }],
    type: 'function',
  },
] as const;

