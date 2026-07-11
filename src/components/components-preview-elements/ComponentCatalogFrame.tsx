import type { ReactNode } from "react";

export function ComponentCatalogFrame({
  children,
  scale = "scale-[0.72]",
}: {
  children: ReactNode;
  scale?: string;
}) {
  return (
    <div className="h-full w-full overflow-hidden">
      <div className={`flex h-full w-full origin-center items-center justify-center ${scale}`}>
        {children}
      </div>
    </div>
  );
}
