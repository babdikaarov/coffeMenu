import matter from "gray-matter";
import type { MenuData, MenuItem, Promotion } from "../types";

// Load menu data from markdown files created by Decap CMS
// Returns dynamic categories based on actual CMS content
export function loadMenuData(): MenuData {
  // Get all markdown files from the content/menu-items directory
  const menuFiles = import.meta.glob("/content/menu-items/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }) as Record<string, string>;

  // Build categories dynamically based on CMS content
  const menuData: MenuData = {};

  // Parse each markdown file
  Object.entries(menuFiles).forEach(([filepath, content]) => {
    try {
      const { data } = matter(content);

      // Only include available items
      if (data.available !== false && data.category && data.name) {
        const item: MenuItem = {
          name: data.name,
          description: data.description || "",
          variants: data.variants || [],
          image: data.image,
          available: data.available !== false,
          order: data.order || 999,
          category: data.category,
          featured: data.featured,
          isNew: data.isNew,
        };

        // Dynamically create category if it doesn't exist
        const category = data.category;
        if (!menuData[category]) {
          menuData[category] = [];
        }

        menuData[category].push(item);
      }
    } catch (error) {
      console.error(`Error parsing ${filepath}:`, error);
    }
  });

  // Sort items by order field within each category
  Object.keys(menuData).forEach((category) => {
    menuData[category].sort((a, b) => a.order - b.order);
  });

  return menuData;
}

// Load promotions data from markdown files created by Decap CMS
// Returns only CMS promotions, no fallback content
export function loadPromotionsData(): Promotion[] {
  // Get all markdown files from the content/promotions directory
  const promotionFiles = import.meta.glob("/content/promotions/*.md", {
    eager: true,
    query: "?raw",
    import: "default",
  }) as Record<string, string>;

  const promotions: Promotion[] = [];

  // Parse each markdown file
  Object.entries(promotionFiles).forEach(([filepath, content]) => {
    try {
      const { data } = matter(content);

      // Only include active promotions with required fields
      if (data.active !== false && data.title && data.description) {
        const promotion: Promotion = {
          title: data.title,
          description: data.description,
          discount: data.discount,
          terms: data.terms,
          active: data.active !== false,
          icon: data.icon || "🎉",
        };

        promotions.push(promotion);
      }
    } catch (error) {
      console.warn(`Error parsing promotion file ${filepath}:`, error);
    }
  });

  return promotions;
}

// Get all available categories from menu data
export function getAvailableCategories(): string[] {
  const menuData = loadMenuData();
  return Object.keys(menuData);
}

// Get category display information from CMS settings
export function getCategoryInfo(
  categoryKey: string,
): { title: string; icon: string } | null {
  // This will be populated from CMS settings
  // For now, return null to force CMS-only approach
  return null;
}
