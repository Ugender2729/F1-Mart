import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { CartProvider } from '@/context/CartContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';

export const metadata: Metadata = {
  title: 'F1 Mart - Fresh and Fast Delivery',
  description: 'Get farm-fresh groceries delivered to your doorstep. Quality ingredients, competitive prices, fresh and fast delivery.',
  keywords: 'grocery, fresh food, delivery, organic, vegetables, fruits, meat, dairy, F1 Mart',
  authors: [{ name: 'F1 Mart Team' }],
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://f1mart.com'),
  openGraph: {
    title: 'F1 Mart - Fresh and Fast Delivery',
    description: 'Get farm-fresh groceries delivered to your doorstep with fresh and fast delivery',
    type: 'website',
    locale: 'en_US',
    siteName: 'F1 Mart',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'F1 Mart - Fresh and Fast Delivery',
    description: 'Get farm-fresh groceries delivered to your doorstep',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <ThemeProvider>
          <AuthProvider>
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
                <PerformanceMonitor />
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}