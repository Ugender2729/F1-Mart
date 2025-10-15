'use client';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useNavigate = () => {
  const router = useRouter();

  const navigate = useCallback((path: string, options?: { replace?: boolean }) => {
    // Dispatch navigation start event
    window.dispatchEvent(new Event('navigationStart'));

    // Use setTimeout to ensure the loading state is visible
    setTimeout(() => {
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
      
      // Dispatch navigation complete event after a brief delay
      setTimeout(() => {
        window.dispatchEvent(new Event('navigationComplete'));
      }, 300);
    }, 100);
  }, [router]);

  return { navigate, router };
};

