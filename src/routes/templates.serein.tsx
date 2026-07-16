import { createFileRoute } from "@tanstack/react-router";
import { LiveTemplatePreview } from "@/components/templates/LiveTemplatePreview";

const SEREIN_URL = import.meta.env.VITE_SEREIN_URL || "https://serein-komorebi.vercel.app/";

export const Route = createFileRoute("/templates/serein")({
  component: SereinTemplatePage,
});

function SereinTemplatePage() {
  return (
    <LiveTemplatePreview
      url={SEREIN_URL}
      title="Serein — Place-led stays"
      returnStorageKey="komorebi_serein_return_to_gallery"
    />
  );
}
