import { useState } from "react";
import { motion } from "framer-motion";

const videos = [
  {
    id: "iFWMDhkPEzk",
    title: "Perfect Lap — Monaco 2019",
    label: "QUALIFYING MAGIC",
    thumbnail: "https://img.youtube.com/vi/iFWMDhkPEzk/maxresdefault.jpg",
  },
  {
    id: "3P_54cBVb4A",
    title: "Brazil 2021 — Legendary Overtakes",
    label: "MASTERCLASS",
    thumbnail: "https://img.youtube.com/vi/3P_54cBVb4A/maxresdefault.jpg",
  },
  {
    id: "wkxsY4aAsys",
    title: "7th Title — Abu Dhabi 2020",
    label: "HISTORY MADE",
    thumbnail: "https://img.youtube.com/vi/wkxsY4aAsys/maxresdefault.jpg",
  },
  {
    id: "sVzGdrkYvbU",
    title: "Ferrari Era Begins — 2025",
    label: "NEW CHAPTER",
    thumbnail: "https://img.youtube.com/vi/sVzGdrkYvbU/maxresdefault.jpg",
  },
];

export default function VideoHighlights() {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <section id="highlights" className="py-32 bg-[#080808] relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-white tracking-wider uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            Iconic Moments
          </h2>
          <div className="w-24 h-1 bg-[#e10600] mt-4" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative aspect-video bg-black rounded-xl overflow-hidden border border-white/10 hover:border-[#e10600] transition-colors duration-300"
              style={{ boxShadow: "none" }}
            >
              {playingId === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.id}?autoplay=1`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={() => setPlayingId(video.id)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${video.thumbnail})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[#e10600]/90 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#e10600] transition-all duration-300" style={{ boxShadow: "0 0 20px rgba(225,6,0,0.5)" }}>
                      <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="inline-block px-3 py-1 bg-[#e10600] text-white text-xs font-black tracking-widest uppercase rounded-sm mb-3" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                      {video.label}
                    </div>
                    <h3
                      className="text-2xl font-bold text-white tracking-wide"
                      style={{ fontFamily: "'Orbitron', sans-serif", textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
                    >
                      {video.title}
                    </h3>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}