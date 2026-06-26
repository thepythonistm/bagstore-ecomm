import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import OrderModal from '../components/product/OrderModal';
import FloatingWhatsApp from '../components/common/FloatingWhatsApp';
import Lightbox from '../components/common/Lightbox';
import HeroSection from '../sections/HeroSection';
import GallerySection from '../sections/GallerySection';
import BenefitsSection from '../sections/BenefitsSection';
import FeaturesSection from '../sections/FeaturesSection';
import TestimonialsSection from '../sections/TestimonialsSection';
import TrustSection from '../sections/TrustSection';
import FAQSection from '../sections/FAQSection';
import CTASection from '../sections/CTASection';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GallerySection />
        <BenefitsSection />
        <FeaturesSection />
        <TestimonialsSection />
        <TrustSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <OrderModal />
      <Lightbox />
    </>
  );
}
