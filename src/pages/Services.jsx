import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Services() {
  const services = [
    {
      icon: '🎮',
      title: 'Gestión de Cabinas',
      description: 'Control total en tiempo real',
      features: [
        'Panel visual con estado de cada PC',
        'Asignación automática de cabinas',
        'Historial de uso por máquina',
        'Alertas de mantenimiento',
        'Estadísticas de rendimiento'
      ],
      color: '#6a5acd'
    },
    {
      icon: '📅',
      title: 'Sistema de Reservas',
      description: 'Automatización completa',
      features: [
        'Reservas desde app móvil',
        'Confirmación instantánea',
        'Calendario inteligente',
        'Recordatorios automáticos',
        'Gestión de cancelaciones'
      ],
      color: '#9c27b0'
    },
    {
      icon: '💳',
      title: 'Pagos Digitales',
      description: 'Cobra sin complicaciones',
      features: [
        'Yape con código QR',
        'Registro automático de pagos',
        'Recibos digitales',
        'Control de ingresos',
        'Reportes financieros'
      ],
      color: '#e91e63'
    },
    {
      icon: '🤖',
      title: 'Chatbot con IA',
      description: 'Atención 24/7 automatizada',
      features: [
        'Powered by Google Gemini',
        'Respuestas instantáneas',
        'Consulta de disponibilidad',
        'Información de precios',
        'Guía de reservas'
      ],
      color: '#00bcd4'
    },
    {
      icon: '📊',
      title: 'Panel Administrativo',
      description: 'Métricas y análisis',
      features: [
        'Dashboard en tiempo real',
        'Gráficos de ingresos',
        'Reportes personalizados',
        'Análisis de clientes',
        'Exportación de datos'
      ],
      color: '#4caf50'
    },
    {
      icon: '⭐',
      title: 'Sistema de Puntos',
      description: 'Fideliza a tus clientes',
      features: [
        'Puntos por cada reserva',
        'Niveles de membresía',
        'Recompensas automáticas',
        'Cupones de descuento',
        'Promociones especiales'
      ],
      color: '#ff9800'
    }
  ];

  const integrations = [
    { name: 'Yape', logo: '/imagenes/logo-yape.jpg', status: 'Integrado' },
    { name: 'Google Gemini AI', logo: '/imagenes/synapbot.png', status: 'Integrado' },
    { name: 'QR Codes', icon: '📱', status: 'Nativo' },
    { name: 'Firebase Auth', icon: '🔐', status: 'Integrado' },
    { name: 'MongoDB', icon: '🍃', status: 'Integrado' },
    { name: 'React Native', icon: '⚛️', status: 'Nativo' }
  ];

  const pricing = [
    {
      name: 'Starter',
      price: 'S/ 99',
      period: '/mes',
      description: 'Para cybercafés pequeños',
      features: [
        'Hasta 10 cabinas',
        'Reservas ilimitadas',
        'Chatbot IA incluido',
        'Panel administrativo',
        'Soporte por email',
        'Actualizaciones automáticas'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: 'S/ 199',
      period: '/mes',
      description: 'Para negocios en crecimiento',
      features: [
        'Hasta 30 cabinas',
        'Todo de Starter +',
        'Sistema de puntos avanzado',
        'Reportes personalizados',
        'Soporte prioritario 24/7',
        'API para integraciones',
        'Multiusuario (3 admins)'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Contactar',
      period: '',
      description: 'Soluciones personalizadas',
      features: [
        'Cabinas ilimitadas',
        'Todo de Professional +',
        'Múltiples sucursales',
        'Integraciones custom',
        'Soporte dedicado',
        'Capacitación del equipo',
        'SLA garantizado'
      ],
      popular: false
    }
  ];

  return (
    <div className="public-page">
      <Header />
      
      <main className="public-content">
        {/* Hero Section */}
        <section className="services-hero">
          <div className="services-hero-content">
            <span className="section-tag">🚀 ALL-IN-ONE SOLUTION</span>
            <h1 className="services-title">
              Todo lo que necesitas en <span className="gradient-text">una sola plataforma</span>
            </h1>
            <p className="services-subtitle">
              Gestión completa de cybercafés con tecnología de vanguardia. 
              Automatiza, controla y optimiza cada aspecto de tu negocio.
            </p>
          </div>
          
          <div className="platform-preview">
            <div className="platform-screens">
              <div className="screen-card">
                <div className="screen-header">
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                </div>
                <div className="screen-content">
                  <div className="screen-icon">💻</div>
                  <p>Panel Web</p>
                </div>
              </div>
              <div className="screen-card">
                <div className="screen-header">
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                </div>
                <div className="screen-content">
                  <div className="screen-icon">📱</div>
                  <p>App Móvil</p>
                </div>
              </div>
              <div className="screen-card">
                <div className="screen-header">
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                  <span className="screen-dot"></span>
                </div>
                <div className="screen-content">
                  <div className="screen-icon">🤖</div>
                  <p>IA Integrada</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="services-grid-section">
          <div className="section-header-center">
            <h2 className="section-title">Servicios Incluidos</h2>
            <p className="section-description">
              Plataforma completa con todas las herramientas que necesitas
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="service-header">
                  <div className="service-icon" style={{ background: service.color }}>
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="service-title">{service.title}</h3>
                    <p className="service-description">{service.description}</p>
                  </div>
                </div>
                <ul className="service-features">
                  {service.features.map((feature, i) => (
                    <li key={i}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Integrations Section */}
        <section className="integrations-section">
          <div className="section-header-center">
            <h2 className="section-title">Integraciones Poderosas</h2>
            <p className="section-description">
              Conectado con las mejores plataformas y tecnologías
            </p>
          </div>

          <div className="integrations-grid">
            {integrations.map((integration, index) => (
              <div key={index} className="integration-card">
                {integration.logo ? (
                  <img src={integration.logo} alt={integration.name} className="integration-logo" />
                ) : (
                  <div className="integration-icon">{integration.icon}</div>
                )}
                <h4 className="integration-name">{integration.name}</h4>
                <span className="integration-status">{integration.status}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="pricing-section">
          <div className="section-header-center">
            <h2 className="section-title">Planes y Precios</h2>
            <p className="section-description">
              Elige el plan perfecto para tu negocio
            </p>
          </div>

          <div className="pricing-grid">
            {pricing.map((plan, index) => (
              <div key={index} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">MÁS POPULAR</div>}
                <div className="pricing-header">
                  <h3 className="plan-name">{plan.name}</h3>
                  <p className="plan-description">{plan.description}</p>
                  <div className="plan-price">
                    <span className="price">{plan.price}</span>
                    <span className="period">{plan.period}</span>
                  </div>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature, i) => (
                    <li key={i}>
                      <span className="feature-check">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link to="/register" className={`btn-plan ${plan.popular ? 'btn-plan-popular' : ''}`}>
                  {plan.price === 'Contactar' ? 'Hablar con Ventas' : 'Comenzar Ahora'}
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para probar SynapLink?</h2>
            <p className="cta-description">
              Comienza gratis hoy mismo. No se requiere tarjeta de crédito.
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Prueba Gratuita 30 Días
              </Link>
              <Link to="/contactanos" className="btn-cta-secondary">
                Agendar Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
