export default function PromotionsBanner() {
  const promotions = [
    {
      icon: '🎁',
      title: 'Каждый 5-й кофе — бесплатно',
      description: 'Every 5th coffee is free',
    },
    {
      icon: '🎓',
      title: 'Студенческая скидка 10%',
      description: 'При предъявлении студенческого билета',
    },
  ]

  return (
    <section className="mt-16 mb-8">
      <h2 className="category-heading mb-8">🎉 Акции</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-lg p-6 border-2 border-accent shadow-lg"
          >
            <div className="flex items-start gap-4">
              <span className="text-4xl">{promo.icon}</span>
              <div>
                <h3 className="text-xl font-bold text-primary mb-2">{promo.title}</h3>
                <p className="text-gray-600">{promo.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
