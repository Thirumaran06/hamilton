import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Championships from "./components/Championships";
import Teams from "./components/Teams";
import VideoHighlights from "./components/VideoHighlights";
import Gallery from "./components/Gallery";
import HamiltonMoments from "./components/HamiltonMoments";
import Stats from "./components/Stats";
import Quote from "./components/Quote";
import RaceMap from "./components/RaceMap";
import PhotoBackground from "./components/PhotoBackground";
import MusicPlayer from "./components/MusicPlayer";
import BackToTop from "./components/BackToTop";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#e10600] selection:text-white relative">
      <PhotoBackground />
      <MusicPlayer />
      <BackToTop />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <HamiltonMoments />
        <Championships />
        <Teams />
        <VideoHighlights />
        <Gallery />
        <RaceMap />
        <Stats />
        <Quote />
      </main>
    </div>
  );
}

export default App;