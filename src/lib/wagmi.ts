import { http, createConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { coinbaseWallet, metaMask, walletConnect } from 'wagmi/connectors';

// Wagmi configuration for Base Sepolia
export const config = createConfig({
  chains: [baseSepolia],
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: 'Cast-POS',
      appLogoUrl: `${process.env.NEXT_PUBLIC_URL}/icon-192x192.png`,
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'cast-pos',
      metadata: {
        name: 'Cast-POS',
        description: 'Accept crypto payments as easily as cash',
        url: process.env.NEXT_PUBLIC_URL || 'http://localhost:3000',
        icons: [`${process.env.NEXT_PUBLIC_URL}/icon-192x192.png`],
      },
    }),
  ],
  transports: {
    [baseSepolia.id]: http(),
  },
});

