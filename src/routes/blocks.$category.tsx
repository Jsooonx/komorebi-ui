import { createFileRoute } from "@tanstack/react-router";
import { BlocksIndex } from "./blocks.index";
import { isBlockCategorySlug } from "../lib/block-routing";

export const Route = createFileRoute("/blocks/$category")({
  component: BlocksCategory,
});

function BlocksCategory() {
  const { category } = Route.useParams();
  return <BlocksIndex initialCategory={isBlockCategorySlug(category) ? category : "header"} />;
}
