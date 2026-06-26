import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import StarRating from '../components/common/StarRating';

export default function TestimonialsSection() {
  const { testimonials } = useApp();
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

  const averageRating = testimonials.length > 0
    ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
    : '0';

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--warm-sand)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(199, 91, 42, 0.03) 20px, rgba(199, 91, 42, 0.03) 21px),
            repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(212, 168, 83, 0.03) 20px, rgba(212, 168, 83, 0.03) 21px)
          `,
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="section-title">Ce que Disent Nos Clients</h2>
          <p className="section-subtitle">
            Rejoignez des milliers de clients satisfaits au Maroc
          </p>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              marginTop: '16px',
            }}
          >
            <div style={{ display: 'flex', gap: '2px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  fill={star <= Math.round(Number(averageRating)) ? '#D4A853' : 'none'}
                  color="#D4A853"
                />
              ))}
            </div>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: '16px',
                color: 'var(--deep-charcoal)',
              }}
            >
              {averageRating}/5 basé sur {testimonials.length} avis
            </span>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            paddingBottom: '16px',
            scrollSnapType: 'x mandatory',
            scrollbarWidth: 'none',
          }}
          className="testimonials-scroll"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="reveal"
              style={{
                flex: '0 0 360px',
                scrollSnapAlign: 'start',
              }}
            >
              <div
                className="card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                  }}
                >
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid var(--gold)',
                    }}
                    loading="lazy"
                  />
                  <div>
                    <h4
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontWeight: 600,
                        fontSize: '16px',
                        color: 'var(--deep-charcoal)',
                      }}
                    >
                      {testimonial.name}
                    </h4>
                    <StarRating rating={testimonial.rating} size={14} />
                  </div>
                </div>

                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    lineHeight: 1.65,
                    color: 'var(--deep-charcoal)',
                    flex: 1,
                    marginBottom: '12px',
                  }}
                >
                  &ldquo;{testimonial.review}&rdquo;
                </p>

                <span
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    color: 'var(--text-muted)',
                  }}
                >
                  {testimonial.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
