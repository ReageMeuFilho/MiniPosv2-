/**
 * Utility functions for Cast-POS
 */

/**
 * Generates a unique order ID
 * Format: POS-{timestamp}-{random}
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 7);
  return `POS-${timestamp}-${random}`;
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is successful
 */
export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
  } else {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } finally {
      document.body.removeChild(textArea);
    }
  }
}

/**
 * Formats a blockchain address for display
 * @param address - Full address
 * @param chars - Number of characters to show on each side
 * @returns Formatted address (e.g., "0x1234...5678")
 */
export function formatAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}

/**
 * Builds a block explorer URL for an address
 * @param address - Address to view
 * @param explorer - Block explorer base URL
 * @returns Full URL to explorer
 */
export function getExplorerAddressUrl(address: string, explorer: string): string {
  return `${explorer}/address/${address}`;
}

/**
 * Builds a block explorer URL for a transaction
 * @param txHash - Transaction hash
 * @param explorer - Block explorer base URL
 * @returns Full URL to explorer
 */
export function getExplorerTxUrl(txHash: string, explorer: string): string {
  return `${explorer}/tx/${txHash}`;
}

/**
 * Debounces a function call
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(later, wait);
  };
}

