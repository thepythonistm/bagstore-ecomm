import { useEffect, useRef } from 'react';
import {
  Heart,
  Gem,
  Sparkles,
  Clock,
  Truck,
  Star,
} from 'lucide-react';

const benefits = [
  {
    icon: Heart,
    title: 'Fabrication Artisanale',
    description: 'Entièrement fait main par des artisans marocains expérimentés',
  },
  {
    icon: Gem,
    title: 'Matériaux Premium',
    description: 'Cuir de vachette véritable, doublure sabra, fermoir laiton',
  },
  {
    icon: Sparkles,
    title: 'Design Élégant',
    description: 'Motifs zellige gravés, silhouette intemporelle',
  },
  {
    icon: Clock,
    title: 'Grande Durabilité',
    description: "Conçu pour durer des années, plus il vieillit, plus il est beau",
  },
  {
    icon: Truck,
    title: 'Livraison Rapide',
    description: 'Livraison en 24-48h partout au Maroc',
  },
  {
    icon: Star,
    title: 'Produit Unique',
    description: 'Chaque sac est légèrement différent, vous avez une pièce exclusive',
  },
];

export default function BenefitsSection() {
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
      id="benefits"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--warm-cream)',
      }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="section-title">Pourquoi Choisir Notre Sac</h2>
          <p className="section-subtitle">
            Un accessoire qui allie tradition, qualité et élégance
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
          className="benefits-grid"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={benefit.title}
                className={`reveal stagger-${index + 1}`}
              >
                <div
                  className="card"
                  style={{
                    textAlign: 'center',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-4px)';
                    el.style.boxShadow = '0 12px 32px rgba(43, 43, 43, 0.1)';
                    el.style.borderColor = 'var(--terracotta)';
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0)';
                    el.style.boxShadow = '';
                    el.style.borderColor = '';
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--terracotta-light)',
                      marginBottom: '16px',
                    }}
                  >
                    <Icon size={28} style={{ color: 'var(--terracotta)' }} />
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 600,
                      fontSize: '18px',
                      color: 'var(--deep-charcoal)',
                      marginBottom: '8px',
                    }}
                  >
                    {benefit.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    {benefit.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
