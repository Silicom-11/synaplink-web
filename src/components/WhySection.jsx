export default function WhySection() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Reservas en Tiempo Real',
      description: 'Sistema de reservas automáticas que actualiza el estado de las cabinas al instante. Sin esperas, sin confusiones.'
    },
    {
      icon: '💳',
      title: 'Pagos con QR',
      description: 'Paga fácilmente con Yape escaneando el código QR. Rápido, seguro y sin complicaciones.'
    },
    {
      icon: '🎮',
      title: 'Control Total',
      description: 'Gestiona tus reservas, acumula puntos y controla tu sesión desde la app o la web.'
    },
    {
      icon: '🤖',
      title: 'Chatbot IA Inteligente',
      description: 'SynapBot te ayuda 24/7 con tus dudas, usando inteligencia artificial de Gemini.'
    },
    {
      icon: '📊',
      title: 'Estadísticas en Vivo',
      description: 'Visualiza métricas en tiempo real: ocupación, ingresos, usuarios activos y más.'
    },
    {
      icon: '🏆',
      title: 'Sistema de Puntos',
      description: 'Gana puntos por cada reserva y canjéalos por horas gratis y beneficios exclusivos.'
    }
  ];

  return (
    <section id="por-que" className="why-section">
      <div className="container">
        {/* Header */}
        <div className="section-header-center">
          <span className="section-tag">¿POR QUÉ SYNAPLINK?</span>
          <h2 className="section-title">
            Todo lo que necesitas para gestionar tu 
            <span className="text-gradient"> cibercafé o centro de gaming</span>
          </h2>
          <p className="section-subtitle">
            SynapLink es el software integral que permite a propietarios, administradores 
            y jugadores vivir una experiencia conectada: control en la nube, reservas automáticas, 
            estadísticas en tiempo real y un sistema de fidelización inteligente.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="benefit-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="benefit-icon-wrapper">
                <span className="benefit-icon">{benefit.icon}</span>
              </div>
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="section-cta">
          <button className="btn-primary-large" onClick={() => window.location.href = '/register'}>
            Comenzar Ahora - Es Gratis
          </button>
          <button className="btn-secondary-large" onClick={() => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' })}>
            Ver Demo
          </button>
        </div>
      </div>
    </section>
  );
}
