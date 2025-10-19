import { parseUnits, formatUnits, Address } from 'viem';

/**
 * Builds an EIP-681 URI for ERC-20 token transfers
 * Format: ethereum:<token>/transfer?address=<to>&uint256=<amount>&chain_id=<chainId>
 * 
 * @param amount - Amount in token's smallest unit (e.g., 1000000 for 1 USDC with 6 decimals)
 * @param chainId - Chain ID (84532 for Base Sepolia)
 * @param tokenAddress - ERC-20 token contract address
 * @param recipientAddress - Recipient wallet address
 * @returns EIP-681 formatted URI string
 */
export function buildEip681Erc20(
  amount: bigint,
  chainId: number,
  tokenAddress: Address,
  recipientAddress: Address
): string {
  // EIP-681 format for ERC-20 transfers
  return `ethereum:${tokenAddress}/transfer?address=${recipientAddress}&uint256=${amount}&chainId=${chainId}`;
}

/**
 * Parses USD amount to USDC token units (6 decimals)
 * @param usdAmount - USD amount as string (e.g., "12.50")
 * @returns Amount in USDC smallest units (e.g., 12500000)
 */
export function parseUsdcAmount(usdAmount: string): bigint {
  try {
    return parseUnits(usdAmount, 6);
  } catch (error) {
    console.error('Error parsing USDC amount:', error);
    return BigInt(0);
  }
}

/**
 * Formats USDC token units to USD string
 * @param amount - Amount in USDC smallest units
 * @returns Formatted USD string (e.g., "12.50")
 */
export function formatUsdcAmount(amount: bigint): string {
  return formatUnits(amount, 6);
}

/**
 * Validates USD amount input
 * @param value - Input value to validate
 * @returns true if valid USD amount
 */
export function isValidUsdAmount(value: string): boolean {
  if (!value) return false;
  const regex = /^\d+\.?\d{0,2}$/;
  return regex.test(value) && parseFloat(value) > 0;
}

