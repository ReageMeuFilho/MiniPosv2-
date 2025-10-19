import type { Metadata } from 'next';
import './globals.css';
import { APP_NAME, APP_DESCRIPTION } from '@/lib/constants';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  manifest: '/manifest.json',
  themeColor: '#2563eb',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>
          <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header with wallet connection */}
            <Header />
            
            {/* Main content area */}
            <main className="flex-1 pb-20">
              {children}
            </main>
            
            {/* Bottom navigation */}
            <Navigation />
          </div>
        </Providers>
      </body>
    </html>
  );
}

