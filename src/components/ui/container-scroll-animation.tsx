"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
} from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(false);

  // 0 -> closed, 1 -> fully opened
  const [progress, setProgress] = useState(0);

  const rotate = useMotionValue(90);
  const scale = useMotionValue(1.05);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    rotate.set(90 - progress * 90);

    if (isMobile) {
      scale.set(0.7 + progress * 0.2);
    } else {
      scale.set(1.05 - progress * 0.05);
    }
  }, [progress, rotate, scale, isMobile]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const section = containerRef.current;

      if (!section) return;

      const rect = section.getBoundingClientRect();

      const isVisible =
        rect.top < window.innerHeight * 0.7 &&
        rect.bottom > window.innerHeight * 0.3;

      if (!isVisible) return;

      // Opening animation
      if (e.deltaY > 0 && progress < 1) {
        e.preventDefault();

        setProgress((prev) =>
          Math.min(1, prev + Math.abs(e.deltaY) * 0.0015)
        );
      }

      // Optional: close animation when scrolling up
      if (e.deltaY < 0 && progress > 0) {
        e.preventDefault();

        setProgress((prev) =>
          Math.max(0, prev - Math.abs(e.deltaY) * 0.0015)
        );
      }
    };

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [progress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem clamp(0.5rem, 5vw, 5rem)",
      }}
    >
      <div
        style={{
          width: "100%",
          position: "relative",
          padding: "2.5rem 0",
          perspective: "1000px",
        }}
      >
        <Header titleComponent={titleComponent} />

        <Card rotate={rotate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({
  titleComponent,
}: {
  titleComponent: string | React.ReactNode;
}) => {
  return (
    <div
      style={{
        maxWidth: "64rem",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {titleComponent}
    </div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        transformOrigin: "50% 100%",

        maxWidth: "64rem",
        margin: "4rem auto 0",
        width: "100%",

        border: "4px solid #6C6C6C",
        padding: "0.5rem",
        background: "#222222",
        borderRadius: "30px",

        boxShadow:
          "0 20px 40px rgba(0,0,0,0.25), 0 50px 100px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          height: "100%",
          width: "100%",
          overflow: "hidden",
          borderRadius: "16px",
          background: "#060908",
        }}
      >
        {children}
      </div>
    </motion.div>
  );
};