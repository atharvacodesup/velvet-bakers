import { BUSINESS } from "@/config/business";
import BackButton from "@/components/ui/BackButton";
import { FiShield, FiSun, FiPackage, FiHeart } from "react-icons/fi";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  { icon: FiHeart, title: "Premium Ingredients", desc: "Only the finest butter, cream, and Belgian chocolate" },
  { icon: FiSun, title: "Baked Fresh Daily", desc: "Every item prepared the same day with zero preservatives" },
  { icon: FiPackage, title: "Hygienic Packaging", desc: "Food-grade packaging in a clean, FSSAI-licensed kitchen" },
  { icon: FiShield, title: "Custom Designs", desc: "From minimalist elegance to elaborate fantasy themes" },
];

const AboutPage = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <main className="pt-24 pb-32">
      <div className="section-container max-w-4xl">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            About {BUSINESS.name}
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Crafting moments of joy since {BUSINESS.yearEstablished}.
          </p>
        </div>

        <div className="card-bakery p-8 md:p-12 mb-12">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Our Story</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Founded in {BUSINESS.yearEstablished} in the heart of Kolhapur, {BUSINESS.name} started
            with a simple belief: every celebration deserves a cake made with love and the finest
            ingredients. What began as a small home kitchen has grown into a beloved neighborhood
            bakery trusted by hundreds of families.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Our team of skilled bakers and decorators brings your vision to life — from timeless
            classics like Black Forest and Red Velvet to extravagant designer cakes shaped as your
            wildest imagination. We take pride in freshness, hygiene, and creativity in every order.
          </p>
        </div>

        {/* Why choose us */}
        <h2 className="font-serif text-2xl font-bold text-center text-foreground mb-8">
          Why Choose Us
        </h2>
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15 }}
              className="card-bakery p-6 flex gap-4 items-start"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                <f.icon size={24} />
              </div>
              <div>
                <h3 className="font-serif font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-center text-muted-foreground mt-10">{BUSINESS.fssai}</p>
      </div>
    </main>
  );
};

export default AboutPage;
