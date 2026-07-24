import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const YOUTUBE_VIDEO_ID = "I6T2ZU1ShOQ";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const sendCommand = (func: string, args: unknown[] = []) => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: "command", func, args }),
      "*"
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      sendCommand("playVideo");
      sendCommand("mute");
      setIsPlaying(true);
      setIsMuted(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      sendCommand("pauseVideo");
    } else {
      sendCommand("playVideo");
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (isMuted) {
      sendCommand("unMute");
      sendCommand("setVolume", [60]);
    } else {
      sendCommand("mute");
    }
    setIsMuted(!isMuted);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 3, duration: 0.6, ease: "easeOut" }}
      className="fixed bottom-6 left-6 z-50"
    >
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${YOUTUBE_VIDEO_ID}&controls=0&showinfo=0&rel=0&modestbranding=1`}
        allow="autoplay; encrypted-media"
        className="absolute opacity-0 pointer-events-none w-1 h-1"
        title="Background Music"
      />

      <motion.div
        className="bg-[#111]/95 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl"
        animate={{ width: isExpanded ? 280 : 56 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="flex items-center gap-3 p-3">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-red-700 transition-colors"
            title="F1 Movie Soundtrack"
          >
            <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
            </svg>
          </button>

          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 flex-1 min-w-0"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-heading font-bold truncate tracking-wider">
                    JUST KEEP WATCHING
                  </p>
                  <p className="text-gray-400 text-[10px] truncate">F1 Movie Soundtrack</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={togglePlay}
                    className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    {isPlaying ? (
                      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isMuted ? "bg-primary/80 hover:bg-primary" : "bg-white/10 hover:bg-white/20"}`}
                    title={isMuted ? "Click to hear music" : "Mute"}
                  >
                    {isMuted ? (
                      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                        <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                      </svg>
                    ) : (
                      <svg viewBox="0 0 24 24" fill="white" className="w-3.5 h-3.5">
                        <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                      </svg>
                    )}
                  </button>

                  <button
                    onClick={() => setIsVisible(false)}
                    className="w-5 h-5 rounded-full bg-white/5 hover:bg-white/15 flex items-center justify-center transition-colors"
                  >
                    <svg viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {isExpanded && isMuted && (
          <div className="px-3 pb-3">
            <p className="text-[10px] text-primary/80 text-center animate-pulse">
              Click the speaker icon to enable sound
            </p>
          </div>
        )}
      </motion.div>

      {!isExpanded && isPlaying && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-primary"
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}