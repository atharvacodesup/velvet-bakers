import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { galleryImages } from "@/data/menu";
import { FiX, FiDownload } from "react-icons/fi";
import BackButton from "@/components/ui/BackButton";

const GalleryPage = () => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <main className="pt-24 pb-32">
      <div className="section-container">
        <BackButton />
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-3">
            Our Gallery
          </h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A glimpse of our creations — each cake tells a unique story.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedIdx(i)}
              className="w-full rounded-2xl overflow-hidden shadow-md break-inside-avoid cursor-pointer block"
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-auto object-cover"
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/80 backdrop-blur-md p-4"
            onClick={() => setSelectedIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="relative max-w-3xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedIdx].src}
                alt={galleryImages[selectedIdx].alt}
                className="w-full rounded-2xl shadow-2xl"
              />
              <p className="text-center text-primary-foreground font-serif text-lg mt-4">
                {galleryImages[selectedIdx].caption}
              </p>
              <div className="absolute top-3 right-3 flex gap-2">
                <a
                  href={galleryImages[selectedIdx].src}
                  download
                  className="p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                  aria-label="Download image"
                >
                  <FiDownload size={18} />
                </a>
                <button
                  onClick={() => setSelectedIdx(null)}
                  className="p-2 rounded-full bg-background/80 text-foreground hover:bg-background transition-colors"
                  aria-label="Close lightbox"
                >
                  <FiX size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default GalleryPage;
