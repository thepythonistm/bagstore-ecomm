/* =============================================
   UTILITY FUNCTIONS
   Artisana Maroc - Helper functions
   ============================================= */

export function formatPrice(price) {
  return `${price.toLocaleString('fr-FR')} DH`;
}

export function calculateDiscount(original, discounted) {
  return Math.round(((original - discounted) / original) * 100);
}

export function generateId(prefix = '') {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPhone(phone) {
  return phone.replace(/(\d{3})(?=\d)/g, '$1 ').trim();
}

export function validateRequired(value, fieldName) {
  if (!value || value.trim().length === 0) {
    return `Le champ "${fieldName}" est obligatoire`;
  }
  return undefined;
}

export function validatePhone(phone) {
  if (!phone || phone.trim().length === 0) {
    return 'Le numéro de téléphone est obligatoire';
  }
  const cleaned = phone.replace(/\s/g, '');
  if (!/^(\+212|0)[5-7]\d{8}$/.test(cleaned)) {
    return 'Veuillez entrer un numéro de téléphone valide (+212 ou 0 suivi de 9 chiffres)';
  }
  return undefined;
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

export function getCurrentDate() {
  return new Date().toISOString();
}

export function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}
