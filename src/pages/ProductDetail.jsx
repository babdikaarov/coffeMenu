import { useParams, useLocation, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { loadMenuData } from "../lib/content-loader";

function ProductDetail() {
  const { item: itemParam } = useParams();
  const location = useLocation();
  const [item, setItem] = useState(location.state?.item || null);

  useEffect(() => {
    // If item is not passed via state, search for it in menu data
    if (!item) {
      const menuData = loadMenuData();
      const allProducts = [
        ...menuData.coffee.map(i => ({ ...i, category: 'coffee' })),
        ...menuData.tea.map(i => ({ ...i, category: 'tea' })),
        ...menuData.matcha.map(i => ({ ...i, category: 'matcha' }))
      ];

      const foundItem = allProducts.find(
        i => i.name === decodeURIComponent(itemParam)
      );

      if (foundItem) {
        setItem(foundItem);
      }
    }
  }, [itemParam, item]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Продукт не найден</h2>
          <Link
            to="/products"
            className="text-primary hover:underline"
          >
            Вернуться к продуктам
          </Link>
        </div>
      </div>
    );
  }

  const categoryEmoji = {
    coffee: '☕',
    tea: '🍵',
    matcha: '🍃'
  };

  const categoryName = {
    coffee: 'Кофе',
    tea: 'Чай',
    matcha: 'Матча'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Link
          to="/products"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          ← Назад к продуктам
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
            <div className={`p-8 ${item.image ? 'md:w-1/2' : 'w-full'}`}>
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold">
                  {categoryEmoji[item.category]} {categoryName[item.category]}
                </span>
              </div>

              <h1 className="text-4xl font-bold mb-4">{item.name}</h1>

              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                {item.description}
              </p>

              {item.sizes && item.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Размеры</h3>
                  <div className="flex gap-3 flex-wrap">
                    {item.sizes.map((size, idx) => (
                      <span
                        key={idx}
                        className="border-2 border-primary text-primary px-4 py-2 rounded-lg font-semibold"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.prices && item.prices.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-bold text-lg mb-3">Цены</h3>
                  <div className="flex gap-3 flex-wrap">
                    {item.prices.map((price, idx) => (
                      <span
                        key={idx}
                        className="bg-secondary text-white px-6 py-3 rounded-lg text-xl font-bold"
                      >
                        {price}₽
                      </span>
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
                  {item.available ? "✓ В наличии" : "✗ Недоступно"}
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
            Посмотреть полное меню
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
