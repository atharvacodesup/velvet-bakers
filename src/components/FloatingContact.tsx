import { BUSINESS } from "@/config/business";
import { FiPhone, FiMessageCircle } from "react-icons/fi";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/** Persistent floating Call + WhatsApp buttons */
const FloatingContact = () => {
  const [showCallModal, setShowCallModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const whatsappUrl = `https://wa.me/${BUSINESS.phoneRaw}?text=${BUSINESS.whatsappPrefill()}`;

  const copyPhone = async () => {
    await navigator.clipboard.writeText(BUSINESS.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Desktop: bottom-right vertical stack */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col gap-3">
        <button
          onClick={() => setShowCallModal(true)}
          className="btn-velvet flex items-center gap-2 rounded-full px-5 py-3 shadow-lg"
          aria-label="Call shop"
        >
          <FiPhone /> Call
        </button>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex items-center gap-2 rounded-full px-5 py-3 shadow-lg"
          aria-label="Message on WhatsApp"
        >
          <FiMessageCircle /> WhatsApp
        </a>
      </div>

      {/* Mobile: bottom-center horizontal pill */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 md:hidden flex gap-2">
        <a
          href={`tel:${BUSINESS.phone}`}
          className="btn-velvet flex items-center gap-2 rounded-full px-4 py-2.5 text-sm shadow-lg"
          aria-label="Call shop"
        >
          <FiPhone size={16} /> Call
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-gold flex items-center gap-2 rounded-full px-4 py-2.5 text-sm shadow-lg"
          aria-label="WhatsApp"
        >
          <FiMessageCircle size={16} /> WhatsApp
        </a>
      </div>

      {/* Call modal (desktop) */}
      <AnimatePresence>
        {showCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm"
            onClick={() => setShowCallModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <FiPhone className="mx-auto text-primary text-3xl mb-4" />
              <h3 className="font-serif text-xl font-bold text-foreground mb-2">Call Us</h3>
              <p className="text-lg font-semibold text-foreground mb-4">{BUSINESS.phone}</p>
              <div className="flex gap-3 justify-center">
                <a href={`tel:${BUSINESS.phone}`} className="btn-velvet text-sm">
                  Call Now
                </a>
                <button onClick={copyPhone} className="btn-gold text-sm">
                  {copied ? "Copied!" : "Copy Number"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingContact;
