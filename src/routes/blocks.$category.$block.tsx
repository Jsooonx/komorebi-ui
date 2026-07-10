import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Minimize2 } from "lucide-react";
import { BLOCKS_MANIFEST } from "../lib/components-manifest";
import { getBlockPage } from "../components/blocks-elements";
import { getBlockCategorySlug, isBlockCategorySlug } from "../lib/block-routing";

export const Route = createFileRoute("/blocks/$category/$block")({
  component: BlockFullscreenPage,
});

function BlockFullscreenPage() {
  const { category, block } = Route.useParams();
  const navigate = useNavigate();
  const item = BLOCKS_MANIFEST.find((entry) => entry.id === block);
  const BlockPage = item ? getBlockPage(item.id) : undefined;
  const categorySlug = item ? getBlockCategorySlug(item.category) : undefined;
  const returnCategory = categorySlug || (isBlockCategorySlug(category) ? category : "header");

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        navigate({ to: "/blocks/$category", params: { category: returnCategory } });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [navigate, returnCategory]);

  if (!BlockPage) {
    return (
      <div className="flex h-dvh items-center justify-center bg-[#070709] text-white/60">
        Block not found.
      </div>
    );
  }

  return (
    <div className="group relative h-dvh w-screen overflow-hidden bg-[#070709]">
      <BlockPage />
      <button
        onClick={() => navigate({ to: "/blocks/$category", params: { category: returnCategory } })}
        className="absolute right-5 top-5 z-50 rounded-full border border-white/10 bg-black/60 p-2 text-white/65 opacity-0 shadow-lg transition-all hover:bg-black/90 hover:text-white group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
        title="Exit Fullscreen"
        aria-label="Exit Fullscreen"
      >
        <Minimize2 className="h-4 w-4" />
      </button>
    </div>
  );
}
