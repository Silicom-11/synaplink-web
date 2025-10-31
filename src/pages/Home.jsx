import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Reserva tu cabina en segundos 🎮
          </h1>
          <p className="hero-description">
            Gestión inteligente para cybercafés. Reservas en tiempo real, pagos por QR y chatbot con IA.
          </p>
          <div className="hero-actions">
            <button className="btn-hero-primary" onClick={() => navigate('/cybercafes')}>
              Ver Cybercafés Disponibles
            </button>
            <button className="btn-hero-secondary" onClick={() => navigate('/mis-reservas')}>
              Mis Reservas
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src="/imagenes/logo.png" alt="SynapLink" className="hero-logo-large" />
          <div className="hero-decoration"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-value">3</div>
          <div className="stat-label">Cybercafés</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💻</div>
          <div className="stat-value">50+</div>
          <div className="stat-label">Cabinas</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-value">Real-time</div>
          <div className="stat-label">Disponibilidad</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🤖</div>
          <div className="stat-value">IA</div>
          <div className="stat-label">SynapBot</div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions-section">
        <h2 className="section-title">Acciones Rápidas</h2>
        <div className="quick-actions-grid">
          <div className="action-card" onClick={() => navigate('/cybercafes')}>
            <div className="action-icon">🔍</div>
            <h3>Buscar Cybercafé</h3>
            <p>Encuentra el cybercafé más cercano</p>
          </div>
          <div className="action-card" onClick={() => navigate('/mis-reservas')}>
            <div className="action-icon">📅</div>
            <h3>Mis Reservas</h3>
            <p>Ver historial y reservas activas</p>
          </div>
          <div className="action-card">
            <div className="action-icon">�</div>
            <h3>Chatear con SynapBot</h3>
            <p>Asistencia con inteligencia artificial</p>
          </div>
          <div className="action-card" onClick={() => navigate('/perfil')}>
            <div className="action-icon">⚙️</div>
            <h3>Configuración</h3>
            <p>Personaliza tu experiencia</p>
          </div>
        </div>
      </section>
    </div>
  );
}
