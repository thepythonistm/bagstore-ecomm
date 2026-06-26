import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function AdminSettings() {
  const { settings, updateSettings } = useApp();
  const [formData, setFormData] = useState(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="admin-table-card">
      <h2
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          fontSize: '18px',
          color: 'var(--deep-charcoal)',
          marginBottom: '24px',
        }}
      >
        Paramètres du Site
      </h2>

      {saved && (
        <div
          style={{
            padding: '12px 16px',
            backgroundColor: 'rgba(107, 127, 90, 0.1)',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px',
            color: 'var(--olive)',
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          Paramètres enregistrés avec succès !
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '20px',
          }}
          className="settings-grid"
        >
          <div className="form-group">
            <label className="form-label">Nom du site</label>
            <input
              type="text"
              className="form-input"
              value={formData.siteName}
              onChange={(e) => handleChange('siteName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Numéro WhatsApp</label>
            <input
              type="text"
              className="form-input"
              value={formData.whatsappNumber}
              onChange={(e) => handleChange('whatsappNumber', e.target.value)}
              placeholder="+212612345678"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email de contact</label>
            <input
              type="email"
              className="form-input"
              value={formData.contactEmail}
              onChange={(e) => handleChange('contactEmail', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL Instagram</label>
            <input
              type="text"
              className="form-input"
              value={formData.instagramUrl}
              onChange={(e) => handleChange('instagramUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">URL Facebook</label>
            <input
              type="text"
              className="form-input"
              value={formData.facebookUrl}
              onChange={(e) => handleChange('facebookUrl', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Texte du bouton CTA</label>
            <input
              type="text"
              className="form-input"
              value={formData.ctaButtonText}
              onChange={(e) => handleChange('ctaButtonText', e.target.value)}
            />
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '16px',
              color: 'var(--deep-charcoal)',
              marginBottom: '16px',
            }}
          >
            SEO
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
            className="settings-grid"
          >
            <div className="form-group">
              <label className="form-label">Titre SEO</label>
              <input
                type="text"
                className="form-input"
                value={formData.seoTitle}
                onChange={(e) => handleChange('seoTitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Description SEO</label>
              <input
                type="text"
                className="form-input"
                value={formData.seoDescription}
                onChange={(e) => handleChange('seoDescription', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '24px' }}>
          <h3
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '16px',
              color: 'var(--deep-charcoal)',
              marginBottom: '16px',
            }}
          >
            Contenu de la page d&apos;accueil
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
            }}
            className="settings-grid"
          >
            <div className="form-group">
              <label className="form-label">Titre du hero</label>
              <input
                type="text"
                className="form-input"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Sous-titre du hero</label>
              <input
                type="text"
                className="form-input"
                value={formData.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginTop: '16px' }}>
            <label className="form-label">Description du hero</label>
            <textarea
              className="form-input"
              rows={3}
              value={formData.heroDescription}
              onChange={(e) => handleChange('heroDescription', e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '32px' }}>
          <button type="submit" className="btn btn-primary">
            <Save size={18} />
            Enregistrer les paramètres
          </button>
        </div>
      </form>
    </div>
  );
}
