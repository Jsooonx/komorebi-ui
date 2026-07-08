import { startTransition, useEffect, useRef, useState, type ReactNode } from "react";

export default function DeferredSection({
  children,
  fallback,
  rootMargin = "320px 0px",
  className,
}: {
  children: ReactNode;
  fallback: ReactNode;
  rootMargin?: string;
  className?: string;
}) {
  const [isReady, setIsReady] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isReady || !mountRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) {
          return;
        }

        startTransition(() => {
          setIsReady(true);
        });
        observer.disconnect();
      },
      { rootMargin },
    );

    observer.observe(mountRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isReady, rootMargin]);

  return (
    <div ref={mountRef} className={className}>
      {isReady ? children : fallback}
    </div>
  );
}
