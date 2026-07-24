import { motion } from "framer-motion";

const teams = [
  {
    name: "McLaren",
    period: "2007–2012",
    colors: ["#FF8700", "#C0C0C0"],
    carImage: "https://upload.wikimedia.org/wikipedia/commons/d/d5/McLaren-Mercedes_MP4-23_2008_F1_Lewis_Hamilton_LSideFront_MBMuse_9June2013_%2814980544591%29.jpg",
    carAlt: "McLaren MP4-23 Lewis Hamilton 2008",
    achievements: [
      "First Championship: 2008",
      "Debut at age 22 — Rookie season record",
      "100 points in debut season — a record at the time",
    ],
  },
  {
    name: "Mercedes",
    period: "2013–2024",
    colors: ["#00D2BE", "#C0C0C0"],
    carImage: "https://upload.wikimedia.org/wikipedia/commons/6/64/Lewis_Hamilton-Mercedes_W11_%283%29.jpg",
    carAlt: "Mercedes W11 Lewis Hamilton 2020",
    achievements: [
      "Six World Championships (2014–2020)",
      "Most successful driver-team partnership in F1 history",
      "103 race wins in 12 seasons",
    ],
  },
  {
    name: "Ferrari",
    period: "2025–Present",
    colors: ["#E10600", "#FFD700"],
    carImage: "https://upload.wikimedia.org/wikipedia/commons/2/26/2025_Japan_GP_-_Ferrari_-_SF-25_-_Thursday.jpg",
    carAlt: "Ferrari SF-25 2025",
    achievements: [
      "Dream move — Joining the legendary Scuderia",
      "The most anticipated transfer in F1 history",
      "A new chapter begins at Maranello",
    ],
  },
];

export default function Teams() {
  return (
    <section id="teams" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-white tracking-wider uppercase mb-4"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            The Journey
          </h2>
          <div className="w-24 h-1 bg-[#e10600] mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {teams.map((team, index) => (
            <motion.div
              key={team.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group relative rounded-2xl overflow-hidden bg-[#151515] border border-white/10"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${team.colors[0]}, ${team.colors[1]})` }}
              />

              <div className="p-10 relative z-10 h-full flex flex-col">
                <div className="mb-8 flex items-center justify-between">
                  <h3
                    className="text-3xl font-black uppercase text-white tracking-wider"
                    style={{ fontFamily: "'Orbitron', sans-serif" }}
                  >
                    {team.name}
                  </h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.colors[0] }} />
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: team.colors[1] }} />
                  </div>
                </div>

                <div
                  className="text-xl text-gray-400 mb-8 font-semibold tracking-widest border-b border-white/10 pb-4"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {team.period}
                </div>

                <ul className="space-y-4 flex-grow">
                  {team.achievements.map((a, i) => (
                    <li
                      key={i}
                      className="flex items-start text-gray-300 text-lg leading-relaxed"
                      style={{ fontFamily: "'Rajdhani', sans-serif" }}
                    >
                      <span
                        className="mr-3 mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: team.colors[0] }}
                      />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Car photo */}
              <div className="absolute bottom-0 left-0 right-0 h-40 overflow-hidden opacity-25 group-hover:opacity-50 transition-opacity duration-700 z-0 pointer-events-none">
                <img
                  src={team.carImage}
                  alt={team.carAlt}
                  className="w-full h-full object-cover object-center scale-110 group-hover:scale-100 transition-transform duration-700"
                  style={{ filter: "sepia(30%) saturate(1.5) brightness(0.6)" }}
                  loading="lazy"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, #151515 0%, transparent 40%, transparent 70%, #151515 100%), linear-gradient(to right, #151515 0%, transparent 20%, transparent 80%, #151515 100%)`,
                  }}
                />
              </div>

              <div
                className="absolute top-0 left-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20"
                style={{ backgroundColor: team.colors[0] }}
              />
              <div
                className="absolute bottom-0 right-0 w-full h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right z-20"
                style={{ backgroundColor: team.colors[1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}