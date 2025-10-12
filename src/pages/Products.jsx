import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadMenuData } from "../lib/content-loader";

function Products() {
  const [menuData, setMenuData] = useState({ coffee: [], tea: [], matcha: [] });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const data = loadMenuData();
    setMenuData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">Загрузка продуктов...</div>
      </div>
    );
  }

  // Get all products as a flat array
  const allProducts = [
    ...menuData.coffee.map(item => ({ ...item, category: 'coffee' })),
    ...menuData.tea.map(item => ({ ...item, category: 'tea' })),
    ...menuData.matcha.map(item => ({ ...item, category: 'matcha' }))
  ];

  // Filter products
  const filteredProducts = filter === "all"
    ? allProducts
    : allProducts.filter(item => item.category === filter);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          Все продукты
        </h1>

        {/* Filter buttons */}
        <div className="flex gap-4 justify-center mb-8 flex-wrap">
          <button
            onClick={() => setFilter("all")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "all"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Все
          </button>
          <button
            onClick={() => setFilter("coffee")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "coffee"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            ☕ Кофе
          </button>
          <button
            onClick={() => setFilter("tea")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "tea"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🍵 Чай
          </button>
          <button
            onClick={() => setFilter("matcha")}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              filter === "matcha"
                ? "bg-primary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            🍃 Матча
          </button>
        </div>

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((item, index) => (
            <Link
              key={`${item.category}-${index}`}
              to={`/products/${encodeURIComponent(item.name)}`}
              state={{ item }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              {item.image && (
                <div className="h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {item.description}
                </p>
                {item.prices && item.prices.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {item.prices.map((price, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-semibold"
                      >
                        {price}₽
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              Нет продуктов в этой категории
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Products;
