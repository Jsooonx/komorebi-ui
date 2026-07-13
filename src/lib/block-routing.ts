export const BLOCK_CATEGORY_SLUGS = {
  header: "header",
  logoCloud: "logo-cloud",
  features: "features",
  parallax: "parallax",
  preloader: "preloader",
  productShowcase: "product-showcase",
} as const;

export type BlockCategorySlug = (typeof BLOCK_CATEGORY_SLUGS)[keyof typeof BLOCK_CATEGORY_SLUGS];

export function getBlockCategorySlug(category: string): BlockCategorySlug | undefined {
  if (category === "Headers & Menus") return BLOCK_CATEGORY_SLUGS.header;
  if (category === "Logo Cloud") return BLOCK_CATEGORY_SLUGS.logoCloud;
  if (category === "Features") return BLOCK_CATEGORY_SLUGS.features;
  if (category === "Parallax") return BLOCK_CATEGORY_SLUGS.parallax;
  if (category === "Preloader") return BLOCK_CATEGORY_SLUGS.preloader;
  if (category === "Product Showcase") return BLOCK_CATEGORY_SLUGS.productShowcase;
  return undefined;
}

export function isBlockCategorySlug(value: string): value is BlockCategorySlug {
  return Object.values(BLOCK_CATEGORY_SLUGS).includes(value as BlockCategorySlug);
}
