import { useState } from "react";
import { motion } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const circuits = [
  { name: "Melbourne",          country: "Australia",    wins: 4, coords: [144.97, -37.84] },
  { name: "Sepang",             country: "Malaysia",     wins: 4, coords: [101.74,   2.76] },
  { name: "Shanghai",           country: "China",        wins: 6, coords: [121.22,  31.34] },
  { name: "Bahrain",            country: "Bahrain",      wins: 5, coords: [ 50.51,  26.03] },
  { name: "Catalunya",          country: "Spain",        wins: 7, coords: [  2.26,  41.57] },
  { name: "Monte Carlo",        country: "Monaco",       wins: 3, coords: [  7.42,  43.73] },
  { name: "Montreal",           country: "Canada",       wins: 7, coords: [-73.52,  45.50] },
  { name: "Silverstone",        country: "Great Britain",wins: 8, coords: [ -1.02,  52.07] },
  { name: "Hockenheim",         country: "Germany",      wins: 4, coords: [  8.57,  49.33] },
  { name: "Budapest",           country: "Hungary",      wins: 9, coords: [ 19.25,  47.58] },
  { name: "Spa-Francorchamps",  country: "Belgium",      wins: 5, coords: [  5.97,  50.44] },
  { name: "Monza",              country: "Italy",        wins: 5, coords: [  9.29,  45.62] },
  { name: "Singapore",          country: "Singapore",    wins: 4, coords: [103.86,   1.29] },
  { name: "Suzuka",             country: "Japan",        wins: 5, coords: [136.53,  34.84] },
  { name: "Abu Dhabi",          country: "UAE",          wins: 5, coords: [ 54.60,  24.47] },
  { name: "Austin",             country: "USA",          wins: 7, coords: [-97.64,  30.13] },
  { name: "Mexico City",        country: "Mexico",       wins: 3, coords: [-99.09,  19.40] },
  { name: "Sao Paulo",          country: "Brazil",       wins: 5, coords: [-46.70, -23.70] },
  { name: "Sochi",              country: "Russia",       wins: 5, coords: [ 39.96,  43.41] },
  { name: "Baku",               country: "Azerbaijan",   wins: 2, coords: [ 49.84,  40.37] },
  { name: "Portimao",           country: "Portugal",     wins: 2, coords: [ -8.54,  37.23] },
  { name: "Imola",              country: "Italy",        wins: 2, coords: [ 11.71,  44.34] },
  { name: "Losail",             country: "Qatar",        wins: 1, coords: [ 51.45,  25.49] },
];

export default function RaceMap() {
  const [tooltipContent, setTooltipContent] = useState<null | {
    name: string;
    country: string;
    wins: number;
  }>(null);

  const getMarkerSize = (wins: number) => {
    if (wins <= 3) return 4;
    if (wins <= 6) return 6;
    return 8;
  };

  return (
    <section id="race-map" className="py-32 bg-[#0d0d0d] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-6xl font-black text-[#ffd700] tracking-wider uppercase mb-4"
            style={{
              fontFamily: "'Orbitron', sans-serif",
              textShadow: "0 0 10px rgba(255,215,0,0.8)",
            }}
          >
            Race Victories Across The Globe
          </h2>
          <p
            className="text-xl text-gray-400 tracking-widest uppercase"
            style={{ fontFamily: "'Orbitron', sans-serif" }}
          >
            103 wins spanning 5 continents
          </p>
          <div className="w-24 h-1 bg-[#e10600] mx-auto mt-8" />
        </motion.div>

        <div className="relative mx-auto w-full max-w-[1200px] flex justify-center">
          <div
            className="relative w-full overflow-visible"
            style={{ maxWidth: "980px" }}
          >
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 147, center: [0, 20] }}
              width={980}
              height={500}
              style={{ width: "100%", height: "auto" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#1a1a2e"
                      stroke="#2a2a4a"
                      strokeWidth={0.5}
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none", fill: "#1f1f3a" },
                        pressed: { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {circuits.map((circuit, index) => {
                const size = getMarkerSize(circuit.wins);
                return (
                  <Marker
                    key={`${circuit.name}-${index}`}
                    coordinates={circuit.coords as [number, number]}
                    onMouseEnter={() => setTooltipContent(circuit)}
                    onMouseLeave={() => setTooltipContent(null)}
                  >
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.03,
                        duration: 0.5,
                        type: "spring",
                      }}
                    >
                      <circle
                        r={size * 2}
                        fill="#e10600"
                        className="animate-marker-pulse origin-center"
                      />
                      <circle r={size} fill="#e10600" />
                    </motion.g>
                  </Marker>
                );
              })}
            </ComposableMap>

            {tooltipContent && (
              <div className="absolute z-50 pointer-events-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-[150%] bg-[#0d0d0d]/80 backdrop-blur-md border border-[rgba(225,6,0,0.4)] rounded-lg p-4 shadow-xl whitespace-nowrap">
                <div
                  className="text-white text-lg font-bold"
                  style={{ fontFamily: "'Orbitron', sans-serif" }}
                >
                  {tooltipContent.name},{" "}
                  <span className="text-gray-400 font-normal">
                    {tooltipContent.country}
                  </span>
                </div>
                <div className="text-[#ffd700] font-bold mt-1 text-xl">
                  {tooltipContent.wins} Wins
                </div>
              </div>
            )}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto text-center"
        >
          {[
            { v: "23", l: "Circuits won at" },
            { v: "8",  l: "Wins at Silverstone" },
            { v: "9",  l: "Wins at Budapest" },
          ].map((s, i) => (
            <div
              key={i}
              className="p-6 border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm"
            >
              <div
                className="text-3xl font-bold text-white mb-2"
                style={{ fontFamily: "'Orbitron', sans-serif" }}
              >
                {s.v}
              </div>
              <div
                className="text-gray-400 uppercase tracking-widest text-sm"
                style={{ fontFamily: "'Rajdhani', sans-serif" }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}