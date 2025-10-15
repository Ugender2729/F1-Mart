import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import AppProviders from '@/components/providers/AppProviders';

// Lazy load heavy components
const Header = dynamic(() => import('@/components/layout/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-white dark:bg-gray-900 animate-pulse" />
});

const Footer = dynamic(() => import('@/components/layout/Footer'), {
  ssr: true,
  loading: () => <div className="h-32 bg-gray-100 dark:bg-gray-800 animate-pulse" />
});

const Toaster = dynamic(() => import('@/components/ui/sonner').then(mod => ({ default: mod.Toaster })), {
  ssr: false
});

// Temporarily disabled for performance optimization
// const PerformanceMonitor = dynamic(() => import('@/components/PerformanceMonitor'), {
//   ssr: false
// });

const WhatsAppButton = dynamic(() => import('@/components/WhatsAppButton'), {
  ssr: false
});

const ErrorBoundary = dynamic(() => import('@/components/ErrorBoundary'), {
  ssr: false
});

const NavigationLoader = dynamic(() => import('@/components/NavigationLoader'), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'F1 Mart - Fresh and Fast Delivery',
  description: 'Get farm-fresh groceries delivered to your doorstep. Quality ingredients, competitive prices, fresh and fast delivery.',
  keywords: 'grocery, fresh food, delivery, organic, vegetables, fruits, meat, dairy, F1 Mart',
  authors: [{ name: 'F1 Mart Team' }],
  metadataBase: new URL('https://f1mart.com'),
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
        <ErrorBoundary>
          <AppProviders>
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
            <Toaster />
            {/* <PerformanceMonitor /> */}
            <WhatsAppButton />
            <NavigationLoader />
          </AppProviders>
        </ErrorBoundary>
      </body>
    </html>
  );
}