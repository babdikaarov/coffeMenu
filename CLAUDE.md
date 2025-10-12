# Coffee & Tea Menu - Claude Configuration

## Project Overview

This is a modern React coffee shop menu application built with TypeScript, Vite, and Decap CMS. The application follows a **pure CMS-driven architecture** where all content comes from Decap CMS with no hardcoded fallbacks.

## Architecture

### TypeScript + React Stack
- **React 19** with TypeScript for type safety
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Decap CMS** for content management

### Key Design Principles

1. **Pure CMS-Driven**: No hardcoded content - everything comes from CMS or displays nothing
2. **Dynamic Categories**: Menu categories are determined by CMS content, not hardcoded
3. **Type Safety**: Full TypeScript implementation with strict type checking
4. **No Fallback Content**: Components show nothing when CMS content is unavailable

## Project Structure

```
src/
├── types/           # TypeScript interfaces and types
├── components/      # React components (.tsx)
├── pages/          # Route components (.tsx)  
├── hooks/          # Custom React hooks (.ts)
├── lib/            # Utility functions (.ts)
└── main.tsx        # Application entry point

content/
├── menu-items/     # Menu item markdown files (CMS managed)
├── promotions/     # Promotion markdown files (CMS managed)
└── settings/       # JSON configuration files (CMS managed)

public/admin/       # Decap CMS configuration
```

## Key Features

### Dynamic Menu System
- Categories are created dynamically based on CMS content
- No hardcoded category limitations (coffee, tea, matcha, etc.)
- Support for any category: coffee, tea, smoothie, immune-tea, milkshake, lemonade, etc.
- Menu filters automatically generated from available categories

### Content Management
- **Menu Items**: Managed via Decap CMS with flexible pricing structures
- **Promotions**: Dynamic promotion system with activation controls
- **Site Settings**: Comprehensive settings for all UI text and configuration
- **Page Content**: All page content editable through CMS

### TypeScript Implementation
- Strict type checking enabled
- Comprehensive type definitions in `src/types/index.ts`
- Type-safe CMS content loading
- No any types allowed

## Development Commands

```bash
# Install dependencies
npm install

# Development server with CMS
npm run dev

# Build for production  
npm run build

# Preview production build
npm run preview

# Run Decap CMS locally
npm run cms
```

## Content Structure

### Menu Items
Each menu item is a markdown file with frontmatter:
```yaml
---
name: "Американо"
category: "coffee"  # Any category name
description: "Классический черный кофе"
variants:
  - size: "0.25"
    price: 100
    description: "маленький"
  - size: "0.35" 
    price: 150
    description: "большой"
available: true
order: 1
---
```

### Categories
Categories are completely flexible - defined by:
1. Category field in menu items (creates the category)
2. CMS settings for display configuration (title, icon)
3. Menu page filters configuration

### Settings Architecture
- **General Settings**: Site name, currency, contact info, hours
- **Page Settings**: All page content and UI messages
- **Navigation**: Menu labels and text
- **Footer**: Social links and company info  
- **Product Detail**: Category labels and UI text
- **UI Messages**: Loading states, error messages, etc.

## CMS Configuration

The Decap CMS is configured in `public/admin/config.yml` with:
- Flexible category management (no hardcoded options)
- Comprehensive content editing capabilities
- Dynamic filter and navigation management
- Complete UI text control

## Deployment Notes

### Environment Variables
- No API keys or secrets required
- Uses Netlify/GitHub authentication for CMS
- All content files committed to repository

### Build Process
- TypeScript compilation with strict checking
- Vite optimization and bundling
- CMS config generation for environment
- Static site generation ready

## Component Architecture

### Key Components
- **Menu.tsx**: Dynamic category rendering with CMS-driven filters
- **ProductDetail.tsx**: Dynamic category support and CMS content
- **Home.tsx**: Pure CMS content with conditional rendering
- **Header.tsx**: Dynamic navigation based on available content

### Hooks
- **useSettings**: Type-safe CMS settings loading (no fallbacks)
- **usePromotions**: Dynamic promotion loading
- **usePageContent**: Generic page content loading with types

### Content Loader
- **loadMenuData()**: Dynamic category detection and loading
- **loadPromotionsData()**: Active promotion filtering
- **getAvailableCategories()**: Runtime category discovery

## TypeScript Configuration

### Key Settings
- Strict mode enabled
- No unused locals/parameters allowed
- Path mapping configured (@/ for src/)
- Full React 19 + TypeScript support

### Type Safety
- All CMS content properly typed
- Runtime type checking with null safety
- Generic hooks for reusable type safety
- Interface-driven development

## Migration Notes

This project was migrated from JavaScript to TypeScript while implementing:
- Dynamic category support (removed hardcoded coffee/tea/matcha)
- Pure CMS architecture (removed all fallback content)
- Comprehensive type safety
- Flexible menu structure support

## Development Guidelines

1. **Content First**: Always check CMS content availability before rendering
2. **Type Safety**: Use proper TypeScript types for all CMS data  
3. **No Fallbacks**: Never provide hardcoded fallback content
4. **Dynamic Categories**: Support any category name from CMS
5. **Null Handling**: Gracefully handle missing CMS content

## Testing Approach

### Manual Testing
- Test with empty CMS content (should show nothing, not fallbacks)
- Test with various category combinations
- Verify TypeScript compilation passes
- Check responsive design across devices

### Integration Testing  
- Verify CMS content loading works
- Test dynamic category creation
- Confirm navigation updates with content changes
- Validate promotion visibility logic

## Future Enhancements

### Planned Features
- Category emoji management through CMS
- Multi-language support via CMS
- Advanced promotion scheduling
- Inventory management integration
- Online ordering system

### Technical Debt
- Consider moving default emojis to CMS
- Implement more granular error boundaries  
- Add performance monitoring
- Optimize bundle size further

## Troubleshooting

### Common Issues
1. **Empty pages**: Check CMS content exists and is published
2. **TypeScript errors**: Ensure all types are properly imported
3. **Category not showing**: Verify category name matches menu items
4. **Build failures**: Check TypeScript strict mode compliance

### Debug Commands
```bash
# Check TypeScript errors
npx tsc --noEmit

# Validate CMS config
# Visit /admin/ in development

# Check content loading
# Inspect network tab for settings JSON files
```

This configuration enables Claude to understand the project's architecture, make appropriate code changes, and maintain the CMS-driven, TypeScript-first approach established in this implementation.