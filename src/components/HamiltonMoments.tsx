import { motion } from "framer-motion";

const moments = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/7/71/Lewis_Hamilton_celebrating_victory_2010_Canada_1.jpg",
    year: "2010", label: "Montreal Victory", team: "McLaren", color: "#FF8700",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/3/32/Lewis_Hamilton_2013_Britain_Race.jpg",
    year: "2013", label: "Silverstone", team: "Mercedes", color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/6/65/Lewis_Hamilton_2014_China_Race.jpg",
    year: "2014", label: "Shanghai", team: "Mercedes", color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg",
    year: "2017", label: "Sepang", team: "Mercedes", color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/90/2018_Italian_Grand_Prix_Hamilton_%2844313902384%29.jpg",
    year: "2018", label: "Monza", team: "Mercedes", color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/24/2024_British_Grand_Prix%2C_Hamilton_%281%29.jpg",
    year: "2024", label: "British GP", team: "Mercedes", color: "#00D2BE",
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2025_Japan_GP_-_Ferrari_-_Lewis_Hamilton_-_FP1.jpg",
    year: "2025", label: "Suzuka • Ferrari", team: "Ferrari", color: "#E10600",
  },
];

export default function HamiltonMoments() {
  return (
    <section className="relative overflow-hidden py-6 bg-[#080808]">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e10600] to-transparent opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e10600] to-transparent opacity-60" />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs tracking-[0.4em] uppercase text-[#e10600]/70 mb-5"
        style={{ fontFamily: "'Orbitron', sans-serif" }}
      >
        Iconic Moments
      </motion.p>

      <div
        className="flex gap-4 overflow-x-auto pb-2 px-6 snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {moments.map((moment, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            className="group flex-shrink-0 snap-center relative w-52 md:w-64 h-72 md:h-80 rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            style={{ boxShadow: "none" }}
          >
            <img
              src={moment.url}
              alt={moment.label}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
            <div
              className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-widest"
              style={{ backgroundColor: moment.color, color: "#fff", fontFamily: "'Orbitron', sans-serif" }}
            >
              {moment.year}
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <p className="text-white font-bold text-sm tracking-wide leading-tight" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                {moment.label}
              </p>
              <p className="text-xs mt-0.5" style={{ color: moment.color, fontFamily: "'Rajdhani', sans-serif" }}>
                {moment.team}
              </p>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: moment.color }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}