import { useState, useEffect } from 'react';
import { loadPromotionsData } from '../lib/content-loader';
import type { UsePromotionsReturn } from '../types';

export function usePromotions(): UsePromotionsReturn {
  const [promotions, setPromotions] = useState<typeof loadPromotionsData extends () => infer R ? R : never>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPromotions() {
      try {
        const data = loadPromotionsData();
        setPromotions(data);
      } catch (error) {
        console.warn('Error loading promotions:', error);
        setPromotions([]);
      } finally {
        setLoading(false);
      }
    }

    loadPromotions();
  }, []);

  return { 
    promotions, 
    loading, 
    hasPromotions: promotions.length > 0 
  };
}