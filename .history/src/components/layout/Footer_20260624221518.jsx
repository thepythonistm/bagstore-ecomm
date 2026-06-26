import { MessageCircle, Mail, Instagram, Facebook } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { scrollToSection } from '../../utils/helpers';

export default function Footer() {
  const { settings } = useApp();

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'var(--dark-brown)',
        color: 'var(--warm-sand)',
        padding: '64px 0 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '48px',
          }}
          className="footer-grid"
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: '24px',
                color: 'var(--gold)',
                marginBottom: '12px',
              }}
            >
              {settings.siteName}
            </h3>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
                color: 'var(--warm-sand)',
                lineHeight: 1.6,
              }}
            >
              Artisanat marocain d&apos;excellence depuis 2018
            </p>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '16px',
                color: 'var(--white)',
                marginBottom: '16px',
              }}
            >
              Liens Rapides
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Accueil', id: 'hero' },
                { label: 'Galerie', id: 'gallery' },
                { label: 'Avantages', id: 'benefits' },
                { label: 'FAQ', id: 'faq' },
              ].map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.id);
                    }}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--warm-sand)',
                      textDecoration: 'none',
                      transition: 'color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.color = 'var(--white)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.color = 'var(--warm-sand)';
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '16px',
                color: 'var(--white)',
                marginBottom: '16px',
              }}
            >
              Informations
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['Politique de Confidentialité', 'Conditions d\'Utilisation', 'Livraison & Retours'].map(
                (item) => (
                  <li key={item}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--warm-sand)',
                        cursor: 'pointer',
                      }}
                    >
                      {item}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '16px',
                color: 'var(--white)',
                marginBottom: '16px',
              }}
            >
              Contact
            </h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                  {settings.whatsappNumber}
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px' }}>
                  {settings.contactEmail}
                </span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '8px' }}>
                {settings.instagramUrl && (
                  <a
                    href={settings.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--warm-sand)' }}
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {settings.facebookUrl && (
                  <a
                    href={settings.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'var(--warm-sand)' }}
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div
          style={{
            borderTop: '1px solid rgba(232, 213, 196, 0.2)',
            padding: '24px 0',
            marginTop: '48px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'var(--text-muted)',
            }}
          >
            &copy; {new Date().getFullYear()} {settings.siteName}. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
