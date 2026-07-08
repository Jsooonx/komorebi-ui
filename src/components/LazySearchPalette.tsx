import { lazy, Suspense, useEffect, useState } from "react";

const SearchPalette = lazy(() => import("./SearchPalette"));

export default function LazySearchPalette() {
  const [isRequested, setIsRequested] = useState(false);
  const [openOnMount, setOpenOnMount] = useState(false);

  useEffect(() => {
    const handleIntent = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        setIsRequested(true);
        setOpenOnMount(true);
      }
    };

    const handleCustomOpen = () => {
      setIsRequested(true);
      setOpenOnMount(true);
    };

    window.addEventListener("keydown", handleIntent);
    window.addEventListener("open-search-palette", handleCustomOpen);

    return () => {
      window.removeEventListener("keydown", handleIntent);
      window.removeEventListener("open-search-palette", handleCustomOpen);
    };
  }, []);

  if (!isRequested) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <SearchPalette initialOpen={openOnMount} onInitialOpenHandled={() => setOpenOnMount(false)} />
    </Suspense>
  );
}
