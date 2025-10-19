'use client';

import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { QRCodeSVG } from 'qrcode.react';
import { buildEip681Erc20, parseUsdcAmount, isValidUsdAmount } from '@/lib/eip681';
import { generateOrderId, copyToClipboard, getExplorerAddressUrl } from '@/lib/utils';
import {
  USDC_ADDRESS,
  CHAIN_ID,
  BLOCK_EXPLORER,
} from '@/lib/constants';

export default function AcceptPayment() {
  const { address: merchantAddress, isConnected } = useAccount();
  const [amount, setAmount] = useState('');
  const [orderId, setOrderId] = useState('');
  const [paymentUri, setPaymentUri] = useState('');
  const [isPaid, setIsPaid] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  // Generate new order ID on mount
  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  // Update payment URI when amount or connected wallet changes
  useEffect(() => {
    if (amount && isValidUsdAmount(amount) && merchantAddress) {
      const amountInUnits = parseUsdcAmount(amount);
      const uri = buildEip681Erc20(
        amountInUnits,
        CHAIN_ID,
        USDC_ADDRESS,
        merchantAddress
      );
      setPaymentUri(uri);
      setError('');
    } else if (amount && !merchantAddress) {
      setError('Please connect your wallet first');
      setPaymentUri('');
    } else if (amount) {
      setError('Please enter a valid amount');
      setPaymentUri('');
    } else {
      setPaymentUri('');
      setError('');
    }
  }, [amount, merchantAddress]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers and one decimal point
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
      setIsPaid(false);
    }
  };

  const handleCopyLink = async () => {
    if (paymentUri) {
      try {
        await copyToClipboard(paymentUri);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleMarkAsPaid = () => {
    setIsPaid(true);
    // Reset after 3 seconds
    setTimeout(() => {
      setAmount('');
      setOrderId(generateOrderId());
      setIsPaid(false);
    }, 3000);
  };

  const handleNewPayment = () => {
    setAmount('');
    setOrderId(generateOrderId());
    setIsPaid(false);
    setError('');
  };

  const isValidAmount = amount && isValidUsdAmount(amount);
  const explorerUrl = merchantAddress
    ? getExplorerAddressUrl(merchantAddress, BLOCK_EXPLORER)
    : '';

  // Not connected state
  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Accept Payment</h1>
          <p className="text-gray-600">
            Connect your wallet to start accepting payments
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
              Your connected wallet will receive customer payments
            </p>
            <p className="text-sm text-gray-500">
              Click "Connect Wallet" in the header to get started
            </p>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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
            <div>
              <p className="text-sm font-medium text-blue-900 mb-1">
                Farcaster Mini App Mode
              </p>
              <p className="text-sm text-blue-700">
                Each user's connected wallet becomes their merchant address. Payments go directly to your wallet - no intermediaries.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accept Payment</h1>
        <p className="text-gray-600">
          Enter amount to generate a payment QR code
        </p>
      </div>

      {/* Payment Success Message */}
      {isPaid && (
        <div className="mb-6 p-4 bg-green-100 border border-green-400 rounded-lg fade-in">
          <div className="flex items-center">
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
              <p className="font-semibold text-green-800">Payment Marked as Paid!</p>
              <p className="text-sm text-green-700">
                Resetting for next transaction...
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        {/* Order ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Order ID
          </label>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-mono text-gray-600">{orderId}</span>
            <button
              onClick={handleNewPayment}
              className="text-xs text-primary-600 hover:text-primary-700 font-medium"
            >
              New
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount (USD)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <span className="text-gray-500 text-lg">$</span>
            </div>
            <input
              id="amount"
              type="text"
              inputMode="decimal"
              placeholder="0.00"
              value={amount}
              onChange={handleAmountChange}
              disabled={isPaid}
              className="block w-full pl-8 pr-4 py-4 text-2xl font-semibold border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-600">{error}</p>
          )}
        </div>

        {/* QR Code Display */}
        {isValidAmount && paymentUri && !isPaid && (
          <div className="mb-6 fade-in">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payment QR Code
            </label>
            <div className="flex justify-center p-6 bg-white border-2 border-gray-200 rounded-lg">
              <QRCodeSVG
                value={paymentUri}
                size={256}
                level="H"
                includeMargin={true}
              />
            </div>
            <p className="mt-3 text-center text-sm text-gray-600">
              Customer scans this QR code with their wallet app
            </p>
          </div>
        )}

        {/* Payment URI Display */}
        {isValidAmount && paymentUri && !isPaid && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payment Link
            </label>
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-xs font-mono text-gray-600 break-all">
                {paymentUri}
              </p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {isValidAmount && !isPaid && (
          <div className="space-y-3">
            <button
              onClick={handleCopyLink}
              className="w-full btn-outline flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              {copied ? 'Copied!' : 'Copy Payment Link'}
            </button>

            <button
              onClick={handleMarkAsPaid}
              className="w-full btn-primary"
            >
              Mark as Paid
            </button>
          </div>
        )}

        {/* Placeholder when no amount */}
        {!amount && (
          <div className="text-center py-12">
            <svg
              className="w-16 h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
              />
            </svg>
            <p className="text-gray-500">Enter an amount to generate QR code</p>
          </div>
        )}
      </div>

      {/* Merchant Info */}
      {merchantAddress && (
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
                Your Receiving Address (Connected Wallet)
              </p>
              <p className="text-xs font-mono text-blue-700 break-all mb-2">
                {merchantAddress}
              </p>
              {explorerUrl && (
                <a
                  href={explorerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 underline"
                >
                  View balance on block explorer →
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Network Info */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500">
          Payments processed on{' '}
          <span className="font-semibold">Base Sepolia</span> (Chain ID: {CHAIN_ID})
        </p>
      </div>
    </div>
  );
}

