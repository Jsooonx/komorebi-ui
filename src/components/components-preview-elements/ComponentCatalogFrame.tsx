import type { ReactNode } from "react";

export function ComponentCatalogFrame({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: "default" | "pixel";
}) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="component-catalog-surface h-full w-full" data-variant={variant}>
        {children}
      </div>
    </div>
  );
}
