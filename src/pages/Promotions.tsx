import PromotionsBanner from "../components/PromotionsBanner";
import { usePageContent } from "../hooks/useSettings";
import type { PromotionsContent } from "../types";

function Promotions() {
  const { content: promotionsContent } = usePageContent<PromotionsContent>('promotions');
  return (
    <div className="min-h-screen pt-8">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-8 text-primary">
          {promotionsContent?.pageTitle || "🎉 Актуальные акции"}
        </h1>

        <p className="text-center text-gray-600 mb-12 text-lg">
          {promotionsContent?.description || "Следите за нашими специальными предложениями и скидками"}
        </p>

        <PromotionsBanner />

        {/* Terms and conditions */}
        <section className="mt-16 bg-gray-50 rounded-lg p-8">
          <h2 className="text-xl font-bold text-primary mb-4">{promotionsContent?.terms?.title || "Условия акций"}</h2>
          <ul className="text-gray-600 space-y-2 text-sm">
            {(promotionsContent?.terms?.items || [
              "• Акции не суммируются между собой",
              "• Студенческая скидка действует при предъявлении действующего студенческого билета",
              "• Каждый 5-й кофе бесплатно по карте постоянного клиента",
              "• Администрация оставляет за собой право изменить условия акций",
              "• Подробности уточняйте у персонала"
            ]).map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Promotions;
