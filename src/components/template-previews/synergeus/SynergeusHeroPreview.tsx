import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import Hls from "hls.js";
import "./SynergeusHeroPreview.css";

const SRC = "https://stream.mux.com/rfmAy41mljxrk4K28xbeP6bt7UOMsf6d6Ce7C7Ul4vs.m3u8";

export default function SynergeusHeroPreview() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [slide, setSlide] = useState(0);

  // Video streaming setup
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    (video as any).defaultMuted = true;
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("webkit-playsinline", "true");
    video.setAttribute("playsinline", "true");
    video.setAttribute("muted", "");
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");

    let hls: Hls | null = null;
    const tryPlay = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") {
        p.catch((e) => console.warn("Video play blocked", e));
      }
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = SRC;
      video.addEventListener("loadedmetadata", tryPlay);
    } else if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(SRC);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, tryPlay);
    } else {
      video.src = SRC;
    }

    // Toggle slide animation
    const t = setTimeout(() => setSlide(1), 3000);
    const i = setInterval(() => {
      setSlide(0);
      setTimeout(() => setSlide(1), 3000);
    }, 6000);

    return () => {
      if (hls) hls.destroy();
      clearTimeout(t);
      clearInterval(i);
    };
  }, []);

  return (
    <div className="synergeus-preview w-full h-full absolute inset-0 overflow-hidden select-none text-left">
      {/* Background Mux Video Stream */}
      <div className="hero-video-container">
        <video ref={videoRef} autoPlay loop muted playsInline preload="none" className="w-full h-full object-cover" />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/15 to-black/65 z-[1]" />

      {/* Scoped Navbar */}
      <header className="absolute top-0 left-0 right-0 z-10 px-8 py-5 flex items-center justify-between">
        <img
          src="https://qclay.design/lovable/synergy/Logo-lov.svg"
          alt="Synergeus Logo"
          className="h-[22px]"
        />

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#1c1c1c]/75 backdrop-blur-md">
          {["Advisors", "What we do", "AI Intelligence", "Tools"].map((item, idx) => (
            <span
              key={item}
              className={`text-xs px-3.5 py-1.5 rounded-full ${idx === 2 ? "bg-white/10 text-white font-medium" : "text-white/60"} hover:text-white transition-colors cursor-pointer`}
            >
              {item}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-white/80 hover:text-white transition-colors cursor-pointer">Login</span>
          <button className="bg-white text-black text-xs font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors">
            Find an advisor
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="absolute inset-0 flex items-center justify-between px-12 z-[2] pt-12">
        {/* Left Header info */}
        <div className="max-w-[480px]">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="text-white text-6xl leading-[1.05] tracking-tight font-medium"
          >
            <span style={{ display: "block", fontWeight: 400 }}>Our AI simplify</span>
            <span style={{ display: "block", fontWeight: 400 }}>
              your <em className="font-serif italic font-normal text-white/90">financial life</em>
            </span>
          </motion.h1>

          <motion.button
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="pill-btn mt-8"
          >
            Start free trial now
            <span className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0">
              <ArrowUpRight className="w-3 h-3" />
            </span>
          </motion.button>
        </div>

        {/* Right story card */}
        <div className="perspective-[1200px] shrink-0 mr-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-[280px] h-[400px] rounded-3xl bg-[#1a1a1a] relative overflow-hidden shadow-2xl border border-white/10"
          >
            <img
              src="https://qclay.design/lovable/synergy/person-2.png"
              alt="Synergeus Person"
              className="absolute inset-0 w-full h-full object-cover"
              style={{ objectPosition: "center 20%" }}
            />
            {/* Blends */}
            <div className="absolute inset-0 pointer-events-none mix-blend-soft-light bg-gradient-to-tr from-[#508c28]/25 via-[#aae646]/35 to-[#dcff5a]/65" />
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_15%,rgba(230,255,120,0.25),transparent_55%)]" />

            {/* Simulated interactive message bubble overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/40 border border-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col justify-between h-[120px] transition-all">
              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#dcff5a] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-white/50 block">AI Financial Assistant</span>
                  <p className="text-white text-[10px] leading-snug mt-1 font-medium">
                    {slide === 0 
                      ? "Found 3 unnecessary premium subscriptions costing $32/mo."
                      : "We automated your $450 index fund transfer successfully."
                    }
                  </p>
                </div>
              </div>
              <div className="flex gap-1.5 mt-auto">
                <span className="h-1 flex-1 rounded bg-[#dcff5a] transition-all duration-300" style={{ opacity: slide === 0 ? 1 : 0.2 }} />
                <span className="h-1 flex-1 rounded bg-[#dcff5a] transition-all duration-300" style={{ opacity: slide === 1 ? 1 : 0.2 }} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
