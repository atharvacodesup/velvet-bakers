import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BUSINESS } from "@/config/business";
import heroImage from "@/assets/hero-bakery.jpg";
import { FiShoppingBag, FiPhone, FiMessageCircle, FiEdit3 } from "react-icons/fi";
import { GiCupcake, GiCakeSlice, GiDonut, GiCookie, GiChocolateBar } from "react-icons/gi";

/** Floating bakery icons scattered across the hero */
const floatingIcons = [
  { Icon: GiCupcake, top: "10%", left: "5%", delay: 0, size: 28 },
  { Icon: GiCakeSlice, top: "20%", right: "8%", delay: 1.2, size: 24 },
  { Icon: GiDonut, top: "60%", left: "10%", delay: 0.6, size: 22 },
  { Icon: GiCookie, top: "75%", right: "12%", delay: 1.8, size: 26 },
  { Icon: GiChocolateBar, top: "40%", left: "85%", delay: 0.9, size: 20 },
  { Icon: GiCupcake, top: "85%", left: "30%", delay: 1.5, size: 22 },
  { Icon: GiCakeSlice, top: "15%", left: "45%", delay: 2.1, size: 20 },
  { Icon: GiDonut, top: "50%", left: "2%", delay: 0.3, size: 24 },
  { Icon: GiCookie, top: "30%", right: "25%", delay: 1.0, size: 22 },
  { Icon: GiChocolateBar, top: "70%", left: "60%", delay: 2.4, size: 20 },
];

const Hero = () => {
  const whatsappUrl = `https://wa.me/${BUSINESS.phoneRaw}?text=${BUSINESS.whatsappPrefill()}`;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Velvet Cake and Bakery display"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Floating bakery icons */}
      {floatingIcons.map(({ Icon, delay, size, ...pos }, i) => (
        <motion.div
          key={i}
          className="floating-icon text-accent"
          style={{ ...pos } as React.CSSProperties}
          animate={{
            y: [0, -15, 5, 0],
            rotate: [0, 5, -3, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay,
            ease: "easeInOut",
          }}
        >
          <Icon size={size} />
        </motion.div>
      ))}

      {/* Content */}
      <div className="relative section-container py-24 md:py-32 z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-4">
            {BUSINESS.name} — <span className="text-accent">{BUSINESS.tagline}</span>
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 leading-relaxed">
            {BUSINESS.subheading}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/menu" className="btn-gold flex items-center gap-2">
              <FiShoppingBag /> Order Now
            </Link>
            <Link to="/custom-order" className="btn-velvet flex items-center gap-2">
              <FiEdit3 /> Custom Cake
            </Link>
            <a href={`tel:${BUSINESS.phone}`} className="btn-outline-cream flex items-center gap-2">
              <FiPhone /> Call Shop
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-cream flex items-center gap-2"
            >
              <FiMessageCircle /> WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
