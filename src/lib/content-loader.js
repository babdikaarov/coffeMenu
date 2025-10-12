import matter from 'gray-matter';

// Load menu data from markdown files created by Decap CMS
export function loadMenuData() {
  // Get all markdown files from the content/menu-items directory
  const menuFiles = import.meta.glob('/content/menu-items/*.md', {
    eager: true,
    query: '?raw',
    import: 'default'
  });

  const menuData = {
    coffee: [],
    tea: [],
    matcha: []
  };

  // Parse each markdown file
  Object.entries(menuFiles).forEach(([filepath, content]) => {
    try {
      const { data } = matter(content);

      // Only include available items
      if (data.available !== false) {
        const item = {
          name: data.name,
          description: data.description,
          prices: data.prices || [],
          sizes: data.sizes || [],
          image: data.image,
          available: data.available !== false,
          order: data.order || 999
        };

        // Add to appropriate category
        const category = data.category;
        if (menuData[category]) {
          menuData[category].push(item);
        }
      }
    } catch (error) {
      console.error(`Error parsing ${filepath}:`, error);
    }
  });

  // Sort items by order field
  Object.keys(menuData).forEach(category => {
    menuData[category].sort((a, b) => a.order - b.order);
  });

  return menuData;
}
