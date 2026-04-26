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

  // Lock scroll while intro is showing, hide intro after 3 seconds
  useEffect(() => {
    if (showIntro) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showIntro]);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Hold on the first frame for the first 10% of scroll, then scrub
  const frameIndex = useTransform(scrollYProgress, [0, 0.1, 0.9], [0, 0, FRAME_COUNT - 1]);

  /* ── image preload ── */
  useEffect(() => {
    const loaded: HTMLImageElement[] = [];
    let count = 0;
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => { if (++count === FRAME_COUNT) { imagesRef.current = loaded; setImagesLoaded(true); } };
      loaded.push(img);
    }
  }, []);

  /* ── canvas draw (object-fit: cover) ── */
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

  useEffect(() => { if (imagesLoaded) drawImage(Math.floor(frameIndex.get())); }, [imagesLoaded, drawImage, frameIndex]);
  useMotionValueEvent(frameIndex, "change", (v) => { renderRef.current = Math.floor(v); if (imagesLoaded) drawImage(renderRef.current); });
  useEffect(() => {
    const onResize = () => { if (imagesLoaded) drawImage(renderRef.current); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [imagesLoaded, drawImage]);

  /* ── scroll-driven motion values ── */
  const yName = useTransform(scrollYProgress, [0, 0.2], [0, -180]);
  const opacityName = useTransform(scrollYProgress, [0, 0.05, 0.18, 0.22], [0, 1, 1, 0]);
  const scaleNameY = useTransform(scrollYProgress, [0, 0.05], [1.08, 1]);

  const yW1 = useTransform(scrollYProgress, [0.2, 0.45], [80, -80]);
  const opacityW1 = useTransform(scrollYProgress, [0.15, 0.25, 0.37, 0.45], [0, 1, 1, 0]);

  const yW2 = useTransform(scrollYProgress, [0.4, 0.7], [80, -80]);
  const opacityW2 = useTransform(scrollYProgress, [0.35, 0.5, 0.62, 0.7], [0, 1, 1, 0]);

  const yW3 = useTransform(scrollYProgress, [0.65, 0.95], [80, -200]);
  const opacityW3 = useTransform(scrollYProgress, [0.6, 0.75, 0.87, 0.95], [0, 1, 1, 0]);

  return (
    <div ref={containerRef} className="relative h-[600vh] w-full bg-[#080808]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}>

      <AnimatePresence>
        {showIntro && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
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
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── sticky canvas ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden z-0 bg-black">
        {/* Permanent fallback image so the first frame is always visible instantly */}
        <img
          src="/sequence/frame_000_delay-0.062s.png"
          alt="First Frame"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm"
            style={{ color: "rgba(255,255,255,0.8)", letterSpacing: "0.25em", fontSize: "11px", textTransform: "uppercase" }}>
            Loading Cinematic Experience…
          </div>
        )}
        <canvas ref={canvasRef} className="h-full w-full relative z-10" />
        <div className="absolute inset-0 pointer-events-none z-20"
          style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.7) 100%)" }} />
      </div>

      {/* ── overlays ── */}
      <div className="absolute inset-0 w-full z-10 pointer-events-none">

        {/* 01 — Name */}
        <motion.div style={{ y: yName, opacity: opacityName, scaleY: scaleNameY }}
          className="absolute top-[28vh] left-0 w-full flex flex-col items-center px-6">

          {/* eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            style={{
              fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)", marginBottom: "1.25rem"
            }}>
            Portfolio — 2025
          </motion.p>

          {/* main name with glitch */}
          <div className="relative">
            {/* ghost outline layer */}
            <motion.h1
              aria-hidden="true"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              style={{
                position: "absolute", top: "0.08em", left: 0,
                fontSize: "clamp(3.5rem, 11vw, 9rem)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 0.92,
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.12)",
                userSelect: "none", pointerEvents: "none",
              }}>
              Anirudh Suresh
            </motion.h1>

            {/* solid name */}
            <motion.h1
              initial={{ opacity: 0, filter: "blur(20px)", y: 30 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "clamp(3.5rem, 11vw, 9rem)", fontWeight: 700,
                letterSpacing: "-0.04em", lineHeight: 0.92,
                color: "#fff", position: "relative",
              }}>
              Anirudh Suresh
            </motion.h1>
          </div>

          {/* tag pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9 }}
            style={{ display: "flex", gap: "8px", marginTop: "1.5rem", flexWrap: "wrap", justifyContent: "center" }}>
            {["Full Stack", "Motion", "Design Engineering"].map((t) => (
              <span key={t} style={{
                fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                border: "0.5px solid rgba(255,255,255,0.2)", borderRadius: "100px",
                padding: "5px 14px", color: "rgba(255,255,255,0.4)",
              }}>{t}</span>
            ))}
          </motion.div>
        </motion.div>

        {/* 02 — Digital experiences */}
        <motion.div style={{ y: yW1, opacity: opacityW1 }}
          className="absolute top-[145vh] left-0 w-full flex flex-col items-center px-6 text-center">
          <p style={{
            fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: "1rem"
          }}>02</p>
          <h2 style={{
            fontSize: "clamp(2.2rem, 6vw, 5.5rem)", fontWeight: 300,
            letterSpacing: "-0.03em", lineHeight: 1.05, color: "#fff", margin: 0
          }}>
            I build{" "}
            <span style={{ color: "transparent", WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}>
              digital
            </span>{" "}
            experiences.
          </h2>
          <p style={{
            marginTop: "1.5rem", fontSize: "15px", color: "rgba(255,255,255,0.4)",
            maxWidth: "420px", lineHeight: 1.75, fontWeight: 300
          }}>
            High-performance animations and cutting-edge web technologies —<br />
            crafted to leave an impression.
          </p>
        </motion.div>

        {/* 03 — Full Stack Developer */}
        <motion.div style={{ y: yW2, opacity: opacityW2 }}
          className="absolute top-[295vh] left-0 w-full flex flex-col px-8 md:px-24">
          <p style={{
            fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem"
          }}>03</p>
          <div style={{ borderLeft: "1px solid rgba(255,255,255,0.15)", paddingLeft: "1.5rem" }}>
            <h2 style={{
              fontSize: "clamp(2.8rem, 7vw, 6rem)", fontWeight: 700,
              letterSpacing: "-0.04em", lineHeight: 0.95, color: "#fff", margin: 0
            }}>
              Full Stack<br />Developer.
            </h2>
          </div>
        </motion.div>

        {/* 04 — Bridging design & engineering */}
        <motion.div style={{ y: yW3, opacity: opacityW3 }}
          className="absolute top-[448vh] left-0 w-full flex flex-col px-8 md:px-24">
          <p style={{
            fontSize: "11px", letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)", marginBottom: "1.25rem"
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
              Bridging design<br />&amp; engineering.
            </h2>
            <p style={{
              fontSize: "15px", color: "rgba(255,255,255,0.4)", maxWidth: "320px",
              lineHeight: 1.75, fontWeight: 300, textAlign: "right"
            }}>
              Transforming static pixels into living,<br />breathing interactive journeys.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}