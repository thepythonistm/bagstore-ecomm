import { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function Lightbox() {
  const { lightbox, closeLightbox, nextLightboxImage, prevLightboxImage } = useApp();
  const { isOpen, images, currentIndex } = lightbox;

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextLightboxImage();
      if (e.key === 'ArrowLeft') prevLightboxImage();
    },
    [isOpen, closeLightbox, nextLightboxImage, prevLightboxImage]
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <div className="lightbox-overlay" onClick={closeLightbox} role="dialog" aria-modal="true">
      <button className="lightbox-close" onClick={closeLightbox} aria-label="Fermer">
        <X size={24} />
      </button>

      {images.length > 1 && (
        <button
          className="lightbox-nav prev"
          onClick={(e) => {
            e.stopPropagation();
            prevLightboxImage();
          }}
          aria-label="Image précédente"
        >
          <ChevronLeft size={24} />
        </button>
      )}

      <img
        src={currentImage.url}
        alt={currentImage.alt}
        className="lightbox-image"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <button
          className="lightbox-nav next"
          onClick={(e) => {
            e.stopPropagation();
            nextLightboxImage();
          }}
          aria-label="Image suivante"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div className="lightbox-counter">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
