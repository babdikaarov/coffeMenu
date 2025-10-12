import MenuCard from './MenuCard'

export default function CategorySection({ title, items, categoryType }) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <section className="mb-16">
      <h2 className="category-heading mb-8">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <MenuCard
            key={index}
            item={item}
            categoryType={categoryType}
          />
        ))}
      </div>
    </section>
  )
}
