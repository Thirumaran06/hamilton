import { motion } from "framer-motion";

const championships = [
  { year: 2008, team: "McLaren",  wins: 5,  color: "#FF8700" },
  { year: 2014, team: "Mercedes", wins: 11, color: "#00D2BE" },
  { year: 2015, team: "Mercedes", wins: 10, color: "#00D2BE" },
  { year: 2017, team: "Mercedes", wins: 9,  color: "#00D2BE" },
  { year: 2018, team: "Mercedes", wins: 11, color: "#00D2BE" },
  { year: 2019, team: "Mercedes", wins: 11, color: "#00D2BE" },
  { year: 2020, team: "Mercedes", wins: 11, color: "#00D2BE" },
];

const TrophyIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-16 h-16 transition-all duration-500 group-hover:scale-110"
    style={{ filter: "drop-shadow(0 0 8px rgba(255,215,0,0.8))" }}
  >
    <path d="M8 21h8" />
    <path d="M12 17v4" />
    <path d="M7 4h10" />
    <path d="M4 4h16v3a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6V4z" />
    <path d="M4 4v3a2 2 0 0 0 2 2h1" />
    <path d="M20 4v3a2 2 0 0 1-2 2h-1" />
  </svg>
);

export default function Championships() {
  return (
    <section id="championships" className="py-32 bg-[#111] relative overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 mb-16">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-black text-[#ffd700] tracking-wider uppercase"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            textShadow: "0 0 10px rgba(255,215,0,0.8)",
          }}
        >
          The Magnificent Seven
        </motion.h2>
        <div className="w-24 h-1 bg-[#ffd700] mt-4" />
      </div>

      <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory px-6 pb-12 pt-4 gap-8">
        {championships.map((champ, index) => (
          <motion.div
            key={champ.year}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex-shrink-0 w-[300px] md:w-[380px] snap-center snap-always"
          >
            <div
              className="group relative h-full bg-[#1a1a1a] rounded-xl p-8 border border-white/10 hover:border-transparent transition-all duration-500 overflow-hidden flex flex-col items-center text-center"
              style={{ transition: "transform 0.5s" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-16px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <div
                className="absolute top-0 left-0 w-full transition-all duration-500 z-0"
                style={{ backgroundColor: champ.color, height: "8px", opacity: 0.1 }}
              />
              <div className="relative z-10 text-[#ffd700] mb-6">
                <TrophyIcon />
              </div>
              <h3
                className="relative z-10 text-5xl md:text-6xl font-black text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {champ.year}
              </h3>
              <div className="relative z-10 flex-grow flex flex-col justify-end w-full pt-8">
                <div
                  className="text-xl font-bold text-white mb-1 tracking-widest uppercase"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {champ.team}
                </div>
                <div className="text-gray-400 text-lg" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                  {champ.wins} Race Wins
                </div>
              </div>
              <div
                className="absolute inset-0 border-2 rounded-xl pointer-events-none"
                style={{
                  borderColor: champ.color,
                  boxShadow: `inset 0 0 20px ${champ.color}40`,
                  opacity: 0,
                  transition: "opacity 0.5s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "0")}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}