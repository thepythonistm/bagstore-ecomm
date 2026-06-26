import { MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export default function FloatingWhatsApp() {
  const { openOrderModal } = useApp();

  return (
    <button
      className="floating-whatsapp"
      onClick={openOrderModal}
      aria-label="Commander sur WhatsApp"
      title="Commander sur WhatsApp"
    >
      <span className="floating-whatsapp-pulse" />
      <MessageCircle size={28} fill="white" />
    </button>
  );
}
