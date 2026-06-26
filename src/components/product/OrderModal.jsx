import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Modal from '../../components/common/Modal';
import { useApp } from '../../context/AppContext';
import { validateRequired, validatePhone } from '../../utils/helpers';

export default function OrderModal() {
  const { isOrderModalOpen, closeOrderModal, activeProduct, generateWhatsAppUrl } = useApp();

  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};

    const nameError = validateRequired(formData.fullName, 'Nom complet');
    if (nameError) newErrors.fullName = nameError;

    const addressError = validateRequired(formData.address, 'Adresse');
    if (addressError) newErrors.address = addressError;

    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const whatsappUrl = generateWhatsAppUrl(formData);

    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
      setIsSubmitting(false);
      closeOrderModal();
      setFormData({ fullName: '', address: '', phone: '' });
    }, 500);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const featuredImage = activeProduct.images.find(img => img.isFeatured) || activeProduct.images[0];

  return (
    <Modal isOpen={isOrderModalOpen} onClose={closeOrderModal}>
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2
          style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            fontSize: '22px',
            color: 'var(--deep-charcoal)',
            marginBottom: '16px',
          }}
        >
          Finaliser Votre Commande
        </h2>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            padding: '16px',
            backgroundColor: 'var(--warm-cream)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <img
            src={featuredImage?.url}
            alt={activeProduct.title}
            style={{
              width: '60px',
              height: '60px',
              objectFit: 'cover',
              borderRadius: 'var(--radius-sm)',
            }}
          />
          <div style={{ textAlign: 'left' }}>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: '14px',
                color: 'var(--deep-charcoal)',
              }}
            >
              {activeProduct.title}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: '18px',
                color: 'var(--gold)',
              }}
            >
              {activeProduct.discountPrice} DH
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label className="form-label" htmlFor="fullName">
            Nom complet *
          </label>
          <input
            id="fullName"
            type="text"
            className={`form-input ${errors.fullName ? 'error' : ''}`}
            placeholder="Votre nom et prénom"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
          />
          {errors.fullName && <span className="form-error">{errors.fullName}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="address">
            Adresse complète *
          </label>
          <input
            id="address"
            type="text"
            className={`form-input ${errors.address ? 'error' : ''}`}
            placeholder="Ville, quartier, rue, n°"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
          />
          {errors.address && <span className="form-error">{errors.address}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="phone">
            Numéro de téléphone *
          </label>
          <input
            id="phone"
            type="tel"
            className={`form-input ${errors.phone ? 'error' : ''}`}
            placeholder="+212 6XX XXX XXX"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
          {errors.phone && <span className="form-error">{errors.phone}</span>}
        </div>

        <button
          type="submit"
          className="btn btn-whatsapp btn-full"
          disabled={isSubmitting}
          style={{ marginTop: '8px' }}
        >
          <MessageCircle size={20} />
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer sur WhatsApp'}
        </button>

        <p
          style={{
            textAlign: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: '13px',
            color: 'var(--text-muted)',
            marginTop: '12px',
          }}
        >
          Vous serez redirigé vers WhatsApp pour confirmer votre commande
        </p>
      </form>
    </Modal>
  );
}
