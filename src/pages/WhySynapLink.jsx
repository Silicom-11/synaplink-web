import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function WhySynapLink() {
  const benefits = [
    {
      icon: '⚡',
      title: 'Gestión en Tiempo Real',
      description: 'Controla todas tus cabinas al instante. Ve el estado de ocupación, reservas y disponibilidad desde un solo panel.'
    },
    {
      icon: '🎯',
      title: 'Reservas Automatizadas',
      description: 'Los clientes reservan directamente desde la app. Sin llamadas, sin confusiones. Todo automático y confirmado al instante.'
    },
    {
      icon: '💰',
      title: 'Pagos por QR',
      description: 'Pagos instantáneos con Yape escaneando QR. Seguro, rápido y sin efectivo. Tus clientes pagan y juegan.'
    },
    {
      icon: '🤖',
      title: 'Chatbot Inteligente',
      description: 'SynapBot responde preguntas 24/7 con inteligencia artificial Gemini. Soporte automático para tus clientes.'
    },
    {
      icon: '📊',
      title: 'Estadísticas Avanzadas',
      description: 'Métricas en tiempo real: ingresos, horas jugadas, cabinas más usadas, clientes frecuentes. Todo visualizado.'
    },
    {
      icon: '🎮',
      title: 'Sistema de Puntos',
      description: 'Fideliza clientes con puntos por cada reserva. Canjea por horas gratis, snacks o promociones especiales.'
    },
    {
      icon: '🔒',
      title: 'Seguridad Total',
      description: 'Autenticación con JWT, encriptación de datos y backups automáticos. Tus datos están protegidos.'
    },
    {
      icon: '📱',
      title: 'App Móvil Nativa',
      description: 'Aplicación móvil para Android y iOS. Tus clientes reservan desde cualquier lugar, en cualquier momento.'
    },
    {
      icon: '☁️',
      title: 'En la Nube',
      description: 'Accede desde cualquier dispositivo. No necesitas instalar nada. Solo internet y listo.'
    }
  ];

  const features = [
    {
      title: '🚀 Instalación Rápida',
      description: 'Configura tu cybercafé en menos de 30 minutos. Sin hardware adicional, sin complicaciones técnicas.'
    },
    {
      title: '💻 Dashboard Intuitivo',
      description: 'Interfaz moderna y fácil de usar. Administra todo desde un panel visual con métricas en tiempo real.'
    },
    {
      title: '🔄 Actualizaciones Automáticas',
      description: 'Nuevas funciones cada mes sin costos extra. Siempre tendrás la última tecnología.'
    },
    {
      title: '📞 Soporte 24/7',
      description: 'Equipo de soporte disponible por WhatsApp, email y chat. Respondemos en menos de 2 horas.'
    }
  ];

  return (
    <div className="public-page">
      <Header />
      
      <main className="public-content">
        {/* Hero Section */}
        <section className="why-hero">
          <div className="why-hero-content">
            <span className="section-tag">💡 DESCUBRE LAS VENTAJAS</span>
            <h1 className="why-title">
              ¿Por qué elegir <span className="gradient-text">SynapLink</span>?
            </h1>
            <p className="why-subtitle">
              La plataforma todo-en-uno que revoluciona la gestión de cybercafés. 
              Más tiempo para crecer, menos tiempo en administración.
            </p>
            <div className="why-hero-stats">
              <div className="hero-stat">
                <span className="stat-number">40%</span>
                <span className="stat-label">Reducción en tiempo de espera</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">3x</span>
                <span className="stat-label">Más reservas automatizadas</span>
              </div>
              <div className="hero-stat">
                <span className="stat-number">100%</span>
                <span className="stat-label">En la nube, sin instalación</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="benefits-section">
          <div className="section-header-center">
            <h2 className="section-title">Beneficios que Transforman tu Negocio</h2>
            <p className="section-description">
              Todo lo que necesitas para gestionar tu cybercafé de forma profesional
            </p>
          </div>
          
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="features-highlight">
          <div className="section-header-center">
            <h2 className="section-title">Características Premium</h2>
            <p className="section-description">
              Herramientas profesionales al alcance de tu mano
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Comparison Section */}
        <section className="comparison-section">
          <div className="section-header-center">
            <h2 className="section-title">Antes vs Después de SynapLink</h2>
            <p className="section-description">
              Mira cómo SynapLink transforma la gestión de tu cybercafé
            </p>
          </div>

          <div className="comparison-grid">
            <div className="comparison-col before">
              <div className="comparison-header">
                <span className="comparison-icon">❌</span>
                <h3>Sin SynapLink</h3>
              </div>
              <ul className="comparison-list">
                <li>📋 Reservas en papel o cuaderno</li>
                <li>☎️ Llamadas constantes para consultar</li>
                <li>💸 Pagos en efectivo sin registro</li>
                <li>🤷 Sin estadísticas de negocio</li>
                <li>😫 Clientes esperando en la puerta</li>
                <li>📊 Control manual de ingresos</li>
                <li>❓ Sin sistema de fidelización</li>
              </ul>
            </div>

            <div className="comparison-col after">
              <div className="comparison-header">
                <span className="comparison-icon">✅</span>
                <h3>Con SynapLink</h3>
              </div>
              <ul className="comparison-list">
                <li>📱 Reservas automáticas desde la app</li>
                <li>🤖 Chatbot responde 24/7</li>
                <li>💳 Pagos digitales con QR (Yape)</li>
                <li>📊 Dashboard con métricas en vivo</li>
                <li>⚡ Clientes llegan directo a jugar</li>
                <li>💰 Control total de ingresos</li>
                <li>🎁 Sistema de puntos automático</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">¿Listo para revolucionar tu cybercafé?</h2>
            <p className="cta-description">
              Únete a los cybercafés que ya están usando SynapLink
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Comenzar Gratis
              </Link>
              <Link to="/contactanos" className="btn-cta-secondary">
                Solicitar Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
