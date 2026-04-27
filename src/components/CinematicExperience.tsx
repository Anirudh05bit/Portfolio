"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  useScroll, useTransform, useMotionValueEvent, motion, AnimatePresence
} from "framer-motion";

const FRAME_COUNT = 128;
const currentFrame = (i: number) =>
  `/sequence/frame_${i.toString().padStart(3, "0")}_delay-0.062s.png`;

export default function CinematicExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const renderRef = useRef(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [hideName, setHideName] = useState(false);

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

  const frameIndex = useTransform(scrollYProgress, [0, 0.1, 0.9], [0, 0, FRAME_COUNT - 1]);

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
    renderRef.current = Math.floor(v);
    if (imagesLoaded) drawImage(renderRef.current);
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.22) {
      setHideName(true);
    } else {
      setHideName(false);
    }
  });

  useEffect(() => {
    const onResize = () => { if (imagesLoaded) drawImage(renderRef.current); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [imagesLoaded, drawImage]);

  const yName = useTransform(scrollYProgress, [0, 0.22], [0, -160]);

  const scaleNameY = useTransform(scrollYProgress, [0, 0.05], [1.02, 1]);

  const yW1 = useTransform(scrollYProgress, [0.20, 0.42], [140, -60]);
  const opacityW1 = useTransform(scrollYProgress, [0.20, 0.28, 0.40, 0.48], [0, 1, 1, 0]);

  const yW2 = useTransform(scrollYProgress, [0.48, 0.68], [140, -60]);
  const opacityW2 = useTransform(scrollYProgress, [0.48, 0.56, 0.65, 0.72], [0, 1, 1, 0]);

  const yW3 = useTransform(scrollYProgress, [0.72, 0.94], [140, -60]);
  const opacityW3 = useTransform(scrollYProgress, [0.72, 0.80, 0.90, 0.96], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[700vh] w-full bg-[#080808]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black"
          >
            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 4, ease: "easeOut" }}
              src="/sequence/frame_0000_delay-0.062s.png"
              alt="Intro Background"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="relative z-10 text-3xl md:text-5xl lg:text-6xl text-white font-light uppercase tracking-[0.3em] text-center px-4"
            >
              Welcome To My Portfolio
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="absolute bottom-12 z-10 text-white/40 text-xs tracking-[0.3em] uppercase"
            >
              Scroll to enter
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* sticky canvas + overlays all together inside sticky div */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        <img
          src="/sequence/frame_000_delay-0.062s.png"
          alt="First Frame"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm"
            style={{ color: "rgba(255,255,255,0.8)", letterSpacing: "0.25em", fontSize: "11px", textTransform: "uppercase" }}>
            Loading…
          </div>
        )}
        <canvas ref={canvasRef} className="h-full w-full relative z-10" />
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 50%, rgba(0,0,0,0.6) 100%)" }} />

        {/* ── ALL OVERLAYS INSIDE STICKY DIV ── */}
        <div className="absolute inset-0 w-full z-30 pointer-events-none">

          {/* 01 — Name */}
          <AnimatePresence>
            {!hideName && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -100, filter: "blur(10px)" }}
                transition={{ duration: 0.6 }}
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
          {/* 02 — I build apps */}
          <motion.div style={{ y: yW1, opacity: opacityW1 }}
            className="absolute top-[30vh] left-0 w-full flex flex-col px-8 md:px-24">
            <p style={{
              fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: "1rem"
            }}>02</p>
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

          {/* 03 — Full Stack Developer */}
          <motion.div style={{ y: yW2, opacity: opacityW2 }}
            className="absolute top-[30vh] left-0 w-full flex flex-col px-8 md:px-24">
            <p style={{
              fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem"
            }}>03</p>
            <div style={{ borderLeft: "1px solid rgba(255,255,255,0.2)", paddingLeft: "1.5rem" }}>
              <h2 style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff", margin: 0
              }}>
                Full Stack<br />Developer.
              </h2>
              <p style={{
                marginTop: "1.25rem", fontSize: "15px", color: "rgba(255,255,255,0.45)",
                maxWidth: "380px", lineHeight: 1.75, fontWeight: 300
              }}>
                Student at Amrita Vishwa Vidyapeetham.<br />
                WEB-SIG Co-Lead, ACM Student Chapter.
              </p>
            </div>
          </motion.div>

          {/* 04 — Turning ideas */}
          <motion.div style={{ y: yW3, opacity: opacityW3 }}
            className="absolute top-[30vh] left-0 w-full flex flex-col px-8 md:px-24">
            <p style={{
              fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem"
            }}>04</p>
            <div style={{
              display: "flex", justifyContent: "space-between",
              alignItems: "flex-end", flexWrap: "wrap", gap: "2rem"
            }}>
              <h2 style={{
                fontSize: "clamp(2.2rem, 5.5vw, 4.5rem)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 1.0, color: "#fff",
                margin: 0, maxWidth: "600px"
              }}>
                Turning ideas<br />into products.
              </h2>
              <p style={{
                fontSize: "15px", color: "rgba(255,255,255,0.45)", maxWidth: "320px",
                lineHeight: 1.75, fontWeight: 300, textAlign: "right"
              }}>
                Pixta. Adapt AI. YathraMate.<br />
                Real apps, built from scratch.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

    </div>
  );
}