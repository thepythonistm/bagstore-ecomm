import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { scrollToSection } from '../../utils/helpers';
import { useApp } from '../../context/AppContext';

const navItems = [
  { label: 'Accueil', sectionId: 'hero' },
  { label: 'Galerie', sectionId: 'gallery' },
  { label: 'Avantages', sectionId: 'benefits' },
  { label: 'Témoignages', sectionId: 'testimonials' },
  { label: 'FAQ', sectionId: 'faq' },
  { label: 'Contact', sectionId: 'footer' },
];

export default function Navbar() {
  const { openOrderModal } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMobileOpen(false);
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '55px',
          backgroundColor: isScrolled ? 'rgba(239, 180, 91, 0.95)' : 'rgba(239, 180, 91, 0.95)',
          backdropFilter: isScrolled ? 'blur(8px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--border-color)' : '1px solid transparent',
          zIndex: 100,
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: 'var(--content-max-width)',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '20px',
              color: isScrolled ? 'var(--deep-charcoal)' : 'var(--white)',
              textDecoration: 'none',
              transition: 'color 0.3s ease',
            }}
          >
            Artisana
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '28px',
            }}
            className="desktop-nav"
          >
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.sectionId);
                }}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  fontSize: '14px',
                  color: isScrolled ? 'var(--deep-charcoal)' : 'var(--white)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                  opacity: 0.9,
                }}
                onMouseEnter={(e) => {
                  e.target.style.color = 'var(--terracotta)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.color = isScrolled
                    ? 'var(--deep-charcoal)'
                    : 'var(--white)';
                }}
              >
                {item.label}
              </a>
            ))}
            <button
              className="btn btn-primary btn-sm"
              onClick={openOrderModal}
              style={{ marginLeft: '8px' }}
            >
              Commander
            </button>
          </div>

          <button
            onClick={() => setIsMobileOpen(true)}
            style={{
              display: 'none',
              color: isScrolled ? 'var(--deep-charcoal)' : 'var(--white)',
              background: 'none',
              border: 'none',
              padding: '8px',
            }}
            className="mobile-menu-btn"
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {isMobileOpen && (
        <>
          <div className="mobile-nav-overlay" onClick={() => setIsMobileOpen(false)} />
          <div className="mobile-nav">
            <button
              className="mobile-nav-close"
              onClick={() => setIsMobileOpen(false)}
              aria-label="Fermer le menu"
            >
              <X size={24} />
            </button>
            <div className="mobile-nav-links">
              {navItems.map((item) => (
                <a
                  key={item.sectionId}
                  href={`#${item.sectionId}`}
                  className="mobile-nav-link"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.sectionId);
                  }}
                >
                  {item.label}
                </a>
              ))}
              <button
                className="btn btn-primary btn-full"
                onClick={() => {
                  setIsMobileOpen(false);
                  openOrderModal();
                }}
                style={{ marginTop: '16px' }}
              >
                Commander
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
