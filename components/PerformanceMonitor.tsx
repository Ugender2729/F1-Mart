'use client';

import { useEffect } from 'react';

interface PerformanceMetrics {
  lcp: number | null;
  fid: number | null;
  cls: number;
  fcp: number | null;
  ttfb: number | null;
}

export const PerformanceMonitor = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    const metrics: PerformanceMetrics = {
      lcp: null,
      fid: null,
      cls: 0,
      fcp: null,
      ttfb: null
    };

    // Get TTFB (Time to First Byte)
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navigationEntry) {
      metrics.ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
    }

    // Get FCP (First Contentful Paint)
    const paintEntries = performance.getEntriesByType('paint');
    const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    if (fcpEntry) {
      metrics.fcp = fcpEntry.startTime;
    }

    // Monitor Largest Contentful Paint (LCP)
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      metrics.lcp = lastEntry.startTime;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('🚀 LCP (Largest Contentful Paint):', metrics.lcp, 'ms');
      }
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay (FID)
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const fidEntry = entry as any;
        metrics.fid = fidEntry.processingStart - fidEntry.startTime;
        
        if (process.env.NODE_ENV === 'development') {
          console.log('⚡ FID (First Input Delay):', metrics.fid, 'ms');
        }
      }
    });
    fidObserver.observe({ entryTypes: ['first-input'] });

    // Monitor Cumulative Layout Shift (CLS)
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          metrics.cls += (entry as any).value;
          
          if (process.env.NODE_ENV === 'development') {
            console.log('📐 CLS (Cumulative Layout Shift):', metrics.cls);
          }
        }
      }
    });
    clsObserver.observe({ entryTypes: ['layout-shift'] });

    // Log performance summary after 5 seconds
    const summaryTimeout = setTimeout(() => {
      if (process.env.NODE_ENV === 'development') {
        console.group('🎯 Performance Summary');
        console.log('TTFB (Time to First Byte):', metrics.ttfb ? `${metrics.ttfb.toFixed(2)}ms` : 'N/A');
        console.log('FCP (First Contentful Paint):', metrics.fcp ? `${metrics.fcp.toFixed(2)}ms` : 'N/A');
        console.log('LCP (Largest Contentful Paint):', metrics.lcp ? `${metrics.lcp.toFixed(2)}ms` : 'N/A');
        console.log('FID (First Input Delay):', metrics.fid ? `${metrics.fid.toFixed(2)}ms` : 'N/A');
        console.log('CLS (Cumulative Layout Shift):', metrics.cls.toFixed(4));
        
        // Performance scoring
        const scoreLCP = metrics.lcp && metrics.lcp < 2500 ? '🟢 Good' : metrics.lcp && metrics.lcp < 4000 ? '🟡 Needs Improvement' : '🔴 Poor';
        const scoreFID = metrics.fid && metrics.fid < 100 ? '🟢 Good' : metrics.fid && metrics.fid < 300 ? '🟡 Needs Improvement' : '🔴 Poor';
        const scoreCLS = metrics.cls < 0.1 ? '🟢 Good' : metrics.cls < 0.25 ? '🟡 Needs Improvement' : '🔴 Poor';
        
        console.log('Performance Scores:');
        console.log('LCP:', scoreLCP);
        console.log('FID:', scoreFID);
        console.log('CLS:', scoreCLS);
        console.groupEnd();
      }
    }, 5000);

    return () => {
      lcpObserver.disconnect();
      fidObserver.disconnect();
      clsObserver.disconnect();
      clearTimeout(summaryTimeout);
    };
  }, []);

  return null;
};
