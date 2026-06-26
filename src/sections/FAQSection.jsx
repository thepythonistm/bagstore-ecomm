import { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function FAQSection() {
  const { faqs } = useApp();
  const [openId, setOpenId] = useState(null);
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

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      style={{
        padding: 'var(--section-padding) 0',
        backgroundColor: 'var(--warm-cream)',
      }}
    >
      <div className="container" style={{ maxWidth: '800px' }}>
        <div
          className="reveal"
          style={{ textAlign: 'center', marginBottom: '48px' }}
        >
          <h2 className="section-title">Questions Fréquentes</h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              className={`accordion-item reveal stagger-${Math.min(index + 1, 6)}`}
            >
              <button
                className={`accordion-trigger ${openId === faq.id ? 'open' : ''}`}
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openId === faq.id}
              >
                <span>{faq.question}</span>
                <Plus
                  size={20}
                  className={`accordion-icon ${openId === faq.id ? 'open' : ''}`}
                  style={{
                    transform: openId === faq.id ? 'rotate(45deg)' : 'rotate(0)',
                  }}
                />
              </button>
              <div
                className="accordion-content"
                style={{
                  maxHeight: openId === faq.id ? '300px' : '0',
                  paddingBottom: openId === faq.id ? '20px' : '0',
                }}
              >
                <p className="accordion-answer">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
