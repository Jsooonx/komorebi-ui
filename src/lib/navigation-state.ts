export type NavigationOrigin = "/" | "/components" | "/blocks";

export interface NavigationOriginState {
  path: NavigationOrigin;
  scrollY: number;
}

const NAVIGATION_ORIGIN_KEY = "komorebi_navigation_origin";

export function setNavigationOrigin(path: NavigationOrigin, scrollY = 0) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(NAVIGATION_ORIGIN_KEY, JSON.stringify({ path, scrollY }));
  }
}

export function getNavigationOrigin(): NavigationOriginState | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = sessionStorage.getItem(NAVIGATION_ORIGIN_KEY);
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<NavigationOriginState>;
    if (
      (parsed.path === "/" || parsed.path === "/components" || parsed.path === "/blocks") &&
      typeof parsed.scrollY === "number"
    ) {
      return { path: parsed.path, scrollY: parsed.scrollY };
    }
  } catch {
    // Ignore legacy or malformed session values and use the safe home fallback.
  }

  return null;
}

export function clearNavigationOrigin() {
  if (typeof window !== "undefined") {
    sessionStorage.removeItem(NAVIGATION_ORIGIN_KEY);
  }
}
