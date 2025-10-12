import { useState, useEffect } from "react";
import CategorySection from "../components/CategorySection";
import PromotionsBanner from "../components/PromotionsBanner";
import { loadMenuData } from "../lib/content-loader";

function Menu() {
  const [menuData, setMenuData] = useState({ coffee: [], tea: [], matcha: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = loadMenuData();
    setMenuData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Загрузка меню...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Наше меню
        </h1>

        {/* Coffee Section */}
        <CategorySection
          title="☕ КОФЕ"
          items={menuData.coffee}
          categoryType="coffee"
        />

        {/* Tea Section */}
        <CategorySection
          title="🍵 ЧАЙ"
          items={menuData.tea}
          categoryType="tea"
        />

        {/* Matcha Section */}
        <CategorySection
          title="🍃 МАТЧА ЛАТТЕ"
          items={menuData.matcha}
          categoryType="matcha"
        />

        {/* Promotions */}
        <PromotionsBanner />
      </main>
    </div>
  );
}

export default Menu;
