import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import api from '../api';

export default function AppLayout({ children }) {
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: '¡Hola! Soy SynapBot 🤖 ¿En qué puedo ayudarte sobre las reservas de cabinas?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await api.auth.me();
        setUser(res.user || res);
      } catch (err) {
        console.error('Error loading user:', err);
        if (err && err.status === 401) {
          navigate('/login');
        }
      }
    }
    loadUser();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await api.auth.logout();
      navigate('/login');
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
      navigate('/login');
    }
  };

  // Auto-scroll para el chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Función para enviar mensaje al chatbot (a través del backend)
  const sendToAI = async (text) => {
    setLoading(true);
    
    // Agregar mensaje del usuario inmediatamente
    setMessages((prev) => [...prev, { from: 'user', text }]);
    setInput('');

    try {
      const response = await api.chatbot.sendMessage(text);
      
      // Agregar respuesta del bot
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: response.reply || 'Lo siento, no entendí 😕' },
      ]);
    } catch (error) {
      console.error('Error al usar chatbot:', error);
      setMessages((prev) => [
        ...prev,
        { from: 'bot', text: '❌ Error al conectar con el chatbot. Por favor intenta de nuevo.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = () => {
    if (!input.trim()) return;
    sendToAI(input.trim());
  };

  const navItems = [
    { path: '/home', icon: '🏠', label: 'Inicio' },
    { path: '/cybercafes', icon: '🎮', label: 'Cybercafés' },
    { path: '/mis-reservas', icon: '📋', label: 'Mis Reservas' },
    { path: '/perfil', icon: '👤', label: 'Mi Perfil' },
  ];

  if (!user) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="app-layout">
      {/* Sidebar */}
      <aside className={`app-sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <img src="/imagenes/logo.png" alt="SynapLink" className="sidebar-logo" />
          {!sidebarCollapsed && <span className="sidebar-brand">SynapLink</span>}
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="sidebar-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button 
          className="sidebar-collapse-btn"
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>
      </aside>

      {/* Main Content Area */}
      <div className="app-main">
        {/* Top Bar */}
        <header className="app-topbar">
          <div className="topbar-left">
            <h1 className="topbar-title">
              {location.pathname === '/home' && 'Inicio'}
              {location.pathname === '/cybercafes' && 'Cybercafés'}
              {location.pathname === '/mis-reservas' && 'Mis Reservas'}
              {location.pathname === '/perfil' && 'Mi Perfil'}
            </h1>
          </div>

          <div className="topbar-right">
            {/* Search */}
            <div className="topbar-search">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Buscar cybercafés, cabinas..." 
                className="search-input"
              />
            </div>

            {/* Notifications */}
            <button className="topbar-icon-btn">
              <span className="icon">🔔</span>
              <span className="badge">3</span>
            </button>

            {/* Profile Menu */}
            <div className="topbar-profile">
              <button 
                className="profile-btn"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <div className="profile-avatar">
                  {(user.firstName?.[0] || user.username?.[0] || 'U').toUpperCase()}
                </div>
                <div className="profile-info">
                  <span className="profile-name">{user.firstName || user.username}</span>
                  <span className="profile-role">Usuario</span>
                </div>
                <span className="profile-arrow">▼</span>
              </button>

              {showProfileMenu && (
                <div className="profile-dropdown">
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/perfil');
                    }}
                  >
                    <span className="item-icon">👤</span>
                    <span>Mi Perfil</span>
                  </button>
                  <button 
                    className="dropdown-item"
                    onClick={() => {
                      setShowProfileMenu(false);
                      navigate('/configuracion');
                    }}
                  >
                    <span className="item-icon">⚙️</span>
                    <span>Configuración</span>
                  </button>
                  <div className="dropdown-divider"></div>
                  <button 
                    className="dropdown-item danger"
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleLogout();
                    }}
                  >
                    <span className="item-icon">🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="app-content">
          {children}
        </main>
      </div>

      {/* Floating Chatbot (Messenger style) */}
      <div className={`chatbot-widget ${showChatbot ? 'open' : ''}`}>
        {!showChatbot ? (
          <button 
            className="chatbot-trigger"
            onClick={() => setShowChatbot(true)}
          >
            <img src="/imagenes/synapbot.gif" alt="SynapBot" className="chatbot-icon" />
            <span className="chatbot-pulse"></span>
          </button>
        ) : (
          <div className="chatbot-window">
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <img src="/imagenes/synapbot.gif" alt="SynapBot" className="chatbot-avatar" />
                <div>
                  <h4>SynapBot</h4>
                  <span className="chatbot-status">● En línea</span>
                </div>
              </div>
              <button 
                className="chatbot-close"
                onClick={() => setShowChatbot(false)}
              >
                ✕
              </button>
            </div>
            <div className="chatbot-body">
              {messages.map((msg, index) => (
                <div key={index} className={`chatbot-message ${msg.from}`}>
                  {msg.from === 'bot' && (
                    <div className="message-avatar">
                      <img src="/imagenes/synapbot.gif" alt="SynapBot" />
                    </div>
                  )}
                  <div className="message-bubble">
                    {msg.text}
                  </div>
                  {msg.from === 'user' && (
                    <div className="message-avatar user-avatar">
                      <span>{user?.firstName?.[0] || 'U'}</span>
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <div className="chatbot-message bot">
                  <div className="message-avatar">
                    <img src="/imagenes/synapbot.gif" alt="SynapBot" />
                  </div>
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="chatbot-footer">
              <input 
                type="text" 
                placeholder="Escribe tu mensaje..." 
                className="chatbot-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !loading && input.trim() && handleSendMessage()}
                disabled={loading}
              />
              <button 
                className="chatbot-send-btn"
                onClick={handleSendMessage}
                disabled={loading || !input.trim()}
              >
                📤
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
