import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import Background from "@/components/pallet/Background";
import Navbar from "@/components/pallet/Navbar";
import ScrollCards from "@/components/pallet/ScrollCards";
import SectionOne from "@/components/pallet/SectionOne";
import SectionTwo from "@/components/pallet/SectionTwo";
import SectionThree from "@/components/pallet/SectionThree";
import SectionFour from "@/components/pallet/SectionFour";
import SectionFive from "@/components/pallet/SectionFive";
import Footer from "@/components/pallet/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor: "var(--background)",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <Background />
      <Navbar />
      <ScrollCards containerRef={containerRef} />
      <div style={{ position: "relative", zIndex: 10 }}>
        <SectionOne />
        <SectionTwo />
        <SectionThree />
        <SectionFour />
        <SectionFive />
        <Footer />
      </div>
    </div>
  );
}
