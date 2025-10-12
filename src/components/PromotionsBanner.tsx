import { useState, useEffect } from 'react';
import { loadPromotionsData } from '../lib/content-loader';
import { usePageContent } from '../hooks/useSettings';
import type { Promotion, PromotionsContent } from '../types';

export default function PromotionsBanner() {
  const [promotions, setPromotions] = useState<Promotion[]>([]);
  const { content: promotionsContent } = usePageContent<PromotionsContent>('promotions');

  useEffect(() => {
    const data = loadPromotionsData();
    setPromotions(data);
  }, []);

  // Only show if there are promotions
  if (!promotions || promotions.length === 0) {
    return null;
  }

  return (
    <section className="mt-16 mb-8">
      <h2 className="category-heading mb-8">{promotionsContent?.bannerTitle || "🎉 Акции"}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-6 border-2 border-accent shadow-lg"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{promo.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{promo.title}</h3>
                <p className="text-gray-600">{promo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
