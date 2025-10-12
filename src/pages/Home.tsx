import { Link } from "react-router-dom";
import { usePageContent } from "../hooks/useSettings";
import { loadMenuData } from "../lib/content-loader";
import { useState, useEffect } from "react";
import type { HomeContent, MenuContent, MenuItem } from "../types";

function Home() {
  const { content: homeContent } = usePageContent<HomeContent>("home");
  const { content: menuContent } = usePageContent<MenuContent>("menu");
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [menuData, setMenuData] = useState<Record<string, MenuItem[]>>({});

  useEffect(() => {
    const data = loadMenuData();
    setMenuData(data);
    
    const allItems: MenuItem[] = [];

    // Collect all items from all categories
    Object.values(data).forEach((categoryItems) => {
      allItems.push(...categoryItems);
    });

    // Filter featured items
    const featured = allItems.filter((item) => item.featured && item.available);
    setFeaturedItems(featured);
  }, []);
  return (
    <div className=" bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16 fade-in">
          {homeContent && (
            <>
              <h1 className="text-6xl font-bold text-primary mb-4 scale-in">
                {homeContent.heroTitle}
              </h1>
              <p className="text-xl text-gray-600 mb-8 slide-up">
                {homeContent.heroSubtitle}
              </p>
            </>
          )}
          <div className="flex gap-4 justify-center flex-wrap slide-up">
            <Link
              to="/menu"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold button-hover"
            >
              {homeContent?.menuButtonText || "Меню"}
            </Link>
          </div>
        </div>

        {menuContent?.categories && menuContent.categories.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {menuContent.categories
              .filter((category) => {
                // Only show categories that have items in menuData
                return menuData[category.name] && menuData[category.name].length > 0;
              })
              .map((category, index) => (
                <Link
                  key={category.name}
                  to={`/menu?filter=${category.name}`}
                  className="bg-white p-6 rounded-lg shadow-md text-center card-hover stagger-item block"
                  style={{ animationDelay: `${(index + 1) * 0.1}s` }}
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-600">
                    Изучите наш ассортимент {category.title.toLowerCase()}
                  </p>
                </Link>
              ))}
          </div>
        )}

        {featuredItems && featuredItems.length > 0 && (
          <div
            className="bg-white p-8 rounded-lg shadow-md text-center slide-up"
            style={{ animationDelay: "0.5s" }}
          >
            <h2 className="text-3xl font-bold mb-6">Рекомендуемые позиции</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {featuredItems.slice(0, 6).map((item, index) => (
                <div
                  key={item.name}
                  className="border border-gray-200 rounded-lg p-4 stagger-item hover:shadow-md transition-shadow"
                  style={{ animationDelay: `${0.6 + index * 0.1}s` }}
                >
                  <h4 className="font-bold mb-2 text-primary">{item.name}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {item.description}
                  </p>
                  {item.variants && item.variants.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        от {Math.min(...item.variants.map((v) => v.price))} сом
                      </span>
                      <Link
                        to={`/menu/${item.name}`}
                        className="text-primary text-sm hover:underline"
                      >
                        Подробнее
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
