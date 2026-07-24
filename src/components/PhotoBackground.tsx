import { motion } from "framer-motion";

const hamiltonPhotos = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
    alt: "Lewis Hamilton 2016 Malaysia",
    style: { top: "5%", right: "-2%", width: "28vw", height: "65vh" },
    delay: 0,
    floatDir: -1,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/F1_2014_JAP_Lewis_Hamilton_4968.jpg",
    alt: "Lewis Hamilton 2014 Japan",
    style: { top: "22%", left: "-2%", width: "26vw", height: "60vh" },
    delay: 0.4,
    floatDir: 1,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/9/90/2018_Italian_Grand_Prix_Hamilton_%2844313902384%29.jpg",
    alt: "Lewis Hamilton 2018 Italian GP",
    style: { top: "55%", right: "-2%", width: "30vw", height: "52vh" },
    delay: 0.8,
    floatDir: -1,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/a/a9/2021_United_States_Grand_Prix_23_%28cropped%29.jpg",
    alt: "Lewis Hamilton 2021 US GP",
    style: { top: "68%", left: "-2%", width: "24vw", height: "44vh" },
    delay: 1.2,
    floatDir: 1,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/b/b8/2025_Japan_GP_-_Ferrari_-_Lewis_Hamilton_-_FP1.jpg",
    alt: "Lewis Hamilton Ferrari 2025",
    style: { top: "10%", left: "0%", width: "20vw", height: "48vh" },
    delay: 1.6,
    floatDir: 1,
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/2/24/2024_British_Grand_Prix%2C_Hamilton_%281%29.jpg",
    alt: "Lewis Hamilton 2024 British GP",
    style: { bottom: "4%", right: "0%", width: "25vw", height: "48vh" },
    delay: 2.0,
    floatDir: -1,
  },
];

export default function PhotoBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {hamiltonPhotos.map((photo, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: photo.delay + 0.8,
            duration: 2.5,
            ease: "easeOut",
          }}
          className="absolute"
          style={photo.style}
        >
          <motion.div
            animate={{ y: [0, photo.floatDir * 14, 0] }}
            transition={{
              duration: 9 + index * 1.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.7,
            }}
            className="w-full h-full relative"
          >
            <img
              src={photo.url}
              alt={photo.alt}
              className="w-full h-full object-cover object-top"
              style={{
                filter: "grayscale(20%) contrast(1.05) brightness(0.55)",
              }}
              loading="lazy"
            />
            {/* Edge fades */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, #0a0a0a 0%, transparent 22%, transparent 78%, #0a0a0a 100%), " +
                  "linear-gradient(to bottom, #0a0a0a 0%, transparent 12%, transparent 88%, #0a0a0a 100%)",
              }}
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Centre vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, transparent 0%, rgba(10,10,10,0.55) 100%)",
        }}
      />
    </div>
  );
}