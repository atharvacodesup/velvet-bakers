import Hero from "@/components/Hero";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { menuItems } from "@/data/menu";
import StarRating from "@/components/ui/StarRating";
import { BUSINESS } from "@/config/business";
import { FiArrowRight, FiShield, FiSun, FiPackage, FiHeart, FiPhone } from "react-icons/fi";

const features = [
  { icon: FiHeart, title: "Premium Ingredients" },
  { icon: FiSun, title: "Baked Fresh Daily" },
  { icon: FiPackage, title: "Hygienic Packaging" },
  { icon: FiShield, title: "Custom Designs" },
];

const HomePage = () => {
  const [featRef, featInView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const [menuRef, menuInView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const featuredItems = menuItems.slice(0, 4);

  return (
    <main>
      <Hero />

      {/* Why Choose Us strip */}
      <section className="bg-primary py-8">
        <div className="section-container">
          <div ref={featRef} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 15 }}
                animate={featInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 text-primary-foreground"
              >
                <f.icon size={22} className="text-accent shrink-0" />
                <span className="text-sm font-medium">{f.title}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Cakes */}
      <section className="section-padding">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-3">
              Our Bestsellers
            </h2>
            <p className="text-muted-foreground">Hand-picked favourites loved by our customers.</p>
          </div>

          <div ref={menuRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredItems.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={menuInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card-bakery flex flex-col"
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-semibold text-foreground mb-1">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{item.description}</p>
                  <p className="text-lg font-bold text-primary">&#8377;{item.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/menu" className="btn-gold inline-flex items-center gap-2">
              View Full Menu <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Reviews Preview */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-8">
            Loved by Kolhapur
          </h2>
          <div className="card-bakery p-8">
            <StarRating rating={5} size={20} />
            <p className="text-lg italic text-foreground mt-4 mb-4">
              &ldquo;The best chocolate truffle cake I have ever had! Perfect for my daughter&apos;s birthday.&rdquo;
            </p>
            <p className="font-serif font-semibold text-foreground">Priya Sharma</p>
          </div>
          <Link to="/reviews" className="btn-velvet inline-flex items-center gap-2 mt-6">
            Read All Reviews <FiArrowRight />
          </Link>
        </div>
      </section>

      {/* Team / Contact Persons */}
      <section className="section-padding bg-secondary/40">
        <div className="section-container max-w-3xl text-center">
          <h2 className="font-serif text-3xl font-bold text-foreground mb-3">
            Reach Out to Us
          </h2>
          <p className="text-muted-foreground mb-8">
            Have questions? Contact our team directly.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { name: "Archit Shinde", phone: "9762637183" },
              { name: "Yuvraj", phone: "9965123495" },
              { name: "Digvijay", phone: "9766357355" },
            ].map((person) => (
              <div key={person.phone} className="card-bakery p-6 text-center">
                <h3 className="font-serif font-semibold text-foreground text-lg mb-2">
                  {person.name}
                </h3>
                <a
                  href={`tel:+91${person.phone}`}
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <FiPhone size={16} /> +91 {person.phone}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-primary-foreground text-center">
        <div className="section-container max-w-2xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Ready to Order Your Dream Cake?
          </h2>
          <p className="opacity-80 mb-8">
            Custom designs, bulk orders, or walk-in — we are here to make your celebration special.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/custom-order" className="btn-gold">Request Custom Cake</Link>
            <Link to="/menu" className="btn-outline-cream">Browse Menu</Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
