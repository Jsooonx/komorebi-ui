import { useEffect, useRef } from "react";
import Hls from "hls.js";

const SRC = "https://stream.mux.com/rfmAy41mljxrk4K28xbeP6bt7UOMsf6d6Ce7C7Ul4vs.m3u8";

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

    return () => {
      if (hls) hls.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        zIndex: 0,
      }}
    />
  );
}
