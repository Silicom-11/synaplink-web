import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function About() {
  const testimonials = [
    {
      name: 'Carlos Mendoza',
      role: 'Administrador',
      business: 'Silicom Lan Center',
      image: '/imagenes/silicom-lan.png',
      quote: 'Desde que implementamos SynapLink, redujimos el tiempo de espera en un 40% y aumentamos nuestras reservas en un 300%. Los clientes ahora reservan desde sus casas y llegan directo a jugar.',
      stats: {
        reduction: '40%',
        label: 'Reducción en tiempo de espera'
      }
    },
    {
      name: 'María González',
      role: 'Gerente General',
      business: 'Linux Cyber',
      image: '/imagenes/linux-cyber.png',
      quote: 'El chatbot con IA resolvió nuestro problema de atención 24/7. Ahora los clientes obtienen respuestas instantáneas sin necesidad de llamarnos. El sistema de puntos también mejoró la fidelización.',
      stats: {
        reduction: '85%',
        label: 'Menos llamadas de consulta'
      }
    },
    {
      name: 'Roberto Silva',
      role: 'Propietario',
      business: 'Shadow Lan',
      image: '/imagenes/shadow-lan.png',
      quote: 'La plataforma es increíblemente fácil de usar. En 20 minutos ya teníamos todo configurado. El panel administrativo nos da insights que antes eran imposibles de obtener.',
      stats: {
        reduction: '20min',
        label: 'Tiempo de configuración'
      }
    }
  ];

  const team = [
    {
      name: 'Marc Aquino',
      role: 'Fundador & CEO',
      description: 'Desarrollador Full Stack con pasión por crear soluciones que transforman negocios.',
      icon: '👨‍💻'
    },
    {
      name: 'Equipo de Desarrollo',
      role: 'Engineering Team',
      description: 'Expertos en React, Node.js, IA y Cloud Computing trabajando en las mejores funcionalidades.',
      icon: '🚀'
    },
    {
      name: 'Soporte 24/7',
      role: 'Customer Success',
      description: 'Equipo dedicado a asegurar que tu experiencia con SynapLink sea excepcional.',
      icon: '💬'
    }
  ];

  const timeline = [
    {
      year: '2024',
      title: 'Lanzamiento Beta',
      description: 'Primera versión de SynapLink lanzada con funcionalidades básicas de reservas.'
    },
    {
      year: '2024',
      title: 'Integración con IA',
      description: 'SynapBot con Google Gemini implementado, revolucionando el soporte al cliente.'
    },
    {
      year: '2024',
      title: 'App Móvil',
      description: 'Aplicación nativa para Android e iOS lanzada con más de 1000 descargas.'
    },
    {
      year: '2025',
      title: 'Multi-Sucursales',
      description: 'Nueva funcionalidad para gestionar múltiples cybercafés desde un solo panel.'
    }
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Innovación',
      description: 'Siempre buscamos la mejor tecnología para mejorar tu negocio.'
    },
    {
      icon: '💡',
      title: 'Simplicidad',
      description: 'Herramientas poderosas pero fáciles de usar para cualquier persona.'
    },
    {
      icon: '🤝',
      title: 'Compromiso',
      description: 'Tu éxito es nuestro éxito. Estamos contigo en cada paso.'
    },
    {
      icon: '⚡',
      title: 'Velocidad',
      description: 'Respuestas rápidas, actualizaciones constantes, soporte inmediato.'
    }
  ];

  return (
    <div className="public-page">
      <Header />
      
      <main className="public-content">
        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-content">
            <span className="section-tag">🚀 NUESTRA HISTORIA</span>
            <h1 className="about-title">
              Transformando la gestión de <span className="gradient-text">cybercafés en Perú</span>
            </h1>
            <p className="about-subtitle">
              Creamos SynapLink con una misión clara: hacer que gestionar un cybercafé 
              sea tan simple como jugar tu videojuego favorito.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="mission-section">
          <div className="mission-grid">
            <div className="mission-card">
              <div className="mission-icon">🎯</div>
              <h3>Nuestra Misión</h3>
              <p>
                Empoderar a los dueños de cybercafés con tecnología de vanguardia que 
                automatiza procesos, mejora la experiencia del cliente y maximiza ingresos. 
                Queremos que cada cybercafé en Perú tenga acceso a herramientas profesionales.
              </p>
            </div>
            <div className="mission-card">
              <div className="mission-icon">🌟</div>
              <h3>Nuestra Visión</h3>
              <p>
                Ser la plataforma líder en gestión de cybercafés en Latinoamérica, 
                estableciendo el estándar de excelencia en automatización, inteligencia 
                artificial y experiencia de usuario en la industria del gaming.
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section className="testimonials-section">
          <div className="section-header-center">
            <h2 className="section-title">Casos de Éxito</h2>
            <p className="section-description">
              Cybercafés que ya están triunfando con SynapLink
            </p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className="testimonial-header">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.business}
                    className="testimonial-image"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-business">{testimonial.business}</p>
                  </div>
                </div>
                <blockquote className="testimonial-quote">
                  "{testimonial.quote}"
                </blockquote>
                <div className="testimonial-stats">
                  <span className="stat-value">{testimonial.stats.reduction}</span>
                  <span className="stat-label">{testimonial.stats.label}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-header-center">
            <h2 className="section-title">Nuestro Equipo</h2>
            <p className="section-description">
              Apasionados por la tecnología y el éxito de tu negocio
            </p>
          </div>

          <div className="team-grid">
            {team.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-avatar">{member.icon}</div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-description">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline-section">
          <div className="section-header-center">
            <h2 className="section-title">Nuestro Camino</h2>
            <p className="section-description">
              De una idea a la plataforma líder en gestión de cybercafés
            </p>
          </div>

          <div className="timeline">
            {timeline.map((milestone, index) => (
              <div key={index} className="timeline-item" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <span className="timeline-year">{milestone.year}</span>
                  <h4 className="timeline-title">{milestone.title}</h4>
                  <p className="timeline-description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <div className="section-header-center">
            <h2 className="section-title">Nuestros Valores</h2>
            <p className="section-description">
              Los principios que guían cada decisión que tomamos
            </p>
          </div>

          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-banner">
          <div className="stats-banner-content">
            <h2 className="stats-title">SynapLink en Números</h2>
            <div className="stats-row">
              <div className="stat-item">
                <span className="stat-number">1000+</span>
                <span className="stat-label">Reservas Realizadas</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">15+</span>
                <span className="stat-label">Cybercafés Usando SynapLink</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime Garantizado</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Soporte Disponible</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">¿Quieres ser parte de nuestra historia?</h2>
            <p className="cta-description">
              Únete a los cybercafés que están transformando su negocio con SynapLink
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Comenzar Ahora
              </Link>
              <Link to="/contactanos" className="btn-cta-secondary">
                Contáctanos
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
