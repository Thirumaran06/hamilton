import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const galleryPhotos = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Lewis_Hamilton_celebrating_victory_2010_Canada_1.jpg",
    title: "Victory Celebration",
    subtitle: "2010 Canadian Grand Prix",
    era: "McLaren",
    color: "#FF8700",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/90/2018_Italian_Grand_Prix_Hamilton_%2844313902384%29.jpg",
    title: "Monza Master",
    subtitle: "2018 Italian Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/24/2024_British_Grand_Prix%2C_Hamilton_%281%29.jpg",
    title: "Home Hero",
    subtitle: "2024 British Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/F1_2014_JAP_Lewis_Hamilton_4968.jpg",
    title: "Championship Season",
    subtitle: "2014 Japanese Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/2021_United_States_Grand_Prix_23_%28cropped%29.jpg",
    title: "Austin Glory",
    subtitle: "2021 United States Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
    title: "Sepang Warrior",
    subtitle: "2016 Malaysian Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/68/Lewis_Hamilton_2010_Japan_Race.jpg",
    title: "Suzuka Sprint",
    subtitle: "2010 Japanese Grand Prix",
    era: "McLaren",
    color: "#FF8700",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Lewis_Hamilton_2013_Britain_Race.jpg",
    title: "Silverstone Legend",
    subtitle: "2013 British Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2014_China_Race.jpg",
    title: "Shanghai Sprint",
    subtitle: "2014 Chinese Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg",
    title: "Sepang Champion",
    subtitle: "2017 Malaysian Grand Prix",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/c/cf/2014_Chinese_Grand_Prix_post-race_podium_-_Lewis_Hamilton%2C_Nico_Rosberg_%26_Fernando_Alonso.jpg",
    title: "Podium Royalty",
    subtitle: "2014 Chinese GP Podium",
    era: "Mercedes",
    color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/78/2026_Chinese_GP_-_Ferrari_-_Lewis_Hamilton_-_Qualifying.jpg",
    title: "Scuderia Era Begins",
    subtitle: "2026 Chinese GP — Ferrari",
    era: "Ferrari",
    color: "#E10600",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2025_Japan_GP_-_Ferrari_-_Lewis_Hamilton_-_FP1.jpg",
    title: "Red at Suzuka",
    subtitle: "2025 Japanese GP — Ferrari",
    era: "Ferrari",
    color: "#E10600",
  },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");

  const filters = ["All", "McLaren", "Mercedes", "Ferrari"];
  const filtered = filter === "All" ? galleryPhotos : galleryPhotos.filter((p) => p.era === filter);

  const navigate = useCallback(
    (dir: number) => {
      if (lightboxIndex === null) return;
      const next = (lightboxIndex + dir + filtered.length) % filtered.length;
      setLightboxIndex(next);
    },
    [lightboxIndex, filtered.length]
  );

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") navigate(1);
      if (e.key === "ArrowLeft") navigate(-1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, navigate]);

  return (
    <section id="gallery" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, #e10600 0px, #e10600 1px, transparent 1px, transparent 80px)`,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-wider uppercase mb-4">
            The <span className="text-primary">Gallery</span>
          </h2>
          <p className="text-gray-400 font-body text-lg mb-8 max-w-xl mx-auto">
            A career in pictures — from Silverstone to Monza, McLaren to Ferrari
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mb-10" />

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full text-sm font-heading font-bold tracking-widest uppercase transition-all duration-300 border ${
                  filter === f
                    ? "bg-primary border-primary text-white shadow-lg shadow-primary/30"
                    : "border-white/20 text-gray-400 hover:border-white/50 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Masonry-style grid */}
        <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
          <AnimatePresence>
            {filtered.map((photo, index) => (
              <motion.div
                key={photo.url}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative break-inside-avoid cursor-pointer overflow-hidden rounded-xl border border-white/10 hover:border-white/30 transition-all duration-300"
                onClick={() => setLightboxIndex(index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={photo.url}
                    alt={photo.title}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-4">
                    <span
                      className="text-xs font-heading font-bold tracking-widest uppercase mb-1"
                      style={{ color: photo.color }}
                    >
                      {photo.era}
                    </span>
                    <p className="text-white font-heading font-bold text-base leading-tight">{photo.title}</p>
                    <p className="text-gray-300 font-body text-xs mt-1">{photo.subtitle}</p>
                  </div>

                  {/* Era badge always visible */}
                  <div
                    className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full shadow-lg"
                    style={{ backgroundColor: photo.color, boxShadow: `0 0 8px ${photo.color}` }}
                  />

                  {/* Zoom icon */}
                  <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                        <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                        <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-600 text-xs mt-10 font-body"
        >
          Photos sourced from Wikimedia Commons under Creative Commons licenses
        </motion.p>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 transition-colors"
              onClick={() => setLightboxIndex(null)}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3 }}
              className="max-w-5xl max-h-[80vh] mx-16 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].url}
                alt={filtered[lightboxIndex].title}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center">
                <span
                  className="text-xs font-heading font-bold tracking-widest uppercase"
                  style={{ color: filtered[lightboxIndex].color }}
                >
                  {filtered[lightboxIndex].era} Era
                </span>
                <h3 className="text-white font-heading font-bold text-xl mt-1">
                  {filtered[lightboxIndex].title}
                </h3>
                <p className="text-gray-400 font-body text-sm mt-1">
                  {filtered[lightboxIndex].subtitle}
                </p>
                <p className="text-gray-600 text-xs mt-3">
                  {lightboxIndex + 1} / {filtered.length} — Use arrow keys or click arrows to navigate
                </p>
              </div>
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-10 transition-colors"
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
            >
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
              </svg>
            </button>

            {/* Thumbnail strip */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto">
              {filtered.map((p, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                  className={`flex-shrink-0 w-12 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
                    i === lightboxIndex ? "border-primary scale-110" : "border-transparent opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={p.url} alt={p.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}