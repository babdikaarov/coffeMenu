// Menu Item Types
export interface MenuItemVariant {
  size?: string;
  price: number;
  description?: string;
}

export interface MenuItem {
  name: string;
  description: string;
  variants: MenuItemVariant[];
  image?: string;
  available: boolean;
  order: number;
  category: string;
  featured?: boolean;
  isNew?: boolean;
}

// Dynamic Menu Data Structure
export interface MenuData {
  [categoryKey: string]: MenuItem[];
}

// Promotion Types
export interface Promotion {
  title: string;
  description: string;
  discount?: number;
  terms?: string;
  active: boolean;
  icon: string;
}

// Settings Types
export interface GeneralSettings {
  siteName: string;
  currency: string;
  logo?: string;
  hours: {
    weekdays: string;
    weekend: string;
  };
  contact: {
    phone: string;
    address: string;
    instagram?: string;
  };
}

export interface CategoryConfig {
  name: string;
  title: string;
  icon: string;
}

export interface NavigationLabels {
  home: string;
  menu: string;
  promotions: string;
  admin: string;
}

export interface FooterSettings {
  copyright: string;
  companyName: string;
  tagline: string;
  social: {
    joinMessage: string;
    telegramUrl: string;
    telegramLabel: string;
    description: string;
  };
}

export interface UIMessages {
  loading: string;
  notFound: string;
  unavailable: string;
  available: string;
  outOfStock: string;
  backToMenu: string;
  noPriceText: string;
  newItemBadge: string;
}

export interface ProductDetailContent {
  categoryLabels: Record<string, string>;
  variantsTitle: string;
  available: string;
  unavailable: string;
  viewMenuButton: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  menuButtonText: string;
  categories?: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
  features?: {
    title: string;
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  promotionsSection?: {
    title: string;
    description: string;
    buttonText: string;
  };
}

export interface MenuContent {
  pageTitle: string;
  categories: CategoryConfig[];
}

export interface PromotionsContent {
  pageTitle: string;
  description: string;
  bannerTitle: string;
  terms: {
    title: string;
    items: string[];
  };
}

// Metadata Types
export interface SiteMetadata {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  image?: string;
}

export interface OpenGraphMetadata {
  title?: string;
  description?: string;
  image?: string;
  type: "website" | "article" | "business.business";
}

export interface TwitterMetadata {
  title?: string;
  description?: string;
  image?: string;
  card: "summary" | "summary_large_image";
  site?: string;
}

export interface MetadataSettings {
  site: SiteMetadata;
  openGraph: OpenGraphMetadata;
  twitter: TwitterMetadata;
}

export interface PageSettings {
  home: HomeContent;
  menu: MenuContent;
  promotions: PromotionsContent;
  navigation: NavigationLabels;
  footer: FooterSettings;
  productDetail: ProductDetailContent;
  ui: UIMessages;
  errors: {
    notFoundTitle: string;
    notFoundMessage: string;
    homeButton: string;
    adminRedirect: string;
  };
}

// Hook Return Types
export interface UseSettingsReturn<T> {
  settings: T;
  loading: boolean;
}

export interface UsePageContentReturn<T> {
  content: T;
  loading: boolean;
}

export interface UsePromotionsReturn {
  promotions: Promotion[];
  loading: boolean;
  hasPromotions: boolean;
}