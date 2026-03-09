import { motion } from "framer-motion";
import { WhatsappLogo } from "@phosphor-icons/react";

export default function WhatsAppButton({ whatsapp }) {
  const phoneNumber = whatsapp || "6281234567890";
  const message = encodeURIComponent(
    "Halo, saya tertarik dengan produk PT. Anugerah Guna Perkasa. Mohon informasi lebih lanjut."
  );

  return (
    <motion.a
      href={`https://wa.me/${phoneNumber}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.5, type: "spring", stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 whatsapp-button w-16 h-16 rounded-full flex items-center justify-center text-white animate-pulse-soft"
      data-testid="whatsapp-btn"
      aria-label="Chat via WhatsApp"
    >
      <WhatsappLogo size={32} weight="fill" />
      
      {/* Tooltip */}
      <div className="absolute right-full mr-4 hidden md:block">
        <div className="bg-slate-800 text-white text-sm px-4 py-2 rounded-lg whitespace-nowrap shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
          Chat dengan kami
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 border-8 border-transparent border-l-slate-800" />
        </div>
      </div>
    </motion.a>
  );
}
