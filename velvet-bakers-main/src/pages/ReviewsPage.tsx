import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarRating from "@/components/ui/StarRating";
import BackButton from "@/components/ui/BackButton";
import { FiChevronLeft, FiChevronRight, FiPlus } from "react-icons/fi";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
}

const defaultReviews: Review[] = [
  { id: "1", name: "Priya Sharma", rating: 5, text: "The best chocolate truffle cake I have ever had! Perfect for my daughter's birthday.", date: "2025-12-10" },
  { id: "2", name: "Ravi Patil", rating: 5, text: "Our wedding cake was a masterpiece. Thank you Velvet Cake for making our special day even sweeter!", date: "2025-11-22" },
  { id: "3", name: "Aisha Khan", rating: 4, text: "Love the cupcakes — always fresh and beautifully decorated. My go-to bakery in Kolhapur.", date: "2026-01-05" },
  { id: "4", name: "Suresh Desai", rating: 5, text: "Ordered a photo cake for my parents' anniversary. They were so happy! Great quality and taste.", date: "2026-01-18" },
  { id: "5", name: "Meena Joshi", rating: 5, text: "The red velvet cake is divine. Perfectly moist with the right amount of sweetness.", date: "2026-02-02" },
];

const getStoredReviews = (): Review[] => {
  try {
    return JSON.parse(localStorage.getItem("velvet-reviews") || "[]");
  } catch {
    return [];
  }
};

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<Review[]>([...defaultReviews, ...getStoredReviews()]);
  const [current, setCurrent] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", rating: 5, text: "" });

  const next = () => setCurrent((c) => (c + 1) % reviews.length);
  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [reviews.length]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      rating: formData.rating,
      text: formData.text,
      date: new Date().toISOString().split("T")[0],
    };
    const stored = getStoredReviews();
    stored.push(newReview);
    localStorage.setItem("velvet-reviews", JSON.stringify(stored));
    setReviews([...defaultReviews, ...stored]);
    setFormData({ name: "", rating: 5, text: "" });
    setShowForm(false);
  };

  const review = reviews[current];

  return (
    <main className="pt-24 pb-32">
      <div className="section-container max-w-3xl">
        <BackButton />
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            What Our Customers Say
          </h1>
          <p className="text-muted-foreground">Real stories from happy customers.</p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={review.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.4 }}
              className="card-bakery p-8 md:p-12 text-center"
            >
              <StarRating rating={review.rating} size={20} />
              <p className="text-lg md:text-xl text-foreground mt-4 mb-6 italic leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="font-serif font-semibold text-foreground">{review.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{review.date}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 p-2 rounded-full bg-card shadow-md text-foreground hover:bg-secondary transition-colors"
            aria-label="Previous review"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 p-2 rounded-full bg-card shadow-md text-foreground hover:bg-secondary transition-colors"
            aria-label="Next review"
          >
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                i === current ? "bg-primary scale-125" : "bg-border"
              }`}
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* Add Review */}
        <div className="text-center mt-10">
          <button onClick={() => setShowForm(!showForm)} className="btn-gold flex items-center gap-2 mx-auto">
            <FiPlus /> Add Your Review
          </button>
        </div>

        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onSubmit={handleAddReview}
              className="mt-6 card-bakery p-6 space-y-4 overflow-hidden"
            >
              <input
                required
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData((f) => ({ ...f, rating: Number(e.target.value) }))}
                  className="px-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none"
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>{r} Stars</option>
                  ))}
                </select>
              </div>
              <textarea
                required
                placeholder="Share your experience..."
                value={formData.text}
                onChange={(e) => setFormData((f) => ({ ...f, text: e.target.value }))}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground outline-none focus:ring-2 focus:ring-primary/30"
              />
              <button type="submit" className="btn-velvet w-full py-3">
                Submit Review
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default ReviewsPage;
