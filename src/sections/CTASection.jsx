import { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function CTASection() {
  const { activeProduct, openOrderModal } = useApp();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-dark) 100%)',
      }}
    >
      <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
        <div className="reveal" style={{ marginBottom: '20px' }}>
          <span className="badge badge-gold badge-pulse">OFFRE LIMITÉE</span>
        </div>

        <h2
          className="reveal stagger-1"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(28px, 4vw, 40px)',
            lineHeight: 1.2,
            color: 'var(--white)',
            marginBottom: '16px',
          }}
        >
          Ne Manquez Pas Cette Offre Exceptionnelle
        </h2>

        <p
          className="reveal stagger-2"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(16px, 2.5vw, 18px)',
            color: 'var(--white)',
            opacity: 0.9,
            marginBottom: '24px',
          }}
        >
          Livraison gratuite + Paiement à la livraison pour toute commande aujourd&apos;hui
        </p>

        <div
          className="reveal stagger-3"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '20px',
              color: 'rgba(255,255,255,0.7)',
              textDecoration: 'line-through',
            }}
          >
            {activeProduct.price.toLocaleString('fr-FR')} DH
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 700,
              fontSize: '36px',
              color: 'var(--white)',
            }}
          >
            {activeProduct.discountPrice.toLocaleString('fr-FR')} DH
          </span>
        </div>

        <div className="reveal stagger-4" style={{ marginBottom: '20px' }}>
          <button className="btn btn-white btn-lg" onClick={openOrderModal}>
            <MessageCircle size={20} />
            Commander Maintenant sur WhatsApp
          </button>
        </div>

        <p
          className="reveal stagger-5"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'var(--white)',
            opacity: 0.8,
          }}
        >
          Livraison gratuite &bull; Garantie 14 jours &bull; Support 7j/7
        </p>
      </div>
    </section>
  );
}
