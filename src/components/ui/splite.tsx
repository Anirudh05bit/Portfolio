"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const fullSize: React.CSSProperties = { width: "100%", height: "100%" };

  return (
    <div ref={containerRef} className={className} style={fullSize}>
      {shouldLoad ? (
        <Suspense
          fallback={
            <div
              style={{
                ...fullSize,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  border: "2px solid rgba(94,210,156,0.3)",
                  borderTopColor: "#5ed29c",
                  borderRadius: "50%",
                  animation: "about-spinner-rotate 0.8s linear infinite",
                }}
              />
            </div>
          }
        >
          <Spline scene={scene} style={fullSize} />
        </Suspense>
      ) : (
        <div
          style={{
            ...fullSize,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              border: "2px solid rgba(94,210,156,0.3)",
              borderTopColor: "#5ed29c",
              borderRadius: "50%",
              animation: "about-spinner-rotate 0.8s linear infinite",
            }}
          />
        </div>
      )}
    </div>
  );
}