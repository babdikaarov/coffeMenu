// Settings content loader for Decap CMS integration

// Default metadata settings
const defaultMetadataSettings = {
  site: {
    title: "Coffee & Tea Menu",
    description: "Лучший кофе, чай и матча в городе. Свежеобжаренные зерна, авторские рецепты и уютная атмосфера.",
    keywords: ["кофе", "чай", "матча", "кафе", "Бишкек"],
    url: "https://your-coffee-site.com",
    image: ""
  },
  openGraph: {
    title: "",
    description: "",
    image: "",
    type: "website" as const
  },
  twitter: {
    title: "",
    description: "",
    image: "",
    card: "summary_large_image" as const,
    site: ""
  }
};

// Default settings as fallback
const defaultGeneralSettings = {
  siteName: "☕ Кофе и Чай",
  hours: {
    weekdays: "08:00 - 22:00",
    weekend: "09:00 - 23:00"
  },
  contact: {
    phone: "+996 XXX XXX XXX",
    address: "г. Бишкек, ул. Примерная, 123",
    instagram: "@coffee_tea_kg"
  }
};

const defaultPageSettings = {
  home: {
    heroTitle: "Добро пожаловать в наш уютный мир",
    heroSubtitle: "Лучший кофе, чай и матча в городе",
    menuButtonText: "Посмотреть меню",
    promotionsSection: {
      title: "🎉 Актуальные акции",
      description: "Не упустите возможность попробовать наши новинки и получить скидки!",
      buttonText: "Смотреть все акции"
    }
  },
  menu: {
    pageTitle: "Наше меню",
    categories: [
      { name: "coffee", title: "КОФЕ", icon: "☕" },
      { name: "tea", title: "ЧАЙ", icon: "🍵" },
      { name: "matcha", title: "МАТЧА ЛАТТЕ", icon: "🍃" }
    ]
  },
  promotions: {
    pageTitle: "Актуальные акции",
    description: "Следите за нашими специальными предложениями и скидками"
  },
  ui: {
    loading: "Загрузка меню...",
    notFound: "Товар не найден",
    unavailable: "Временно недоступно",
    available: "В наличии",
    outOfStock: "Нет в наличии",
    backToMenu: "← Назад к меню",
    noPriceText: "Цена не указана",
    newItemBadge: "Новинка"
  }
};

export async function loadGeneralSettings() {
  try {
    // Try to load from CMS content using dynamic import
    const response = await fetch('/content/settings/general.json');
    if (response.ok) {
      const generalSettings = await response.json();
      return { ...defaultGeneralSettings, ...generalSettings };
    } else {
      throw new Error('Failed to fetch general settings');
    }
  } catch (error) {
    console.warn('Could not load general settings from CMS, using defaults:', error);
    return defaultGeneralSettings;
  }
}

export async function loadPageSettings() {
  try {
    // Try to load from CMS content using dynamic import
    const response = await fetch('/content/settings/pages.json');
    if (response.ok) {
      const pageSettings = await response.json();
      return { ...defaultPageSettings, ...pageSettings };
    } else {
      throw new Error('Failed to fetch page settings');
    }
  } catch (error) {
    console.warn('Could not load page settings from CMS, using defaults:', error);
    return defaultPageSettings;
  }
}

export async function loadMetadataSettings() {
  try {
    // Try to load from CMS content using dynamic import
    const response = await fetch('/content/settings/metadata.json');
    if (response.ok) {
      const metadataSettings = await response.json();
      return { ...defaultMetadataSettings, ...metadataSettings };
    } else {
      throw new Error('Failed to fetch metadata settings');
    }
  } catch (error) {
    console.warn('Could not load metadata settings from CMS, using defaults:', error);
    return defaultMetadataSettings;
  }
}

// Helper function to get specific page content
export async function getPageContent(pageName: string) {
  const pageSettings = await loadPageSettings();
  return (pageSettings as any)[pageName] || {};
}

// Helper function to get UI messages
export async function getUIMessages() {
  const pageSettings = await loadPageSettings();
  return pageSettings.ui || {};
}