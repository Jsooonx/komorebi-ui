import type { ReactNode } from "react";

export function ComponentCatalogFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-x-0 inset-y-5 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 w-[calc(100%+2rem)] -translate-x-1/2 -translate-y-1/2">
          {children}
        </div>
      </div>
    </div>
  );
}
