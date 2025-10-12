import { Link } from "react-router-dom";
import { useGeneralSettings, useUIMessages } from "../hooks/useSettings";
import type { MenuItem } from "../types";

interface MenuCardProps {
  item: MenuItem;
  categoryType: string;
}

export default function MenuCard({ item, categoryType }: MenuCardProps) {
  const { settings } = useGeneralSettings();
  const { messages } = useUIMessages();
  return (
    <Link
      to={`/menu/${encodeURIComponent(item.name)}`}
      state={{ item }}
      className="menu-card card-hover p-6 flex flex-col h-full justify-between fade-in"
    >
      {/* Item Name */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-bold text-primary">{item.name}</h3>
        {item.isNew && (
          <span className="text-xs bg-green-500 text-white px-2 py-1 rounded-full font-medium">
            {messages?.newItemBadge || "Новинка"}
          </span>
        )}
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">
        {item.description}
      </p>

      {/* Variants and Prices */}
      <div className="flex items-end justify-between">
        {item.variants && item.variants.length > 0 ? (
          <div className="flex flex-col gap-2">
            {item.variants.map((variant, index) => (
              <div key={index} className="flex items-center gap-3">
                {variant.size && (
                  <span className="text-sm text-gray-500 font-medium">
                    {variant.size} л
                  </span>
                )}
                {variant.description && !variant.size && (
                  <span className="text-sm text-gray-500 font-medium">
                    {variant.description}
                  </span>
                )}
                <span className="price-badge">
                  {variant.price} {settings?.currency || "сом"}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {messages?.noPriceText || "Цена не указана"}
            </span>
          </div>
        )}

        {/* Availability Badge */}
        {item.available !== undefined && !item.available && (
          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
            {messages?.outOfStock || "Нет в наличии"}
          </span>
        )}
      </div>
    </Link>
  );
}
