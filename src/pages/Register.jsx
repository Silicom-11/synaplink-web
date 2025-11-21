import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPasswordReqs, setShowPasswordReqs] = useState(false);
  const navigate = useNavigate();

  const getPasswordValidation = (pass) => {
    return {
      hasUppercase: /[A-Z]/.test(pass),
      hasNumber: /\d/.test(pass),
      hasSpecialChar: /[^A-Za-z0-9]/.test(pass),
      hasMinLength: pass.length >= 8
    };
  };

  const isPasswordValid = (pass) => {
    const v = getPasswordValidation(pass);
    return v.hasUppercase && v.hasNumber && v.hasSpecialChar && v.hasMinLength;
  };

  const isOver13 = (dateString) => {
    const birth = new Date(dateString);
    const today = new Date();
    const age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    return age > 13 || (age === 13 && m >= 0);
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!username || !firstName || !lastName || !gender || !birthDate || !email || !password || !repeatPassword) {
      setError('Completa todos los campos obligatorios');
      return;
    }

    if (!isOver13(birthDate)) {
      setError('Debes tener al menos 13 años');
      return;
    }

    if (password !== repeatPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Formato de email inválido');
      return;
    }

    if (!isPasswordValid(password)) {
      setError('La contraseña debe tener: mayúscula, número, carácter especial y mínimo 8 caracteres');
      return;
    }

    setError(null);
    setLoading(true);

    const payload = {
      username,
      firstName,
      lastName,
      gender,
      birthDate,
      email,
      password,
    };

    try {
      const res = await api.auth.register(payload);
      if (res && res.user) {
        navigate('/home');
      } else {
        setError('Respuesta inesperada del servidor');
      }
    } catch (err) {
      console.error(err);
      const serverMsg = err && err.body && err.body.message;
      setError(serverMsg || err.message || 'Error al registrar');
    } finally {
      setLoading(false);
    }
  }

  const validation = getPasswordValidation(password);

  return (
    <div className="auth-container">
      <div className="auth-box auth-box-large">
        <button 
          className="btn-back-home" 
          onClick={() => navigate('/')}
          type="button"
        >
          ← Volver al inicio
        </button>
        
        <div className="auth-logo">
          <img src="/imagenes/logo.png" alt="SynapLink" className="auth-logo-img" />
          <h1 className="auth-title">🚀 ¡Bienvenido al futuro!</h1>
          <p className="auth-subtitle">Crea tu cuenta y empieza tu viaje con Synapbot</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">👤</span>
            <input
              className="input-field"
              placeholder="Nombre de usuario"
              value={username}
              onChange={e => setUsername(e.target.value)}
              type="text"
              required
              disabled={loading}
            />
          </div>

          <div className="form-row-group">
            <div className="input-group input-half">
              <span className="input-icon">📝</span>
              <input
                className="input-field"
                placeholder="Nombres"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                type="text"
                required
                disabled={loading}
              />
            </div>

            <div className="input-group input-half">
              <span className="input-icon">📝</span>
              <input
                className="input-field"
                placeholder="Apellidos"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                type="text"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="gender-container">
            <button
              type="button"
              className={`gender-btn ${gender === 'Masculino' ? 'active' : ''}`}
              onClick={() => setGender('Masculino')}
              disabled={loading}
            >
              👨 Masculino
            </button>
            <button
              type="button"
              className={`gender-btn ${gender === 'Femenino' ? 'active' : ''}`}
              onClick={() => setGender('Femenino')}
              disabled={loading}
            >
              👩 Femenino
            </button>
          </div>

          <div className="input-group">
            <span className="input-icon">📅</span>
            <input
              className="input-field"
              placeholder="Fecha de nacimiento"
              value={birthDate}
              onChange={e => setBirthDate(e.target.value)}
              type="date"
              max={new Date().toISOString().split('T')[0]}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">📧</span>
            <input
              className="input-field"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              autoCapitalize="none"
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              className="input-field"
              placeholder="Contraseña"
              value={password}
              onChange={e => { setPassword(e.target.value); setShowPasswordReqs(e.target.value.length > 0); }}
              type="password"
              required
              disabled={loading}
            />
          </div>

          {showPasswordReqs && (
            <div className="password-requirements">
              <p className="req-title">Tu contraseña debe contener:</p>
              <div className="req-item">
                <span className={validation.hasMinLength ? 'req-check' : 'req-cross'}>
                  {validation.hasMinLength ? '✅' : '❌'}
                </span>
                <span>Mínimo 8 caracteres</span>
              </div>
              <div className="req-item">
                <span className={validation.hasUppercase ? 'req-check' : 'req-cross'}>
                  {validation.hasUppercase ? '✅' : '❌'}
                </span>
                <span>Al menos una letra mayúscula</span>
              </div>
              <div className="req-item">
                <span className={validation.hasNumber ? 'req-check' : 'req-cross'}>
                  {validation.hasNumber ? '✅' : '❌'}
                </span>
                <span>Al menos un número</span>
              </div>
              <div className="req-item">
                <span className={validation.hasSpecialChar ? 'req-check' : 'req-cross'}>
                  {validation.hasSpecialChar ? '✅' : '❌'}
                </span>
                <span>Al menos un carácter especial (!@#$%)</span>
              </div>
            </div>
          )}

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              className="input-field"
              placeholder="Repetir contraseña"
              value={repeatPassword}
              onChange={e => setRepeatPassword(e.target.value)}
              type="password"
              required
              disabled={loading}
            />
          </div>

          <button className="btn-primary-auth" type="submit" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                Creando cuenta...
              </>
            ) : (
              'Registrarse'
            )}
          </button>

          {error && <div className="auth-error-box">{error}</div>}
        </form>

        <div className="auth-divider">o</div>

        <div className="auth-link">
          ¿Ya tienes cuenta? <a href="/login">Inicia sesión</a>
        </div>
      </div>
    </div>
  );
}
