import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

function AnimatedCounter({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeProgress * end));
      if (progress < 1) animationFrame = requestAnimationFrame(step);
    };
    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  const name = "LEWIS HAMILTON";
  const nameLetters = name.split("");

  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-[#0a0a0a]"
    >
      {/* Giant 44 watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 select-none z-0">
        <span
          className="text-[40vw] font-black text-white leading-none tracking-tighter"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          44
        </span>
      </div>

      {/* Diagonal racing stripe */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute top-0 bottom-0 w-32 bg-[#e10600]/20 animate-stripe-sweep"
          style={{ transform: "skewX(-45deg)" }}
        />
      </div>

      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#00d2ff] to-transparent animate-speed-lines"
            style={{
              top: `${10 + i * 9}%`,
              left: 0,
              width: `${100 + i * 20}px`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${1 + i * 0.1}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center flex flex-col items-center px-4">
        {/* Animated name */}
        <h1
          className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter text-white flex gap-2 md:gap-4 flex-wrap justify-center overflow-hidden mb-6"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 150, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 100,
                delay: i * 0.05 + 0.5,
              }}
              className={letter === " " ? "w-4 md:w-8" : ""}
              style={{ textShadow: "0 0 10px rgba(255,255,255,0.5)" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="text-xl md:text-3xl font-bold text-[#c0c0c0] tracking-[0.2em] uppercase mb-16"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Seven Times World Champion
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex flex-wrap justify-center gap-8 md:gap-16 text-center"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          {[
            { label: "Wins",    value: 103 },
            { label: "Poles",   value: 104 },
            { label: "Titles",  value: 7   },
            { label: "Seasons", value: 23  },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center group">
              <span className="text-3xl md:text-5xl font-bold text-white mb-2 group-hover:text-[#e10600] transition-colors duration-300">
                <AnimatedCounter end={stat.value} duration={2.5} />
              </span>
              <span className="text-sm md:text-base tracking-widest text-gray-400 uppercase">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span
          className="text-xs tracking-widest text-gray-500 uppercase"
          style={{ fontFamily: "'Orbitron', sans-serif" }}
        >
          Scroll to explore
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#e10600] to-transparent relative overflow-hidden" />
      </motion.div>
    </section>
  );
}