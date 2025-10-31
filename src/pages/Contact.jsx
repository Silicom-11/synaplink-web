import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: '❌ Por favor completa todos los campos obligatorios' });
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({ type: 'error', message: '❌ Por favor ingresa un email válido' });
      return;
    }

    // TODO: Enviar al backend
    setStatus({ type: 'loading', message: '📤 Enviando mensaje...' });
    
    // Simulación de envío
    setTimeout(() => {
      setStatus({ 
        type: 'success', 
        message: '✅ ¡Mensaje enviado! Te responderemos en menos de 24 horas.' 
      });
      setFormData({ name: '', email: '', phone: '', businessType: '', message: '' });
    }, 1500);
  };

  const faqs = [
    {
      question: '¿Cuánto tiempo toma implementar SynapLink?',
      answer: 'La configuración inicial toma menos de 30 minutos. Nuestro equipo te guía paso a paso para que puedas empezar a usar la plataforma el mismo día.'
    },
    {
      question: '¿Necesito conocimientos técnicos?',
      answer: 'No. SynapLink está diseñado para ser extremadamente intuitivo. Si sabes usar WhatsApp, sabes usar SynapLink. Además, ofrecemos capacitación gratuita.'
    },
    {
      question: '¿Qué métodos de pago aceptan?',
      answer: 'Aceptamos Yape, transferencias bancarias y tarjetas de crédito/débito. Todos los pagos son 100% seguros.'
    },
    {
      question: '¿Hay período de prueba?',
      answer: 'Sí, ofrecemos 30 días de prueba gratuita sin necesidad de tarjeta de crédito. Prueba todas las funcionalidades sin compromiso.'
    },
    {
      question: '¿Puedo cancelar en cualquier momento?',
      answer: 'Absolutamente. No hay contratos largos ni penalidades. Puedes cancelar tu suscripción cuando quieras desde el panel.'
    },
    {
      question: '¿Ofrecen soporte técnico?',
      answer: 'Sí, soporte 24/7 por WhatsApp, email y chat en vivo. Tiempo de respuesta promedio: menos de 2 horas.'
    }
  ];

  const contactMethods = [
    {
      icon: '📧',
      title: 'Email',
      value: 'soporte@synaplink.com',
      link: 'mailto:soporte@synaplink.com'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      value: '+51 987 654 321',
      link: 'https://wa.me/51987654321'
    },
    {
      icon: '💬',
      title: 'Chat en Vivo',
      value: 'Disponible 24/7',
      link: '#'
    }
  ];

  const socialMedia = [
    {
      icon: '📘',
      name: 'Facebook',
      link: 'https://facebook.com/synaplink',
      handle: '@synaplink'
    },
    {
      icon: '📸',
      name: 'Instagram',
      link: 'https://instagram.com/synaplink',
      handle: '@synaplink'
    },
    {
      icon: '🐦',
      name: 'Twitter',
      link: 'https://twitter.com/synaplink',
      handle: '@synaplink'
    },
    {
      icon: '💼',
      name: 'LinkedIn',
      link: 'https://linkedin.com/company/synaplink',
      handle: 'SynapLink'
    }
  ];

  return (
    <div className="public-page">
      <Header />
      
      <main className="public-content">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-content">
            <span className="section-tag">💬 ESTAMOS AQUÍ PARA TI</span>
            <h1 className="contact-title">
              ¿Tienes preguntas? <span className="gradient-text">Hablemos</span>
            </h1>
            <p className="contact-subtitle">
              Nuestro equipo está listo para ayudarte a transformar tu cybercafé. 
              Respuestas en menos de 24 horas garantizado.
            </p>
          </div>
        </section>

        {/* Contact Form + Info */}
        <section className="contact-main-section">
          <div className="contact-container">
            {/* Form */}
            <div className="contact-form-wrapper">
              <div className="form-header">
                <h2>Envíanos un mensaje</h2>
                <p>Completa el formulario y te contactaremos pronto</p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label htmlFor="name">Nombre completo *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="tu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+51 987 654 321"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessType">Tipo de negocio</label>
                  <select
                    id="businessType"
                    name="businessType"
                    value={formData.businessType}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="cybercafe">Cybercafé</option>
                    <option value="gaming">Centro de Gaming</option>
                    <option value="lan">Lan Center</option>
                    <option value="esports">Centro eSports</option>
                    <option value="other">Otro</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Mensaje *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos cómo podemos ayudarte..."
                    rows="5"
                    required
                  ></textarea>
                </div>

                {status.message && (
                  <div className={`form-status ${status.type}`}>
                    {status.message}
                  </div>
                )}

                <button type="submit" className="btn-submit-form">
                  Enviar Mensaje
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="contact-info-wrapper">
              <div className="contact-info-card">
                <h3>Información de Contacto</h3>
                <div className="contact-methods">
                  {contactMethods.map((method, index) => (
                    <a 
                      key={index} 
                      href={method.link}
                      className="contact-method"
                      target={method.link.startsWith('http') ? '_blank' : undefined}
                      rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      <span className="method-icon">{method.icon}</span>
                      <div className="method-info">
                        <p className="method-title">{method.title}</p>
                        <p className="method-value">{method.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-info-card">
                <h3>Síguenos en Redes</h3>
                <div className="social-links">
                  {socialMedia.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.link}
                      className="social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="social-icon">{social.icon}</span>
                      <div className="social-info">
                        <p className="social-name">{social.name}</p>
                        <p className="social-handle">{social.handle}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="contact-info-card">
                <h3>Horario de Atención</h3>
                <div className="office-hours">
                  <div className="hours-item">
                    <span className="hours-icon">🕐</span>
                    <div>
                      <p className="hours-day">Lunes a Viernes</p>
                      <p className="hours-time">9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                  <div className="hours-item">
                    <span className="hours-icon">📅</span>
                    <div>
                      <p className="hours-day">Sábados</p>
                      <p className="hours-time">10:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                  <div className="hours-item">
                    <span className="hours-icon">🤖</span>
                    <div>
                      <p className="hours-day">Chatbot IA</p>
                      <p className="hours-time">24/7 Disponible</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="faqs-section">
          <div className="section-header-center">
            <h2 className="section-title">Preguntas Frecuentes</h2>
            <p className="section-description">
              Respuestas rápidas a las preguntas más comunes
            </p>
          </div>

          <div className="faqs-grid">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-card">
                <h4 className="faq-question">❓ {faq.question}</h4>
                <p className="faq-answer">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Map Section (placeholder) */}
        <section className="map-section">
          <div className="section-header-center">
            <h2 className="section-title">Nuestra Ubicación</h2>
            <p className="section-description">
              Encuéntranos en Lima, Perú
            </p>
          </div>

          <div className="map-placeholder">
            <div className="map-icon">📍</div>
            <h3>Lima, Perú</h3>
            <p>Av. Tecnología 123, San Isidro</p>
            <p className="map-note">
              Trabajamos 100% en la nube, pero estamos disponibles para reuniones presenciales
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">¿Prefieres probarlo primero?</h2>
            <p className="cta-description">
              Comienza tu prueba gratuita de 30 días sin necesidad de tarjeta
            </p>
            <div className="cta-buttons">
              <Link to="/register" className="btn-cta-primary">
                Probar Gratis 30 Días
              </Link>
              <Link to="/servicios" className="btn-cta-secondary">
                Ver Planes y Precios
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
