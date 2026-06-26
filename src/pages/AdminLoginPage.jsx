import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Mail, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AdminLoginPage() {
  const { adminLogin } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Veuillez remplir tous les champs');
      return;
    }

    adminLogin();
    navigate('/admin/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'var(--warm-cream)',
        padding: '24px',
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--white)',
          borderRadius: 'var(--radius-xl)',
          padding: '40px',
          maxWidth: '400px',
          width: '100%',
          boxShadow: 'var(--shadow-lg)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '24px',
              color: 'var(--gold)',
              marginBottom: '8px',
            }}
          >
            Artisana Maroc
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '18px',
              fontWeight: 600,
              color: 'var(--deep-charcoal)',
            }}
          >
            Tableau de Bord
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="admin-email">
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                id="admin-email"
                type="email"
                className="form-input"
                placeholder="admin@artisanamaroc.ma"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="admin-password">
              Mot de passe
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={18}
                style={{
                  position: 'absolute',
                  left: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-muted)',
                }}
              />
              <input
                id="admin-password"
                type="password"
                className="form-input"
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '44px' }}
              />
            </div>
          </div>

          {error && (
            <div
              style={{
                padding: '10px 16px',
                backgroundColor: 'rgba(199, 91, 42, 0.1)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
              }}
            >
              <span className="form-error">{error}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-full">
            Se Connecter
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              color: 'var(--text-muted)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ArrowLeft size={16} />
            Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}
