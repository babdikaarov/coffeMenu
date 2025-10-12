import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useRef } from "react";
import Header from "./components/Header";
import FooterPromotionsBanner from "./components/FooterPromotionsBanner";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import ProductDetail from "./pages/ProductDetail";
import Promotions from "./pages/Promotions";
import { useScrollToTop } from "./hooks/useScrollToTop";
import { usePageSettings } from "./hooks/useSettings";
import type { PageSettings } from "./types";
import { TranslateButton } from "./components/TranslateButton";

function App() {
  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { settings } = usePageSettings();

  // Use scroll to top hook
  useScrollToTop();

  const handleSecretClick = () => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      // Redirect to admin after 5 clicks
      window.location.href = "/admin/index.html";
      return;
    }

    // Reset counter after 4 seconds of inactivity
    timeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 4000);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="pt-20 h-full flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:item" element={<ProductDetail />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route
            path="/admin"
            element={<AdminRedirect settings={settings} />}
          />
          <Route path="*" element={<NotFound settings={settings} />} />
        </Routes>
      </main>
      <footer className="bg-primary text-white py-6 mt-12">
        <FooterPromotionsBanner />
        <div className="container mx-auto px-4 text-center flex justify-center flex-col">
          <p
            onClick={handleSecretClick}
            className="cursor-default select-none inline-block"
          >
            <span className="px-1">
              {settings?.footer?.copyright || "© 2025"}
            </span>
            {settings?.footer?.companyName || "Coffee & Tea Menu"}
          </p>
          <p className="text-sm mt-2 text-secondary/80">
            {settings?.footer?.tagline || "Сделано с ❤️ и кофеином"}
          </p>
        </div>
      </footer>
    </div>
  );
}

// Component to handle /admin redirect
function AdminRedirect({ settings }: { settings: PageSettings | null }) {
  // Redirect to /admin/index.html (Decap CMS)
  window.location.href = "/admin/index.html";
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-primary">
        {settings?.errors?.adminRedirect || "Redirecting to Admin Panel..."}
      </div>
    </div>
  );
}

// 404 Not Found component
function NotFound({ settings }: { settings: PageSettings | null }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">
          {settings?.errors?.notFoundTitle || "404"}
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          {settings?.errors?.notFoundMessage || "Страница не найдена"}
        </p>
        <a
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
        >
          {settings?.errors?.homeButton || "На главную"}
        </a>
      </div>
    </div>
  );
}

export default App;
