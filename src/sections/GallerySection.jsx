import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { scrollToSection } from '../utils/helpers';

export default function GallerySection() {
  const { activeProduct, openLightbox } = useApp();
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);

  const images = activeProduct.images;

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

    const elements = sectionRef.current?.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--white)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
          }}
          className="gallery-grid"
        >
          <div className="reveal-left">
            <div
              style={{
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                cursor: 'zoom-in',
                backgroundColor: 'var(--warm-cream)',
              }}
              onClick={() => openLightbox(
                images.map((img) => ({ url: img.url, alt: img.alt })),
                activeIndex
              )}
            >
              <img
                src={images[activeIndex]?.url}
                alt={images[activeIndex]?.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(5, 1fr)',
                gap: '12px',
                marginTop: '16px',
              }}
              className="thumbnail-grid"
            >
              {images.slice(0, 5).map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => setActiveIndex(index)}
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: index === activeIndex
                      ? '2px solid var(--terracotta)'
                      : '2px solid transparent',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: index === activeIndex ? 1 : 0.7,
                  }}
                  onMouseEnter={(e) => {
                    if (index !== activeIndex) {
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.opacity = '1';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (index !== activeIndex) {
                      e.currentTarget.style.borderColor = 'transparent';
                      e.currentTarget.style.opacity = '0.7';
                    }
                  }}
                  aria-label={`Voir ${image.alt}`}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="reveal-right" style={{ paddingTop: '16px' }}>
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
              Un Chef-d&apos;Œuvre de l&apos;Artisanat Marocain
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '16px',
                lineHeight: 1.7,
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}
            >
              {activeProduct.fullDescription}
            </p>

            <div
              style={{
                backgroundColor: 'var(--warm-cream)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                marginBottom: '24px',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: 'var(--deep-charcoal)',
                  marginBottom: '16px',
                }}
              >
                Spécifications
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}
              >
                {activeProduct.specifications.map((spec) => (
                  <div key={spec.key}>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        fontWeight: 600,
                        color: 'var(--deep-charcoal)',
                        display: 'block',
                      }}
                    >
                      {spec.key}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '14px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <a
              href="#benefits"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('benefits');
              }}
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '15px',
                color: 'var(--terracotta)',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => {
                e.target.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.target.style.textDecoration = 'none';
              }}
            >
              En savoir plus &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
