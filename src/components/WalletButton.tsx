'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { formatAddress } from '@/lib/utils';

export default function WalletButton() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <div className="px-3 py-2 bg-green-100 text-green-800 text-sm font-medium rounded-lg">
          {formatAddress(address)}
        </div>
        <button
          onClick={() => disconnect()}
          className="px-3 py-2 bg-red-100 text-red-800 text-sm font-medium rounded-lg hover:bg-red-200 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-primary-600 text-white text-sm font-semibold rounded-lg hover:bg-primary-700 transition-colors">
        Connect Wallet
      </button>
      
      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-2">
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => connect({ connector })}
              className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-3"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                {connector.name === 'MetaMask' && '🦊'}
                {connector.name === 'Coinbase Wallet' && '🔵'}
                {connector.name === 'WalletConnect' && '🔗'}
              </div>
              <span className="text-sm font-medium text-gray-900">
                {connector.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

