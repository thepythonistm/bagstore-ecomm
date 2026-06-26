
import { createContext, useContext, useState, useCallback } from 'react';
import {
  defaultProduct,
  defaultTestimonials,
  defaultFAQs,
  defaultSettings,
  sampleOrders,
} from '../data/initialData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [products, setProducts] = useState([defaultProduct]);
  const [activeProduct, setActiveProduct] = useState(defaultProduct);

  const updateProduct = useCallback((product) => {
    setProducts(prev => prev.map(p => p.id === product.id ? product : p));
    setActiveProduct(prev => prev.id === product.id ? product : prev);
  }, []);

  const [orders, setOrders] = useState(sampleOrders);

  const addOrder = useCallback((order) => {
    setOrders(prev => [order, ...prev]);
  }, []);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, status, updatedAt: new Date().toISOString() } : o))
    );
  }, []);

  // Testimonials
  const [testimonials, setTestimonials] = useState(defaultTestimonials);

  const addTestimonial = useCallback((testimonial) => {
    setTestimonials(prev => [...prev, testimonial]);
  }, []);

  const updateTestimonial = useCallback((testimonial) => {
    setTestimonials(prev => prev.map(t => (t.id === testimonial.id ? testimonial : t)));
  }, []);

  const deleteTestimonial = useCallback((id) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
  }, []);

  // FAQs
  const [faqs, setFaqs] = useState(defaultFAQs);

  const addFaq = useCallback((faq) => {
    setFaqs(prev => [...prev, faq]);
  }, []);

  const updateFaq = useCallback((faq) => {
    setFaqs(prev => prev.map(f => (f.id === faq.id ? faq : f)));
  }, []);

  const deleteFaq = useCallback((id) => {
    setFaqs(prev => prev.filter(f => f.id !== id));
  }, []);

  // Settings
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = useCallback((newSettings) => {
    setSettings(newSettings);
  }, []);

  // Order Modal
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const openOrderModal = useCallback(() => setIsOrderModalOpen(true), []);
  const closeOrderModal = useCallback(() => setIsOrderModalOpen(false), []);

  // Lightbox
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    images: [],
    currentIndex: 0,
  });

  const openLightbox = useCallback((images, index) => {
    setLightbox({ isOpen: true, images, currentIndex: index });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox(prev => ({ ...prev, isOpen: false }));
  }, []);

  const nextLightboxImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }));
  }, []);

  const prevLightboxImage = useCallback(() => {
    setLightbox(prev => ({
      ...prev,
      currentIndex: prev.currentIndex === 0 ? prev.images.length - 1 : prev.currentIndex - 1,
    }));
  }, []);

  // Mobile Nav
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const openMobileNav = useCallback(() => setIsMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setIsMobileNavOpen(false), []);

  // Admin
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const adminLogin = useCallback(() => setIsAdminLoggedIn(true), []);
  const adminLogout = useCallback(() => setIsAdminLoggedIn(false), []);

  // Stats
  const getStats = useCallback(() => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();

    return {
      totalOrders: orders.length,
      todayOrders: orders.filter(o => o.createdAt.startsWith(today)).length,
      weekOrders: orders.filter(o => o.createdAt >= weekAgo).length,
      monthOrders: orders.filter(o => o.createdAt >= monthAgo).length,
      totalRevenue: orders
        .filter(o => o.status !== 'annule')
        .reduce((sum, o) => sum + o.productPrice, 0),
    };
  }, [orders]);

  // WhatsApp
  const generateWhatsAppUrl = useCallback((formData) => {
    const message = `Bonjour Artisana Maroc,\n\nJe souhaite commander le produit suivant :\n\nProduit : ${activeProduct.title}\nNom : ${formData.fullName}\nTéléphone : ${formData.phone}\nAdresse : ${formData.address}\nPrix : ${activeProduct.discountPrice} DH\n\nMerci de confirmer ma commande.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = settings.whatsappNumber.replace(/\+/g, '').replace(/\s/g, '');
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }, [activeProduct, settings.whatsappNumber]);

  const value = {
    products,
    activeProduct,
    updateProduct,
    orders,
    addOrder,
    updateOrderStatus,
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    faqs,
    addFaq,
    updateFaq,
    deleteFaq,
    settings,
    updateSettings,
    isOrderModalOpen,
    openOrderModal,
    closeOrderModal,
    lightbox,
    openLightbox,
    closeLightbox,
    nextLightboxImage,
    prevLightboxImage,
    isMobileNavOpen,
    openMobileNav,
    closeMobileNav,
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    getStats,
    generateWhatsAppUrl,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
