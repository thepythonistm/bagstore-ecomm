import { useEffect, useRef } from 'react';

const features = [
  {
    image: '/images/feature-craft.jpg',
    imageAlt: 'Artisan marocain cousant un sac en cuir à la main',
    heading: 'Un Héritage de Savoir-Faire',
    body: 'Nos artisans perpétuent des techniques de maroquinerie transmises depuis des siècles. Chaque point de couture est réalisé à la main avec du fil de lin ciré, assurant une solidité exceptionnelle et une finition impeccable.',
    imageLeft: true,
  },
  {
    image: '/images/feature-material.jpg',
    imageAlt: 'Texture du cuir premium pleine fleur',
    heading: 'Un Cuir qui Raconte Votre Histoire',
    body: "Le cuir de vachette premium développe une magnifique patine au fil du temps. Chaque rayure, chaque marque raconte votre histoire, rendant votre sac de plus en plus unique et personnel avec les années.",
    imageLeft: false,
  },
  {
    image: '/images/feature-lifestyle.jpg',
    imageAlt: 'Sac porté dans un intérieur méditerranéen',
    heading: "L'Élégance au Quotidien",
    body: "Avec ses dimensions parfaites (28 x 22 x 8 cm), ce sac bandoulière accompagne vos journées avec style. Assez spacieux pour vos essentiels, assez élégant pour toutes les occasions — du bureau au dîner.",
    imageLeft: true,
  },
];

export default function FeaturesSection() {
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

    const elements = sectionRef.current?.querySelectorAll('.reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--white)',
      }}
    >
      <div className="container">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '48px',
                alignItems: 'center',
              }}
              className="feature-block"
            >
              <div className={feature.imageLeft ? 'reveal-left' : 'reveal-right'} style={{ order: feature.imageLeft ? 1 : 2 }}>
                <div
                  style={{
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    aspectRatio: '3/2',
                  }}
                >
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className={feature.imageLeft ? 'reveal-right' : 'reveal-left'} style={{ order: feature.imageLeft ? 2 : 1 }}>
                <div style={{ maxWidth: '480px' }}>
                  <h2
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 600,
                      fontSize: 'clamp(22px, 3vw, 28px)',
                      color: 'var(--deep-charcoal)',
                      marginBottom: '16px',
                      lineHeight: 1.3,
                    }}
                  >
                    {feature.heading}
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '16px',
                      lineHeight: 1.7,
                      color: 'var(--text-muted)',
                    }}
                  >
                    {feature.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
