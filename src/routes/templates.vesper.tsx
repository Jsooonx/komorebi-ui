import { createFileRoute } from "@tanstack/react-router";
import { LiveTemplatePreview } from "@/components/templates/LiveTemplatePreview";

const VESPER_URL = import.meta.env.VITE_VESPER_URL || "https://vesper-komorebi.vercel.app/";

export const Route = createFileRoute("/templates/vesper")({
  component: VesperTemplatePage,
});

function VesperTemplatePage() {
  return (
    <LiveTemplatePreview
      url={VESPER_URL}
      title="Vesper — Material studies"
      returnStorageKey="komorebi_vesper_return_to_gallery"
    />
  );
}
