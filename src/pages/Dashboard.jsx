import { useEffect, useState } from 'react';
import api from '../api';

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [cabinas, setCabinas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [radioValue, setRadioValue] = useState('opt1');
  const [checks, setChecks] = useState({ a: false, b: true });

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const me = await api.auth.me();
        if (!mounted) return;
        setUser(me.user || me);
        const c = await api.reservas.getCabinas();
        if (!mounted) return;
        // API devuelve { success: true, cabinas: [...] } o solo el array
        const lista = Array.isArray(c) ? c : (c.cabinas || []);
        setCabinas(lista);
      } catch (err) {
        // Si el servidor responde 401, redirigimos al login
        if (err && err.status === 401) {
          // navegar a /login después de limpiar estado
          setError('No autenticado, redirigiendo al login...');
          setTimeout(() => window.location.replace('/login'), 800);
          return;
        }
        console.error(err);
        setError('No se pudo cargar los datos. ¿Estás autenticado?');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, []);

  async function handleReserve(cabinaId) {
    if (!user || !user._id) {
      alert('Usuario no identificado. Por favor inicia sesión.');
      return;
    }

    try {
      const now = new Date();
      const later = new Date(now.getTime() + 60 * 60 * 1000); // +1 hora por defecto
      const payload = {
        userId: user._id,
        cabinas: [cabinaId],
        fechaInicio: now.toISOString(),
        fechaFin: later.toISOString(),
        precio: 'S/1'
      };

      const res = await api.reservas.reservarTemporal(payload);
      if (res && res.success) {
        alert('Reserva temporal enviada');
        // refrescar cabinas
        try {
          const c = await api.reservas.getCabinas();
          const lista = Array.isArray(c) ? c : (c.cabinas || []);
          setCabinas(lista);
        } catch (err) {
          console.error('Error al refrescar cabinas:', err);
        }
      } else {
        const serverMsg = res && res.message;
        alert('Error al reservar: ' + (serverMsg || 'respuesta inesperada'));
      }
    } catch (err) {
      console.error(err);
      const serverMsg = err && err.body && err.body.error;
      alert('Error al reservar: ' + (serverMsg || err.message || '')); 
    }
  }

  if (loading) return <div className="page-container">Cargando...</div>;
  if (error) return <div className="page-container error">{error}</div>;

  return (
    <div className="page-container">
      <h2>Bienvenido{user ? `, ${user.name || user.email}` : ''}</h2>

      {/* --- Demo: Type radio, checkbox (academic) --- */}
      <section style={{ marginBottom: 20 }}>
        <h4>Type radio, checkbox</h4>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <div>
            <label><input type="radio" name="demoRadio" value="opt1" checked={radioValue==='opt1'} onChange={() => setRadioValue('opt1')} /> Opción 1</label>
            <br />
            <label><input type="radio" name="demoRadio" value="opt2" checked={radioValue==='opt2'} onChange={() => setRadioValue('opt2')} /> Opción 2</label>
          </div>

          <div>
            <label><input type="checkbox" checked={checks.a} onChange={e => setChecks(s => ({ ...s, a: e.target.checked }))} /> Silicom Lan Center</label>
            <br />
            <label><input type="checkbox" checked={checks.b} onChange={e => setChecks(s => ({ ...s, b: e.target.checked }))} /> Linux CyberCafé</label>
          </div>

          <div style={{ color: 'var(--muted)', fontSize: 14 }}>
            <div>Radio: {radioValue}</div>
            <div>Checks: A={checks.a ? '✓' : '✗'} B={checks.b ? '✓' : '✗'}</div>
          </div>
        </div>
      </section>

      <section>
        <h3>Cabinas disponibles</h3>
        {cabinas.length === 0 && <p>No hay cabinas disponibles.</p>}
        <div className="cabina-grid">
          {cabinas.map(c => (
            <div className="cabina-card" key={c._id || c.numero}>
              <div className="cabina-title">{`Cabina ${c.numero ?? (c._id || '')}`}</div>
              <div className="cabina-meta">{c.descripcion || ''}</div>
              <div className={"badge " + (c.estado === 'Libre' ? 'free' : c.estado === 'Reservado' ? 'reserved' : 'busy')}>{c.estado}</div>
              <div className="cabina-actions">
                <button className="ghost" onClick={() => handleReserve(c.numero)}>Reservar</button>
                <button className="btn-ghost">Detalles</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
