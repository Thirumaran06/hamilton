import { motion } from "framer-motion";

export default function Quote() {
  return (
    <section className="py-40 bg-[#050505] relative overflow-hidden flex items-center justify-center border-t border-[#e10600]/20">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(225,6,0,0.1) 0%, rgba(0,0,0,1) 70%)",
        }}
      />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <svg
            className="w-16 h-16 mx-auto mb-8"
            fill="rgba(225,6,0,0.4)"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>

          <blockquote
            className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight tracking-wide mb-12"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            "I'm still here, still fighting, still hungry.{" "}
            <br />
            <span
              style={{
                color: "#e10600",
                textShadow: "0 0 10px rgba(225,6,0,0.8)",
              }}
            >
              The journey continues.
            </span>
            "
          </blockquote>

          <div className="flex flex-col items-center">
            <div
              className="text-2xl text-[#c0c0c0] tracking-[0.3em] uppercase mb-8"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              — Lewis Hamilton
            </div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "200px" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
              className="h-1"
              style={{
                backgroundColor: "#ffd700",
                boxShadow: "0 0 15px rgba(255,215,0,0.8)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}