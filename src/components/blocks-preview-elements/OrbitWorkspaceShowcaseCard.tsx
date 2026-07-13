import type { ComponentPreviewProps } from "../../lib/components-manifest";

export default function OrbitWorkspaceShowcaseCard({ minimal = false }: ComponentPreviewProps) {
  return (
    <div className="w-full h-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      <video
        src="/Blocks-ProductShowcase-Orbit.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
