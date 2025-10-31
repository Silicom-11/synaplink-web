import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../api';

function scrollToId(id) {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export default function Header() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [active, setActive] = useState('#home');
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = useCallback((e, href) => {
    e.preventDefault();
    scrollToId(href);
    setActive(href);
  }, []);

  useEffect(() => {
    // Solo cargar usuario si estamos en páginas protegidas
    const protectedPages = ['/home', '/cybercafes', '/mis-reservas', '/perfil', '/dashboard', '/cybercafe'];
    const isProtected = protectedPages.some(path => location.pathname.startsWith(path));
    
    if (isProtected) {
      async function loadUser() {
        try {
          const res = await api.auth.me();
          setUser(res.user || res);
        } catch (err) {
          console.error('Error loading user:', err);
        }
      }
      loadUser();
    }
  }, [location.pathname]);

  useEffect(() => {
    // Scroll handler para landing page
    const handler = () => {
      const ids = ['#home', '#por-que', '#servicios', '#sobre-nosotros', '#contacto'];
      let current = '#home';
      for (const id of ids) {
        const el = document.querySelector(id);
        if (el) {
          const r = el.getBoundingClientRect();
          if (r.top <= 120 && r.bottom > 160) current = id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      navigate('/login');
    }
  };

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isAppPage = location.pathname.startsWith('/home') || 
                    location.pathname.startsWith('/cybercafe') || 
                    location.pathname.startsWith('/mis-reservas') || 
                    location.pathname.startsWith('/perfil') ||
                    location.pathname.startsWith('/dashboard');

  // No mostrar header en login/register
  if (isAuthPage) {
    return null;
  }

  // Header para la aplicación (después de login)
  if (isAppPage && user) {
    return (
      <header className="app-header">
        <div className="app-header-content">
          <div className="app-brand" onClick={() => navigate('/home')}>
            <img src="/imagenes/logo.png" alt="SynapLink" className="app-logo-small" />
            <span className="app-brand-name">SynapLink</span>
          </div>

          <div className="app-user-menu">
            <button 
              className="user-menu-button"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span className="user-avatar">
                {(user.firstName?.[0] || user.username?.[0] || 'U').toUpperCase()}
              </span>
              <span className="user-name">
                {user.firstName || user.username || user.email}
              </span>
              <span className="dropdown-arrow">▼</span>
            </button>

            {showDropdown && (
              <div className="user-dropdown">
                <button 
                  className="dropdown-item"
                  onClick={() => {
                    setShowDropdown(false);
                    navigate('/perfil');
                  }}
                >
                  👤 Mi Perfil
                </button>
                <button 
                  className="dropdown-item danger"
                  onClick={() => {
                    setShowDropdown(false);
                    handleLogout();
                  }}
                >
                  🚪 Cerrar Sesión
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  // Header original para landing page y páginas públicas
  const navItems = [
    { href: '/', label: 'Inicio', route: true },
    { href: '/por-que-synaplink', label: 'Por qué SynapLink?', route: true },
    { href: '/servicios', label: 'Servicios', route: true },
    { href: '/sobre-nosotros', label: 'Sobre Nosotros', route: true },
    { href: '/contactanos', label: 'Contáctanos', route: true }
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();
    if (item.route) {
      navigate(item.href);
    } else {
      scrollToId(item.href);
      setActive(item.href);
    }
  };

  return (
    <header role="banner" aria-label="Encabezado SynapLink" className="site-header">
      <div className="brand" aria-hidden>
        <div
          className="logo"
          title="SynapLink"
          style={{
            width: 44,
            height: 44,
            borderRadius: 10,
            background: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            boxShadow: '0 8px 26px rgba(106,90,205,0.16)',
          }}
        >
          <img 
            src="/imagenes/logo.png" 
            alt="SynapLink Logo" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '10px'
            }}
          />
        </div>
        <div>
          <div style={{ fontWeight: 800, fontSize: 16 }}>SynapLink</div>
          <div style={{ fontSize: 12, color: 'var(--muted)' }}>Gestión inteligente para cibercafés</div>
        </div>
      </div>
      <nav role="navigation" aria-label="Menú principal" className="main-nav">
        {navItems.map(i => (
          <a
            key={i.href}
            href={i.href}
            onClick={e => handleNavClick(e, i)}
            className={location.pathname === i.href ? 'active' : ''}
          >
            {i.label}
          </a>
        ))}
      </nav>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        {location.pathname === '/dashboard' ? (
          <button className="ghost" onClick={handleLogout}>Cerrar sesión</button>
        ) : (
          <>
            <button className="ghost" onClick={() => navigate('/login')}>Iniciar sesión</button>
            <button className="cta" onClick={() => navigate('/register')}>Pruébalo gratis</button>
          </>
        )}
      </div>
    </header>
  );
}
