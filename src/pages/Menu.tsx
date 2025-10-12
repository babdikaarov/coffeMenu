import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CategorySection from "../components/CategorySection";
import { loadMenuData, getAvailableCategories } from "../lib/content-loader";
import { usePageContent, useUIMessages } from "../hooks/useSettings";
import type { MenuData, MenuContent } from "../types";

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuData, setMenuData] = useState<MenuData>({});
  const [availableCategories, setAvailableCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement>>({});

  const { content: menuContent } = usePageContent<MenuContent>("menu");
  const { messages: uiMessages } = useUIMessages();

  // ✅ Load menu data once
  useEffect(() => {
    const data = loadMenuData();
    const categories = getAvailableCategories();
    setMenuData(data);
    setAvailableCategories(categories);
    setLoading(false);
  }, []);

  // ✅ Sync filter state with URL params
  useEffect(() => {
    const filterParam = searchParams.get("filter") || "all";
    if (filterParam !== filter) setFilter(filterParam);
  }, [searchParams]);

  // ✅ Memoize filters so it doesn't recompute every render
  const filters = useMemo(() => {
    if (!menuContent?.categories) return [];
    return menuContent.categories
      .filter((category) => menuData[category.name]?.length > 0)
      .map((category) => ({
        value: category.name,
        label: category.title,
      }));
  }, [menuContent, menuData]);

  // ✅ Smooth center scroll (with rAF throttling)
  const centerActiveButton = useCallback((filterValue: string) => {
    const container = scrollContainerRef.current;
    const button = buttonRefs.current[filterValue];
    if (!container || !button) return;

    requestAnimationFrame(() => {
      const containerWidth = container.offsetWidth;
      const buttonLeft = button.offsetLeft;
      const buttonWidth = button.offsetWidth;
      const scrollPosition = buttonLeft - containerWidth / 2 + buttonWidth / 2;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    });
  }, []);

  // ✅ Stable ref assignment to avoid recreating closures
  const setButtonRef = useCallback(
    (key: string, el: HTMLButtonElement | null) => {
      if (el) buttonRefs.current[key] = el;
    },
    [],
  );

  // ✅ Handle filter change
  const handleFilterChange = useCallback(
    (newFilter: string) => {
      if (newFilter === filter) return;

      setFilter(newFilter);
      setSearchParams(newFilter === "all" ? {} : { filter: newFilter });

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });

      setTimeout(() => centerActiveButton(newFilter), 80);
    },
    [filter, setSearchParams, centerActiveButton],
  );

  // ✅ Center active button on filter change
  useEffect(() => {
    const timer = setTimeout(() => centerActiveButton(filter), 100);
    return () => clearTimeout(timer);
  }, [filter, centerActiveButton]);

  // ✅ Early returns for better render skipping
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-primary">
          {uiMessages?.loading || "Загрузка..."}
        </div>
      </div>
    );
  }

  if (!menuContent) return null;

  return (
    <div className="h-full">
      <main className="container mx-auto px-4 pt-[8.5rem] pb-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-2 text-primary fade-in">
          {menuContent.pageTitle}
        </h1>

        {/* ✅ Fixed Scrollable Filter */}
        <div className="fixed top-20 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm shadow-md border-b border-primary/10">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <div
              ref={scrollContainerRef}
              className="flex items-center gap-3 overflow-x-auto scroll-smooth no-scrollbar px-2 sm:px-0"
            >
              {filters.length > 1 && (
                <button
                  ref={(el) => setButtonRef("all", el)}
                  onClick={() => handleFilterChange("all")}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    filter === "all"
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  Все
                </button>
              )}

              {filters.map((item) => (
                <button
                  key={item.value}
                  ref={(el) => setButtonRef(item.value, el)}
                  onClick={() => handleFilterChange(item.value)}
                  className={`flex-shrink-0 px-6 py-2.5 rounded-full font-medium transition-all duration-200 ${
                    filter === item.value
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Render only matching categories */}
        {availableCategories
          .filter((categoryKey) => filter === "all" || filter === categoryKey)
          .map((categoryKey) => {
            const categoryConfig = menuContent.categories?.find(
              (cat) => cat.name === categoryKey,
            );
            const categoryTitle = categoryConfig
              ? `${categoryConfig.icon} ${categoryConfig.title}`
              : categoryKey.toUpperCase();

            return (
              <CategorySection
                key={categoryKey}
                title={categoryTitle}
                items={menuData[categoryKey] || []}
                categoryType={categoryKey}
              />
            );
          })}
      </main>
    </div>
  );
}

export default Menu;
