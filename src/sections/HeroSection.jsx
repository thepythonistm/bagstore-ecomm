import { useEffect, useRef } from 'react';
import { Truck, Shield, Package, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import ZelligeBackground from '../components/product/ZelligeBackground';
import { useApp } from '../context/AppContext';
import { calculateDiscount } from '../utils/helpers';

export default function HeroSection() {
  const { activeProduct, openOrderModal } = useApp();
  const heroRef = useRef(null);

  const discount = calculateDiscount(activeProduct.price, activeProduct.discountPrice);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo('.hero-badge', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 })
        .fromTo('.hero-title', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
        .fromTo('.hero-subtitle', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .fromTo('.hero-price', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.45)
        .fromTo('.hero-cta', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo('.hero-trust', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.75);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: 'var(--warm-cream)',
      }}
    >
      <ZelligeBackground />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 85%, rgba(43,43,43,0.75) 0%, rgba(43,43,43,0.4) 40%, transparent 70%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 24px 10vh',
          textAlign: 'center',
          maxWidth: '800px',
        }}
      >
        <div className="hero-badge" style={{ marginBottom: '20px' }}>
          <span className="badge badge-gold">-{discount}% DE REMISE</span>
        </div>

        <h1
          className="hero-title"
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: 'clamp(32px, 5vw, 48px)',
            lineHeight: 1.15,
            color: 'var(--white)',
            textShadow: '0 2px 12px rgba(0,0,0,0.5)',
            marginBottom: '12px',
          }}
        >
          {activeProduct.title}
        </h1>

        <p
          className="hero-subtitle"
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            fontSize: 'clamp(16px, 2.5vw, 20px)',
            color: 'var(--white)',
            opacity: 0.9,
            textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            marginBottom: '24px',
          }}
        >
          {activeProduct.shortDescription}
        </p>

        <div
          className="hero-price"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '28px',
          }}
        >
          <span className="price-original" style={{ fontSize: '20px', color: 'rgba(255,255,255,0.7)' }}>
            {activeProduct.price.toLocaleString('fr-FR')} DH
          </span>
          <span className="price-discounted" style={{ fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--gold)' }}>
            {activeProduct.discountPrice.toLocaleString('fr-FR')} DH
          </span>
        </div>

        <div
          className="hero-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            marginBottom: '32px',
          }}
        >
          <button className="btn btn-whatsapp btn-lg" onClick={openOrderModal}>
            <MessageCircle size={20} />
            Commander sur WhatsApp
          </button>
          <button className="btn btn-outline-white" onClick={() => scrollToSection('gallery')}>
            Voir les Détails
          </button>
        </div>

        <div
          className="hero-trust"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 3vw, 32px)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { icon: Truck, label: 'Livraison Rapide' },
            { icon: Shield, label: 'Qualité Garantie' },
            { icon: Package, label: 'Paiement à la Livraison' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: 'var(--white)',
                opacity: 0.85,
              }}
            >
              <Icon size={20} />
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 400,
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
