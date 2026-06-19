"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence
} from "framer-motion";

const FRAME_COUNT = 128; // Reduced from 128 → Much better performance
const currentFrame = (i: number) =>
  `/sequence/frame_${i.toString().padStart(3, "0")}_delay-0.062s.png`;

/** Single source of truth: scroll segments ↔ image frames (3 equal writeups) */
const WRITEUP_COUNT = 3;
const FRAMES_PER_WRITEUP = FRAME_COUNT / WRITEUP_COUNT;

const CINEMATIC = {
  SCROLL_VH: 800,
  FRAME_SCROLL_START: 0.06,
  FRAME_SCROLL_END: 0.94,
  segments: [
    { kind: "name" as const, from: 0, to: Math.floor(FRAMES_PER_WRITEUP) - 1 },
    { kind: "beat1" as const, from: Math.floor(FRAMES_PER_WRITEUP), to: Math.floor(FRAMES_PER_WRITEUP * 2) - 1 },
    { kind: "beat2" as const, from: Math.floor(FRAMES_PER_WRITEUP * 2), to: FRAME_COUNT - 1 },
  ],
};

function frameToScrollProgress(frame: number) {
  const { FRAME_SCROLL_START, FRAME_SCROLL_END } = CINEMATIC;
  const t = frame / (FRAME_COUNT - 1);
  return FRAME_SCROLL_START + t * (FRAME_SCROLL_END - FRAME_SCROLL_START);
}

function beatFromFrame(frame: number): 1 | 2 | null {
  const [, beat1, beat2] = CINEMATIC.segments;
  if (frame >= beat1.from && frame <= beat1.to) return 1;
  if (frame >= beat2.from && frame <= beat2.to) return 2;
  return null;
}

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hideName, setHideName] = useState(false);
  const [activeBeat, setActiveBeat] = useState<1 | 2 | null>(null);

  useEffect(() => {
    if (!showIntro) return;
    const dismiss = () => {
      setShowIntro(false);
      document.body.style.overflow = "auto";
    };
    window.addEventListener("wheel", dismiss, { once: true });
    window.addEventListener("touchmove", dismiss, { once: true });
    return () => {
      window.removeEventListener("wheel", dismiss);
      window.removeEventListener("touchmove", dismiss);
    };
  }, [showIntro]);

  useEffect(() => {
    if (showIntro) document.body.style.overflow = "hidden";
  }, [showIntro]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const frameIndex = useTransform(
    scrollYProgress,
    [0, CINEMATIC.FRAME_SCROLL_START, CINEMATIC.FRAME_SCROLL_END, 1],
    [0, 0, FRAME_COUNT - 1, FRAME_COUNT - 1]
  );

  // Progressive + Optimized Image Loading
  useEffect(() => {
    const loaded: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        if (++count === FRAME_COUNT) {
          imagesRef.current = loaded;
          setImagesLoaded(true);
        }
      };
      loaded.push(img);
    }
  }, []);

  const drawImage = useCallback((index: number) => {
    if (!canvasRef.current || imagesRef.current.length < FRAME_COUNT) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[index];
    if (!img) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ratio = Math.max(canvas.width / img.width, canvas.height / img.height);
    const ox = (canvas.width - img.width * ratio) / 2;
    const oy = (canvas.height - img.height * ratio) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, img.width, img.height, ox, oy, img.width * ratio, img.height * ratio);
  }, []);

  useEffect(() => {
    if (imagesLoaded) drawImage(Math.floor(frameIndex.get()));
  }, [imagesLoaded, drawImage, frameIndex]);

  useMotionValueEvent(frameIndex, "change", (v) => {
    const frame = Math.floor(v);
    renderRef.current = frame;
    if (imagesLoaded) drawImage(frame);

    const beat = beatFromFrame(frame);
    setActiveBeat(beat);
    setHideName(frame > CINEMATIC.segments[0].to);
  });

  useEffect(() => {
    const onResize = () => { if (imagesLoaded) drawImage(renderRef.current); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [imagesLoaded, drawImage]);

  const nameScrollEnd = frameToScrollProgress(CINEMATIC.segments[0].to);
  const yName = useTransform(scrollYProgress, [0, nameScrollEnd], [0, -120]);
  const scaleNameY = useTransform(scrollYProgress, [0, nameScrollEnd * 0.35], [1.02, 1]);

  const beatEnter = { opacity: 0, y: 40, filter: "blur(6px)" };
  const beatCenter = { opacity: 1, y: 0, filter: "blur(0px)" };
  const beatExit = { opacity: 0, y: -32, filter: "blur(4px)" };
  const beatTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <div ref={containerRef} className="w-full bg-[#080808]"
      style={{ position: "relative", fontFamily: "'Space Grotesk', sans-serif", height: `${CINEMATIC.SCROLL_VH}vh` }}>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 bg-black"
          >
            <motion.img
              initial={{ scale: 1.15 }}
              animate={{ scale: 1 }}
              transition={{ duration: 7, ease: "easeOut" }}
              src="/sequence/frame_0000_delay-0.062s.png"
              alt="Intro Background"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
            />

            <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col items-center pb-14 px-6">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1.3, delay: 0.6, ease: "easeInOut" }}
                style={{ height: "1px", background: "rgba(255,255,255,0.25)", marginBottom: "1.2rem" }}
              />

              {["WELCOME TO MY", "PORTFOLIO"].map((word, i) => (
                <div key={word} style={{ overflow: "hidden" }}>
                  <motion.p
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ duration: 1.1, delay: 0.7 + i * 0.28, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
                      fontWeight: 300,
                      letterSpacing: "0.2em",
                      color: "#ffffff",
                      lineHeight: 1.1,
                      textAlign: "center",
                    }}
                  >
                    {word}
                  </motion.p>
                </div>
              ))}

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "70%" }}
                transition={{ duration: 1.3, delay: 1.1, ease: "easeInOut" }}
                style={{ height: "1px", background: "rgba(255,255,255,0.25)", marginTop: "1.2rem" }}
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
                className="flex flex-col items-center gap-2 mt-6"
              >
                <p style={{
                  fontSize: "9px", letterSpacing: "0.35em",
                  color: "rgba(255,255,255,0.35)", textTransform: "uppercase"
                }}>
                  Scroll to enter
                </p>
                <div style={{ width: "1px", height: "35px", background: "rgba(255,255,255,0.1)", position: "relative", overflow: "hidden" }}>
                  <motion.div
                    animate={{ y: ["-100%", "200%"] }}
                    transition={{ duration: 1.7, repeat: Infinity, ease: "easeInOut" }}
                    style={{ width: "1px", height: "35px", background: "rgba(255,255,255,0.7)" }}
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        <img
          src="/sequence/frame_000_delay-0.062s.png"
          alt="First Frame"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm"
            style={{ color: "rgba(255,255,255,0.8)", letterSpacing: "0.25em", fontSize: "11px", textTransform: "uppercase" }}>
            Loading Cinematic...
          </div>
        )}
        <canvas ref={canvasRef} className="h-full w-full relative z-10" />
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />

        <div className="absolute inset-0 w-full z-30 pointer-events-none">

          {/* 01 — Name */}
          <AnimatePresence>
            {!hideName && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
                transition={{ duration: 0.85 }}
                style={{ y: yName, scaleY: scaleNameY }}
                className="absolute top-[28vh] left-0 w-full flex flex-col items-center px-6"
              >
                <div className="relative">
                  <h1
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      top: "0.08em",
                      left: 0,
                      fontSize: "clamp(3.5rem, 11vw, 9rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.92,
                      color: "transparent",
                      WebkitTextStroke: "1px rgba(255,255,255,0.18)",
                      userSelect: "none",
                      pointerEvents: "none",
                    }}
                  >
                    Anirudh Suresh
                  </h1>

                  <motion.h1
                    initial={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                    style={{
                      fontSize: "clamp(3.5rem, 11vw, 9rem)",
                      fontWeight: 700,
                      letterSpacing: "-0.04em",
                      lineHeight: 0.92,
                      color: "#ffffff",
                      position: "relative",
                      textShadow: "0 0 40px rgba(255,255,255,0.15)",
                    }}
                  >
                    Anirudh Suresh
                  </motion.h1>
                </div>

                <div
                  style={{
                    display: "flex",
                    gap: "8px",
                    marginTop: "1.5rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  {["Full Stack", "Flutter", "Computer Engineer"].map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "11px",
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        border: "0.5px solid rgba(255,255,255,0.35)",
                        borderRadius: "100px",
                        padding: "5px 14px",
                        color: "rgba(255,255,255,0.7)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scroll beats */}
          <div className="absolute top-[28vh] left-0 w-full px-8 md:px-24">
            <AnimatePresence mode="wait">
              {activeBeat === 1 && (
                <motion.div
                  key="beat-1"
                  initial={beatEnter}
                  animate={beatCenter}
                  exit={beatExit}
                  transition={beatTransition}
                  className="flex flex-col"
                >
                  <h2 style={{
                    fontSize: "clamp(2.2rem, 6vw, 5.5rem)", fontWeight: 300,
                    letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: 0,
                    maxWidth: "550px"
                  }}>
                    I build{" "}
                    <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.7)" }}>
                      apps
                    </span>{" "}
                    that matter.
                  </h2>
                  <p style={{
                    marginTop: "1.5rem", fontSize: "15px", color: "rgba(255,255,255,0.5)",
                    maxWidth: "380px", lineHeight: 1.75, fontWeight: 300
                  }}>
                    From mobile apps to full-stack web platforms —<br />
                    built with Flutter, React, and Node.js.
                  </p>
                </motion.div>
              )}

              {activeBeat === 2 && (
                <motion.div
                  key="beat-2"
                  initial={beatEnter}
                  animate={beatCenter}
                  exit={beatExit}
                  transition={beatTransition}
                  className="flex flex-col"
                >
                  <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "1.5rem" }}>
                    <h2 style={{
                      fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700,
                      letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff", margin: 0
                    }}>
                      Full Stack<br />Developer
                    </h2>
                    <p style={{
                      marginTop: "1.25rem", fontSize: "15px", color: "rgba(255,255,255,0.45)",
                      maxWidth: "380px", lineHeight: 1.75, fontWeight: 300
                    }}>
                      Student at Amrita Vishwa Vidyapeetham.<br />
                      ACM Student Chapter.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}