import MenuCard from './MenuCard'
import { usePageContent } from '../hooks/useSettings'
import type { MenuItem, MenuContent } from '../types'

interface CategorySectionProps {
  title: string;
  items: MenuItem[];
  categoryType: string;
}

export default function CategorySection({ title, items, categoryType }: CategorySectionProps) {
  const { content: menuContent } = usePageContent<MenuContent>('menu');
  
  // Find category info from CMS settings
  const categoryInfo = menuContent?.categories?.find(cat => cat.name === categoryType);
  const displayTitle = categoryInfo ? `${categoryInfo.icon} ${categoryInfo.title}` : title;
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="mb-16 slide-up">
      <h2 className="category-heading mb-8 fade-in">{displayTitle}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item, index) => (
          <div
            key={index}
            className="stagger-item"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <MenuCard
              item={item}
              categoryType={categoryType}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
