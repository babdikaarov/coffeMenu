import { Link, useLocation } from "react-router-dom";
import { useGeneralSettings, useNavigationLabels } from "../hooks/useSettings";
import { usePromotions } from "../hooks/usePromotions";

export default function Header() {
  const location = useLocation();
  const { settings } = useGeneralSettings();
  const { labels } = useNavigationLabels();
  const { hasPromotions } = usePromotions();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-20">
        {/* Backdrop blur background */}
        <div className="bg-white/30 backdrop-blur-md absolute -z-10 w-full h-full border-b border-white/20"></div>
        <div className="bg-gradient-to-r from-primary/90 to-dark/90 absolute -z-10 w-full h-full"></div>
        {/* <div class=" h-full w-full  flex  items-center gap-4 justify-between text-sm lg:text-base ">
        
        </div> */}
        <div className="container mx-auto px-4 h-full group">
          <div className="flex justify-between items-center h-full text-white">
            <Link
              to="/"
              className="text-2xl md:text-3xl font-bold hover:text-secondary transition-colors"
            >
              {settings?.siteName || "Coffee & Tea"}
            </Link>

            {/* Animated Mobile Burger Button */}
            <label
              role="menu-trigger"
              id="menu-icon-wrapper"
              className="menu-icon-wrapper peer z-50 md:hidden size-7"
              style={{ visibility: "visible" }}
              htmlFor="burger-button"
              tabIndex={-1}
            >
              <svg width="1000" height="1000">
                <path
                  className="path1"
                  d="M300 400H700c200 0 200 350-100 450A400 400 0 01200 200L800 800"
                ></path>
                <path className="path2" d="M300 500H700"></path>
                <path
                  className="path3"
                  d="M700 600H300c-200 0-200-400 100-450A400 380 0 11200 800L800 200"
                ></path>
              </svg>
              <input
                tabIndex={-1}
                role="button"
                id="burger-button"
                className="appearance-none menu-icon-trigger checked:bg-black checked:dark:bg-black checked:z-30 checked:fixed checked:top-0 checked:left-0 checked:right-0 checked:bottom-0 checked:opacity-25"
                type="checkbox"
              />
            </label>
            <div className="menu-item">
              <Link
                to="/"
                className={`font-semibold transition-colors hover:text-secondary ${
                  isActive("/") && location.pathname === "/"
                    ? "text-secondary border-b-2 border-secondary"
                    : ""
                }`}
              >
                {labels?.home || "Главная"}
              </Link>
              <Link
                to="/menu"
                className={`font-semibold transition-colors hover:text-secondary ${
                  isActive("/menu")
                    ? "text-secondary border-b-2 border-secondary"
                    : ""
                }`}
              >
                {labels?.menu || "Меню"}
              </Link>
              {hasPromotions && (
                <Link
                  to="/promotions"
                  className={`font-semibold transition-colors hover:text-secondary ${
                    isActive("/promotions")
                      ? "text-secondary border-b-2 border-secondary"
                      : ""
                  }`}
                >
                  {labels?.promotions || "🎉 Акции"}
                </Link>
              )}
              {import.meta.env.DEV && (
                <a
                  href="/admin/index.html"
                  className="font-semibold transition-colors hover:text-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {labels?.admin || "Админ"}
                </a>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
