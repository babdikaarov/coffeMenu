import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadMenuData } from "../lib/content-loader";
import { useUIMessages, usePageContent, useGeneralSettings } from "../hooks/useSettings";
import type { MenuItem, ProductDetailContent } from "../types";

function ProductDetail() {
  const { item: itemParam } = useParams();
  const location = useLocation();
  const [item, setItem] = useState<MenuItem | null>(location.state?.item || null);
  const { messages: uiMessages } = useUIMessages();
  const { content: productDetailContent } = usePageContent<ProductDetailContent>('productDetail');
  const { settings: generalSettings } = useGeneralSettings();

  useEffect(() => {
    // If item is not passed via state, search for it in menu data
    if (!item) {
      const menuData = loadMenuData();
      
      // Search dynamically across all categories
      let foundItem: MenuItem | null = null;
      
      Object.values(menuData).forEach(categoryItems => {
        if (!foundItem) {
          const matchingItem = categoryItems.find(
            (i) => i.name === decodeURIComponent(itemParam || '')
          );
          if (matchingItem) {
            foundItem = matchingItem;
          }
        }
      });

      if (foundItem) {
        setItem(foundItem);
      }
    }
  }, [itemParam, item]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{uiMessages?.notFound || "Товар не найден"}</h2>
          <Link to="/menu" className="text-primary hover:underline">
            {uiMessages?.backToMenu || "← Назад к меню"}
          </Link>
        </div>
      </div>
    );
  }

  // Get category display info from CMS or use category key as fallback
  const getCategoryDisplay = (categoryKey: string) => {
    const categoryLabel = productDetailContent?.categoryLabels?.[categoryKey] || categoryKey;
    // Default emoji mapping, should come from CMS in future
    const defaultEmojis: Record<string, string> = {
      coffee: "☕",
      tea: "🍵", 
      matcha: "🍃",
      smoothie: "🥤",
      'immune-tea': "🌿",
      milkshake: "🥛",
      lemonade: "🍋"
    };
    const emoji = defaultEmojis[categoryKey] || "🍽️";
    return { emoji, name: categoryLabel };
  };

  const categoryDisplay = getCategoryDisplay(item.category);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/menu"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          {uiMessages?.backToMenu || "← Назад к меню"}
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {item.image && (
              <div className="md:w-1/2">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className={`p-8 ${item.image ? "md:w-1/2" : "w-full"}`}>
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {categoryDisplay.emoji} {categoryDisplay.name}
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl font-bold">{item.name}</h1>
                {item.isNew && (
                  <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full font-medium ml-4">
                    {uiMessages?.newItemBadge || "Новинка"}
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {item.description}
              </p>

              {item.variants && item.variants.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">{productDetailContent?.variantsTitle || "Варианты и цены"}</h3>
                  <div className="grid gap-3">
                    {item.variants.map((variant, idx) => (
                      <div
                        key={idx}
                        className="bg-gradient-to-r from-secondary to-primary text-white px-6 py-4 rounded-lg shadow-md"
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            {variant.description && (
                              <span className="text-sm text-black/80 opacity-90">
                                {variant.description}
                              </span>
                            )}
                            {variant.size && (
                              <div className="text-black/80 text-sm">
                                Объем: {variant.size} л
                              </div>
                            )}
                          </div>
                          <div className="text-xl font-bold">
                            {variant.price} {generalSettings?.currency || "сом"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-6 border-t">
                <span
                  className={`inline-block px-4 py-2 rounded-lg font-semibold ${
                    item.available
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.available ? (productDetailContent?.available || "✓ В наличии") : (productDetailContent?.unavailable || "✗ Недоступно")}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/menu"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            {productDetailContent?.viewMenuButton || "Посмотреть полное меню"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
