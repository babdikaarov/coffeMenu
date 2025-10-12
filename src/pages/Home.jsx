import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-primary mb-4">
            ☕ Coffee & Tea Menu
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Добро пожаловать в наше уютное кафе
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/menu"
              className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Посмотреть меню
            </Link>
            <Link
              to="/products"
              className="bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Все продукты
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">☕</div>
            <h3 className="text-xl font-bold mb-2">Кофе</h3>
            <p className="text-gray-600">
              Широкий выбор кофейных напитков от классического эспрессо до латте
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🍵</div>
            <h3 className="text-xl font-bold mb-2">Чай</h3>
            <p className="text-gray-600">
              Изысканные сорта чая со всего мира
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-3">🍃</div>
            <h3 className="text-xl font-bold mb-2">Матча</h3>
            <p className="text-gray-600">
              Японский порошковый чай матча в различных вариациях
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-4">Наши преимущества</h2>
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div>
              <h4 className="font-bold mb-2">✓ Качественные ингредиенты</h4>
              <p className="text-gray-600">Используем только отборные зерна и листья</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">✓ Профессиональные бариста</h4>
              <p className="text-gray-600">Наша команда прошла международную сертификацию</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">✓ Уютная атмосфера</h4>
              <p className="text-gray-600">Комфортное пространство для работы и отдыха</p>
            </div>
            <div>
              <h4 className="font-bold mb-2">✓ Доступные цены</h4>
              <p className="text-gray-600">Качество по разумной цене</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
