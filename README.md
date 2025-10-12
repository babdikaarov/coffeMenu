# ☕ Coffee Menu - Framework Comparison

A learning project showcasing the same coffee menu built with three different modern web frameworks: **Svelte**, **React**, and **Hugo**. All three implementations use **DecapCMS** for content management.

## 📁 Project Structure

```
├── CoffeMenu/          # Svelte + SvelteKit + DecapCMS
├── ReactCoffeMenu/     # React + Vite + DecapCMS
└── HugoMenu/           # Hugo SSG (reference project, preserved for learning)
```

## 🎯 Purpose

This project demonstrates:
- **Framework Comparison**: Same functionality implemented in Svelte and React
- **DecapCMS Integration**: Git-based CMS working across different frameworks
- **Single Page Menu**: All implementations render the same 16-item coffee menu
- **Learning Resource**: Keep implementations side-by-side for comparison

## 📋 Menu Content

### ☕ Coffee (7 items)
- Американо, Капучино, Эспрессо, Двойное эспрессо, Латте, Флэт Уайт, Раф Кофе
- **Sizes**: 0.25L (100 сом), 0.35L (150 сом)

### 🍵 Tea (6 items)
- Дикая Вишня, Фруктовый Каркаде, Молочный Улун, Жень-Шень, Эрл Грей с Бергамотом, Зеленый Жасмин
- **Price**: 50 сом

### 🍃 Matcha Latte (3 items)
- Зеленая, Розовая, Голубая
- **Price**: 150 сом

### 🎉 Promotions
- Every 5th coffee free
- 10% student discount

## 🚀 Quick Start

### 1. CoffeMenu (Svelte)

```bash
cd CoffeMenu
npm install
npm run dev      # Start dev server on http://localhost:5173
npm run cms      # Start DecapCMS backend (in another terminal)
```

Visit:
- **Website**: http://localhost:5173
- **CMS Admin**: http://localhost:5173/admin

### 2. ReactCoffeMenu (React)

```bash
cd ReactCoffeMenu
npm install
npm run dev      # Start dev server on http://localhost:5173
npm run cms      # Start DecapCMS backend (in another terminal)
```

Visit:
- **Website**: http://localhost:5173
- **CMS Admin**: http://localhost:5173/admin

### 3. HugoMenu (Hugo)

⚠️ **Note**: This project is preserved as-is for learning purposes. It contains a different implementation (topol-ecoseptic.kg) and serves as a reference for Hugo + DecapCMS patterns.

## 🛠️ Tech Stack Comparison

| Feature | CoffeMenu (Svelte) | ReactCoffeMenu (React) | HugoMenu (Hugo) |
|---------|-------------------|----------------------|----------------|
| **Framework** | Svelte 5 + SvelteKit | React 19 + Vite | Hugo SSG |
| **Styling** | TailwindCSS 4 | TailwindCSS 3 | TailwindCSS 3 |
| **CMS** | DecapCMS 3 | DecapCMS 3 | DecapCMS 3 |
| **Build** | Vite | Vite | Hugo |
| **Rendering** | SSG/SSR | CSR | SSG |
| **Deployment** | Netlify | Netlify | Netlify |

## 📦 DecapCMS Collections

All implementations share the same DecapCMS structure:

### Collections:
1. **Menu Items** (`content/menu-items/`)
   - Name, category, description, sizes, prices, availability, order
   - Categories: coffee, tea, matcha

2. **Promotions** (`content/promotions/`)
   - Title, description, discount %, terms, active status, icon

3. **Site Settings** (`content/settings/`)
   - Site name, logo, hours, contact info

## 🎨 Design

Coffee-themed color palette:
- **Primary**: rgb(139, 69, 19) - Coffee brown
- **Secondary**: rgb(245, 222, 179) - Cream/wheat
- **Accent**: rgb(205, 127, 50) - Bronze
- **Dark**: rgb(54, 30, 15) - Dark chocolate

## 📝 Development Notes

### CoffeMenu (Svelte)
- Uses SvelteKit for SSG with adapter-static
- Svelte 5 with modern component syntax
- TailwindCSS 4 (latest)
- Static data loader in `src/lib/content-loader.ts`

### ReactCoffeMenu (React)
- Vite for fast development and building
- React 19 with hooks
- TailwindCSS 3 with custom coffee theme
- Static data loader in `src/lib/content-loader.js`

### HugoMenu (Hugo)
- Preserved as reference (original project structure)
- Complex multi-language setup (Russian, Kyrgyz)
- Rich DecapCMS configuration example

## 🚢 Deployment

All projects are configured for Netlify deployment:

1. Push to GitHub
2. Connect repository to Netlify
3. Set build command:
   - **CoffeMenu**: `npm run build` → `build/`
   - **ReactCoffeMenu**: `npm run build` → `dist/`
   - **HugoMenu**: `hugo --minify` → `public/`
4. Enable Git Gateway for DecapCMS in production

## 📚 Learning Resources

This project is ideal for:
- Comparing Svelte vs React approaches
- Understanding DecapCMS integration patterns
- Learning static site generation techniques
- Studying component architecture differences

## 🤝 Contributing

This is a personal learning project, but feel free to:
- Fork and experiment
- Report issues
- Suggest improvements
- Use as a template for your projects

## 📄 License

MIT

---

Made with ❤️ and lots of ☕ caffeine

**Author**: Beksultan Abdikaarov
