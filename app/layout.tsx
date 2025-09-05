import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FreshMarket - Fresh Groceries Delivered',
  description: 'Get farm-fresh groceries delivered to your doorstep. Quality ingredients, competitive prices, fast delivery.',
  keywords: 'grocery, fresh food, delivery, organic, vegetables, fruits, meat, dairy',
  authors: [{ name: 'FreshMarket Team' }],
  openGraph: {
    title: 'FreshMarket - Fresh Groceries Delivered',
    description: 'Get farm-fresh groceries delivered to your doorstep',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <CartProvider>
            <WishlistProvider>
              <div className="flex flex-col min-h-screen">
                <Header />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}