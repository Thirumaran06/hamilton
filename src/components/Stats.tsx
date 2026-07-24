import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function StatCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(
        (timestamp - startTime) / (duration * 1000),
        1
      );
      const easeProgress =
        progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  {
    value: 103,
    label: "Race Wins",
    context: "More than any other driver",
    color: "#e10600",
  },
  {
    value: 104,
    label: "Pole Positions",
    context: "All-time record",
    color: "#00d2ff",
  },
  {
    value: 7,
    label: "World Championships",
    context: "Joint all-time record",
    color: "#ffd700",
  },
  {
    value: 195,
    label: "Podiums",
    context: "Unmatched consistency",
    color: "#c0c0c0",
  },
  {
    value: 23,
    label: "Seasons",
    context: "Still competing at the highest level",
    color: "#e10600",
  },
  {
    value: 5765,
    label: "Championship Points",
    context: "All-time record",
    color: "#00d2ff",
  },
];

export default function Stats() {
  return (
    <section id="stats" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-[#e10600]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
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
            By The Numbers
          </h2>
          <div className="w-24 h-1 bg-white mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="relative p-8 rounded-2xl bg-[#111] border border-white/5 overflow-hidden group"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundColor: stat.color }}
              />
              <div
                className="absolute -inset-[100%] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-3xl pointer-events-none rotate-45"
                style={{
                  backgroundImage: `linear-gradient(transparent, ${stat.color}, transparent)`,
                }}
              />

              <div className="relative z-10 text-center">
                <div
                  className="text-6xl md:text-7xl font-black mb-4 group-hover:scale-110 transition-transform duration-500"
                  style={{
                    color: stat.color,
                    textShadow: `0 0 20px ${stat.color}80`,
                    fontFamily: "'Orbitron', sans-serif",
                  }}
                >
                  <StatCounter end={stat.value} duration={2.5} />
                </div>
                <h3
                  className="text-2xl font-bold text-white tracking-wider uppercase mb-2"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {stat.label}
                </h3>
                <p
                  className="text-gray-400 text-lg"
                  style={{ fontFamily: "'Rajdhani', sans-serif" }}
                >
                  {stat.context}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}