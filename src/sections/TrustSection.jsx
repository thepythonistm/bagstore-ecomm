import { useEffect, useRef } from 'react';
import { MapPin, MessageCircle, CheckCircle, Headphones } from 'lucide-react';

const trustItems = [
  {
    icon: MapPin,
    title: 'Livraison Partout au Maroc',
    description: 'De Tanger à Laâyoune, nous livrons dans toutes les villes en 24-48h',
  },
  {
    icon: MessageCircle,
    title: 'Assistance WhatsApp',
    description: "Une question ? Notre équipe répond sous 30 min sur WhatsApp",
  },
  {
    icon: CheckCircle,
    title: 'Satisfaction Garantie',
    description: 'Pas satisfait ? Retour gratuit sous 14 jours, remboursement assuré',
  },
  {
    icon: Headphones,
    title: 'Service Client Réactif',
    description: 'Disponible 7j/7 de 9h à 21h pour vous accompagner',
  },
];

export default function TrustSection() {
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
      id="trust"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--deep-charcoal)',
        color: 'var(--white)',
      }}
    >
      <div className="container">
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2
            className="section-title"
            style={{ color: 'var(--white)' }}
          >
            Achetez en Toute Confiance
          </h2>
          <p
            className="section-subtitle"
            style={{ color: 'var(--warm-sand)' }}
          >
            Nous nous engageons pour votre satisfaction
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '32px',
          }}
          className="trust-grid"
        >
          {trustItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className={`reveal stagger-${index + 1}`}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '20px',
                  }}
                  className="trust-item"
                >
                  <div
                    style={{
                      flexShrink: 0,
                      color: 'var(--gold)',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                      e.currentTarget.style.color = 'var(--terracotta)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.color = 'var(--gold)';
                    }}
                  >
                    <Icon size={48} />
                  </div>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '18px',
                        color: 'var(--white)',
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '15px',
                        color: 'var(--warm-sand)',
                        lineHeight: 1.6,
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
