import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { menuItems, type MenuItem } from "@/data/menu";
import { BUSINESS } from "@/config/business";
import { FiShoppingCart, FiMessageCircle, FiFilter, FiShoppingBag } from "react-icons/fi";
import BackButton from "@/components/ui/BackButton";

/** Simple localStorage cart helper */
const getCart = (): MenuItem[] => {
  try {
    return JSON.parse(localStorage.getItem("velvet-cart") || "[]");
  } catch {
    return [];
  }
};
const addToCart = (item: MenuItem) => {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem("velvet-cart", JSON.stringify(cart));
};

const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [addedId, setAddedId] = useState<string | null>(null);

  const filtered =
    activeCategory === "All"
      ? menuItems
      : menuItems.filter((i) => i.category === activeCategory);

  const handleAdd = (item: MenuItem) => {
    addToCart(item);
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <main className="pt-24 pb-32">
      <div className="section-container">
        <BackButton />
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            Our Cakes &amp; Treats
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Every item is baked fresh daily with premium ingredients. Prices in INR.
          </p>
        </div>

        <div className="flex justify-center mb-6">
          <Link to="/cart" className="btn-velvet inline-flex items-center gap-2 text-sm">
            <FiShoppingBag size={16} /> View Cart / Order Summary
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {BUSINESS.categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat === "All" && <FiFilter className="inline mr-1 -mt-0.5" />}
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground flex-1 mb-3">
                    {item.description}
                  </p>
                  <p className="text-xl font-bold text-primary mb-3">
                    &#8377;{item.price}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAdd(item)}
                      className="btn-gold text-sm flex-1 flex items-center justify-center gap-1.5 py-2"
                    >
                      <FiShoppingCart size={14} />
                      {addedId === item.id ? "Added!" : "Add to Cart"}
                    </button>
                    <a
                      href={`https://wa.me/${BUSINESS.phoneRaw}?text=${BUSINESS.whatsappPrefill(
                        `${item.name} (Rs. ${item.price})`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-velvet text-sm flex items-center gap-1.5 py-2"
                      aria-label={`Enquire about ${item.name}`}
                    >
                      <FiMessageCircle size={14} /> Enquire
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
};

export default MenuPage;
