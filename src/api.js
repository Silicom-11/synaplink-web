// Vite exposes env vars via import.meta.env. Support VITE_API_URL or legacy REACT_APP_API_URL.
const BASE_URL = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:3000';

export async function fetchWithCredentials(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      credentials: 'include', // importante para cookies httpOnly
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });

    const contentType = res.headers.get('content-type') || '';
    let body = null;
    if (contentType.includes('application/json')) body = await res.json();
    else body = await res.text();

    if (!res.ok) {
      const error = new Error(body?.message || `HTTP error ${res.status}`);
      error.status = res.status;
      error.body = body;
      throw error;
    }
    return body;
  } catch (err) {
    // Si es un error de red (Failed to fetch)
    if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
      const networkError = new Error('Failed to fetch');
      networkError.isNetworkError = true;
      throw networkError;
    }
    // Re-lanzar otros errores
    throw err;
  }
}

export const auth = {
  register: (data) => fetchWithCredentials('/api/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => fetchWithCredentials('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => fetchWithCredentials('/api/auth/me', { method: 'GET' }),
  logout: () => fetchWithCredentials('/api/auth/logout', { method: 'POST' }),
};

export const reservas = {
  getCabinas: () => fetchWithCredentials('/api/reservas/cabinas', { method: 'GET' }),
  cabinasDisponibles: () => fetchWithCredentials('/api/reservas/cabinas-disponibles', { method: 'GET' }),
  reservarTemporal: (data) => fetchWithCredentials('/api/reservas/reservar-temporal', { method: 'POST', body: JSON.stringify(data) }),
  crearReserva: (data) => fetchWithCredentials('/api/reservas/crear-reserva', { method: 'POST', body: JSON.stringify(data) }),
  misReservas: (userId) => fetchWithCredentials(`/api/reservas/mis-reservas/${userId}`, { method: 'GET' }),
};

export const chatbot = {
  sendMessage: (message) => fetchWithCredentials('/api/chatbot/message', { method: 'POST', body: JSON.stringify({ message }) }),
};

const api = { auth, reservas, chatbot };
export default api;
