import type { ReactNode } from "react";

export default function BlockPage({ children }: { children: ReactNode }) {
  return (
    <main className="h-dvh w-screen overflow-hidden bg-[#070709]" data-block-page="true">
      {children}
    </main>
  );
}
