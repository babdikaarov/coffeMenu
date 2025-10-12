import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-primary to-dark text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Link to="/" className="text-3xl font-bold hover:text-secondary transition-colors">
            ☕ Кофе и Чай
          </Link>

          <nav className="flex gap-6 flex-wrap justify-center">
            <Link
              to="/"
              className={`font-semibold transition-colors hover:text-secondary ${
                isActive('/') && location.pathname === '/' ? 'text-secondary border-b-2 border-secondary' : ''
              }`}
            >
              Главная
            </Link>
            <Link
              to="/menu"
              className={`font-semibold transition-colors hover:text-secondary ${
                isActive('/menu') ? 'text-secondary border-b-2 border-secondary' : ''
              }`}
            >
              Меню
            </Link>
            <Link
              to="/products"
              className={`font-semibold transition-colors hover:text-secondary ${
                isActive('/products') ? 'text-secondary border-b-2 border-secondary' : ''
              }`}
            >
              Продукты
            </Link>
            <a
              href="/admin/index.html"
              className="font-semibold transition-colors hover:text-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Админ
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
