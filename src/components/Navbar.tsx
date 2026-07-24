import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  const navItems = [
    { label: "Home",          id: "hero" },
    { label: "Championships", id: "championships" },
    { label: "The Journey",   id: "teams" },
    { label: "Highlights",    id: "highlights" },
    { label: "Gallery",       id: "gallery" },
    { label: "Race Map",      id: "race-map" },
    { label: "Stats",         id: "stats" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#0a0a0a]/95 backdrop-blur-md py-4 border-b border-white/10"
          : "bg-transparent py-6"
      }`}>
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div
            className="text-2xl font-heading font-bold tracking-widest cursor-pointer flex items-center gap-2"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
            onClick={() => scrollTo("hero")}
          >
            <span className="text-[#e10600]">LH</span>
            <span className="text-white">44</span>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider" style={{ fontFamily: "'Orbitron', sans-serif" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-gray-400 hover:text-white transition-colors relative group uppercase"
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#e10600] transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
            <motion.span
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-0.5 bg-white rounded-full"
            />
            <motion.span
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
              className="block w-6 h-0.5 bg-white rounded-full origin-center"
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col pt-24 pb-10 px-8 md:hidden overflow-y-auto"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#e10600] to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-[50vw] font-black text-white/[0.03] leading-none" style={{ fontFamily: "'Orbitron', sans-serif" }}>44</span>
            </div>

            <nav className="relative z-10 flex flex-col gap-2 mt-4">
              {navItems.map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 40 }}
                  transition={{ delay: i * 0.06, duration: 0.3, ease: "easeOut" }}
                  onClick={() => scrollTo(item.id)}
                  className="group flex items-center justify-between w-full text-left py-5 border-b border-white/10 last:border-b-0"
                >
                  <span className="text-2xl font-bold tracking-widest text-gray-300 group-hover:text-white transition-colors duration-200 uppercase" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                    {item.label}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-white/20 group-hover:border-[#e10600] group-hover:bg-[#e10600]/10 flex items-center justify-center transition-all duration-300">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-gray-500 group-hover:text-[#e10600] transition-colors">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </span>
                </motion.button>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="mt-auto relative z-10 pt-8"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl font-black text-[#e10600]" style={{ fontFamily: "'Orbitron', sans-serif" }}>LH</span>
                <span className="text-3xl font-black text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>44</span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                Seven-time Formula 1 World Champion.<br />The greatest of all time.
              </p>
              <div className="w-16 h-[2px] bg-[#e10600] mt-4" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}