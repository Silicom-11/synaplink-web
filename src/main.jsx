import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import App from './App.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Cybercafes from './pages/Cybercafes.jsx';
import CybercafeDetail from './pages/CybercafeDetail.jsx';
import MisReservas from './pages/MisReservas.jsx';
import Perfil from './pages/Perfil.jsx';
import Dashboard from './pages/Dashboard.jsx';
import WhySynapLink from './pages/WhySynapLink.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Header from './components/Header.jsx';
import AppLayout from './components/AppLayout.jsx';

const rootEl = document.getElementById('root');
if (!rootEl) {
  console.error('[SynapLink] #root no encontrado');
} else {
  // debug helper: visit ?debugRender=1 to force-render a visible test box
  const params = new URLSearchParams(window.location.search);
  const debugRender = params.get('debugRender') === '1';

  if (debugRender) {
    createRoot(rootEl).render(
      <div style={{height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg,#06040e,#03030a)'}}>
        <div style={{padding: 24, borderRadius: 12, background: '#2b0f4a', color: '#fff', boxShadow: '0 10px 30px rgba(0,0,0,0.6)'}}>
          <h2 style={{margin: 0}}>DEBUG: React montado correctamente</h2>
          <p style={{margin: '8px 0 0 0'}}>Si ves este mensaje, React y Vite funcionan; el problema está dentro de <code>App</code> o sus componentes.</p>
        </div>
      </div>
    );
  } else {
    createRoot(rootEl).render(
      <StrictMode>
        <BrowserRouter>
          <Routes>
            {/* Landing page (ya tiene su propio Header dentro) */}
            <Route path="/" element={<App />} />
            
            {/* Public pages (con Header) */}
            <Route path="/por-que-synaplink" element={<WhySynapLink />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/sobre-nosotros" element={<About />} />
            <Route path="/contactanos" element={<Contact />} />
            
            {/* Auth pages (sin Header) */}
            <Route path="/login" element={<><Header /><Login /></>} />
            <Route path="/register" element={<><Header /><Register /></>} />
            
            {/* App pages (con Header) */}
            <Route path="/home" element={<AppLayout><Home /></AppLayout>} />
            <Route path="/cybercafes" element={<AppLayout><Cybercafes /></AppLayout>} />
            <Route path="/cybercafe/:id" element={<AppLayout><CybercafeDetail /></AppLayout>} />
            <Route path="/mis-reservas" element={<AppLayout><MisReservas /></AppLayout>} />
            <Route path="/perfil" element={<AppLayout><Perfil /></AppLayout>} />
            <Route path="/dashboard" element={<AppLayout><Dashboard /></AppLayout>} />
          </Routes>
        </BrowserRouter>
      </StrictMode>
    );
  }
}

