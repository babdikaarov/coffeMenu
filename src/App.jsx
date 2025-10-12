import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="pt-24">
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:item" element={<ProductDetail />} />
          <Route path="/admin" element={<AdminRedirect />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="bg-primary text-white py-6 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Coffee & Tea Menu</p>
          <p className="text-sm mt-2 text-secondary/80">
            Сделано с ❤️ и кофеином
          </p>
        </div>
      </footer>
    </div>
  );
}

// Component to handle /admin redirect
function AdminRedirect() {
  // Redirect to /admin/index.html (Decap CMS)
  window.location.href = '/admin/index.html';
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl text-primary">Redirecting to Admin Panel...</div>
    </div>
  );
}

// 404 Not Found component
function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Страница не найдена</p>
        <a
          href="/"
          className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
        >
          На главную
        </a>
      </div>
    </div>
  );
}

export default App;
