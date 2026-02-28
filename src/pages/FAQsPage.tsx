import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import BackButton from "@/components/ui/BackButton";

const faqs = [
  {
    q: "What areas do you deliver to?",
    a: "We deliver across Kolhapur city. For areas beyond city limits, please contact us directly to discuss delivery options and charges.",
  },
  {
    q: "How far in advance should I place an order?",
    a: "Standard cakes can be ordered 24 hours in advance. Custom designer cakes require at least 48 hours notice. For wedding cakes, we recommend at least one week.",
  },
  {
    q: "What is the shelf life of your cakes?",
    a: "Our cakes are best consumed within 2-3 days when refrigerated. Fresh cream cakes should be consumed the same day for best taste.",
  },
  {
    q: "Can I order a cake for same-day delivery?",
    a: "Same-day orders are possible for select standard cakes subject to availability. Please call us directly to check.",
  },
  {
    q: "What payment options do you accept?",
    a: "We accept cash, UPI (Google Pay, PhonePe, Paytm), bank transfer, and all major debit/credit cards at our store.",
  },
  {
    q: "How does the custom cake design process work?",
    a: "Share your idea via our Custom Order form or WhatsApp. We will discuss the design, size, and flavour. After confirmation and advance payment, we begin crafting your cake.",
  },
  {
    q: "Do you cater for events and bulk orders?",
    a: "Yes! We handle catering for weddings, corporate events, and festivals. Contact us at least one week in advance for bulk orders.",
  },
];

const FAQsSection = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container max-w-3xl">
        <BackButton />
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center text-foreground mb-10">
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="card-bakery overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
                aria-expanded={openIdx === i}
              >
                <span className="font-medium text-foreground pr-4">{faq.q}</span>
                <motion.span
                  animate={{ rotate: openIdx === i ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-primary"
                >
                  <FiChevronDown size={20} />
                </motion.span>
              </button>
              <AnimatePresence>
                {openIdx === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
