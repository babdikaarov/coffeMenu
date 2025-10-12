export default function MenuCard({ item, categoryType }) {
  const hasSizes = item.sizes && item.sizes.length > 0

  return (
    <div className="menu-card p-6 hover:scale-105 transition-transform duration-300">
      {/* Item Name */}
      <h3 className="text-xl font-bold text-primary mb-2">{item.name}</h3>

      {/* Description */}
      <p className="text-sm text-gray-600 mb-4 min-h-[3rem]">{item.description}</p>

      {/* Sizes and Prices */}
      <div className="flex items-end justify-between">
        {hasSizes ? (
          <div className="flex flex-col gap-2">
            {item.sizes.map((size, index) => (
              <div key={index} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 font-medium">{size} л</span>
                <span className="price-badge">{item.prices[index]} сом</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <span className="price-badge text-lg">{item.prices[0]} сом</span>
          </div>
        )}

        {/* Availability Badge */}
        {item.available !== undefined && !item.available && (
          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">
            Нет в наличии
          </span>
        )}
      </div>
    </div>
  )
}
