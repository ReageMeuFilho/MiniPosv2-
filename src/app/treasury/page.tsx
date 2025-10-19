'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';
import {
  USDC_ADDRESS,
  RESERVE_ADDRESS,
  ERC20_ABI,
  BLOCK_EXPLORER,
} from '@/lib/constants';
import { getExplorerAddressUrl, getExplorerTxUrl } from '@/lib/utils';

export default function Treasury() {
  const { address, isConnected } = useAccount();
  const [operatingTarget, setOperatingTarget] = useState('1000');
  const [surplus, setSurplus] = useState(BigInt(0));
  const [isAllocating, setIsAllocating] = useState(false);

  // Read USDC balance
  const { data: balance, refetch: refetchBalance } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  // Write contract for allocation
  const { 
    data: hash, 
    writeContract,
    isPending: isWritePending,
    error: writeError 
  } = useWriteContract();

  // Wait for transaction receipt
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Calculate surplus when balance or target changes
  useEffect(() => {
    if (balance && operatingTarget) {
      try {
        const targetInUnits = parseUnits(operatingTarget, 6);
        const currentBalance = BigInt(balance.toString());
        const calculatedSurplus = currentBalance > targetInUnits 
          ? currentBalance - targetInUnits 
          : BigInt(0);
        setSurplus(calculatedSurplus);
      } catch (error) {
        console.error('Error calculating surplus:', error);
        setSurplus(BigInt(0));
      }
    } else {
      setSurplus(BigInt(0));
    }
  }, [balance, operatingTarget]);

  // Handle allocation to reserve
  const handleAllocate = async () => {
    if (!surplus || surplus <= BigInt(0) || !RESERVE_ADDRESS) {
      return;
    }

    try {
      setIsAllocating(true);
      writeContract({
        address: USDC_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [RESERVE_ADDRESS, surplus],
      });
    } catch (error) {
      console.error('Error allocating funds:', error);
      setIsAllocating(false);
    }
  };

  // Handle transaction confirmation
  useEffect(() => {
    if (isConfirmed) {
      setIsAllocating(false);
      refetchBalance();
    }
  }, [isConfirmed, refetchBalance]);

  const handleTargetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setOperatingTarget(value);
    }
  };

  const balanceFormatted = balance 
    ? parseFloat(formatUnits(BigInt(balance.toString()), 6)).toFixed(2)
    : '0.00';
  
  const surplusFormatted = parseFloat(formatUnits(surplus, 6)).toFixed(2);
  const hasSurplus = surplus > BigInt(0);

  const explorerUrl = address
    ? getExplorerAddressUrl(address, BLOCK_EXPLORER)
    : '';

  const txUrl = hash
    ? getExplorerTxUrl(hash, BLOCK_EXPLORER)
    : '';

  // Not connected state
  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Treasury</h1>
          <p className="text-gray-600">
            Manage your USDC balance and allocate surplus funds
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-4">
              <svg
                className="w-10 h-10 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Connect Your Wallet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect your wallet to view your balance and manage treasury
            </p>
            <p className="text-sm text-gray-500">
              Click "Connect Wallet" in the header to get started
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Treasury</h1>
        <p className="text-gray-600">
          Manage your USDC balance and allocate surplus funds
        </p>
      </div>

      {/* Success Message */}
      {isConfirmed && hash && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg fade-in">
          <div className="flex items-center mb-2">
            <svg
              className="w-6 h-6 text-green-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-green-800">Allocation Successful!</p>
              <p className="text-sm text-green-700">
                ${surplusFormatted} transferred to reserve wallet
              </p>
            </div>
          </div>
          {txUrl && (
            <a
              href={txUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-green-700 hover:text-green-900 underline"
            >
              View transaction on explorer →
            </a>
          )}
        </div>
      )}

      {/* Error Message */}
      {writeError && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 rounded-lg">
          <div className="flex items-center">
            <svg
              className="w-6 h-6 text-red-600 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="font-semibold text-red-800">Transaction Failed</p>
              <p className="text-sm text-red-700">
                {writeError.message || 'Please try again'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        {/* Current Balance */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current USDC Balance
          </label>
          <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900">
                ${balanceFormatted}
              </span>
              <button
                onClick={() => refetchBalance()}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {/* Operating Target */}
        <div className="mb-6">
          <label
            htmlFor="target"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Operating Target (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">$</span>
            </div>
            <input
              id="target"
              type="text"
              inputMode="decimal"
              placeholder="1000.00"
              value={operatingTarget}
              onChange={handleTargetChange}
              className="block w-full pl-8 pr-4 py-3 text-lg font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Set your target balance to calculate surplus funds
          </p>
        </div>

        {/* Surplus Calculation */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Surplus Available
          </label>
          <div className={`p-4 rounded-lg border ${
            hasSurplus 
              ? 'bg-green-50 border-green-200' 
              : 'bg-gray-50 border-gray-200'
          }`}>
            <span className={`text-3xl font-bold ${
              hasSurplus ? 'text-green-700' : 'text-gray-500'
            }`}>
              ${surplusFormatted}
            </span>
            {hasSurplus && (
              <p className="mt-1 text-sm text-green-700">
                Ready to allocate to reserve wallet
              </p>
            )}
            {!hasSurplus && parseFloat(balanceFormatted) > 0 && (
              <p className="mt-1 text-sm text-gray-600">
                Increase your balance or lower target to create surplus
              </p>
            )}
          </div>
        </div>

        {/* Allocation Button */}
        <button
          onClick={handleAllocate}
          disabled={!hasSurplus || isAllocating || isWritePending || isConfirming || !RESERVE_ADDRESS}
          className={`w-full py-4 rounded-lg font-semibold transition-all ${
            hasSurplus && !isAllocating && !isWritePending && !isConfirming && RESERVE_ADDRESS
              ? 'btn-primary'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {isWritePending || isConfirming ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {isConfirming ? 'Confirming...' : 'Allocating...'}
            </span>
          ) : (
            `Allocate $${surplusFormatted} to Reserve`
          )}
        </button>

        {!RESERVE_ADDRESS && (
          <p className="mt-2 text-sm text-red-600 text-center">
            Reserve address not configured. Please set NEXT_PUBLIC_RESERVE_ADDRESS in environment variables.
          </p>
        )}
      </div>

      {/* Reserve Address Info */}
      {RESERVE_ADDRESS && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-purple-900 mb-1">
                Reserve Wallet Address
              </p>
              <p className="text-xs font-mono text-purple-700 break-all mb-2">
                {RESERVE_ADDRESS}
              </p>
              <a
                href={getExplorerAddressUrl(RESERVE_ADDRESS, BLOCK_EXPLORER)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-600 hover:text-purple-800 underline"
              >
                View on block explorer →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Wallet Info */}
      {address && explorerUrl && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-900 mb-1">
                Connected Wallet
              </p>
              <p className="text-xs font-mono text-blue-700 break-all mb-2">
                {address}
              </p>
              <a
                href={explorerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-800 underline"
              >
                View on block explorer →
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

