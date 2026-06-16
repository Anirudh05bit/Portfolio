"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
  MotionValue,
} from "framer-motion";
import { useRef, useState, FormEvent } from "react";

const SCROLL_VH = 420;

function ContactForm({
  opacity,
  y,
}: {
  opacity: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    workplace: "",
    age: "",
    contact: "",
  });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "10px 12px",
    fontSize: "12px",
    color: "#fff",
    outline: "none",
    fontFamily: "inherit",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <motion.form
      onSubmit={onSubmit}
      style={{
        opacity,
        y,
        padding: "clamp(1rem, 2.5vw, 1.5rem)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        boxSizing: "border-box",
        pointerEvents: "auto",
      }}
    >
      {submitted ? (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(94, 210, 156, 0.15)",
              border: "1px solid #5ed29c",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✓
          </div>
          <p style={{ fontSize: "14px", fontWeight: 600, color: "#fff" }}>
            Thanks, {form.name || "friend"}!
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.45)" }}>
            I&apos;ll be in touch soon.
          </p>
        </div>
      ) : (
        <>
          <p style={{ fontSize: "13px", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
            Tell me a bit about you
          </p>
          <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", marginBottom: "0.5rem" }}>
            Name, where you work or study, age, and how to reach you.
          </p>

          <div>
            <label style={labelStyle} htmlFor="contact-name">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              required
              placeholder="Your full name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              style={fieldStyle}
            />
          </div>

          <div>
            <label style={labelStyle} htmlFor="contact-workplace">
              Workplace / Study place
            </label>
            <input
              id="contact-workplace"
              type="text"
              required
              placeholder="Company, college, or org"
              value={form.workplace}
              onChange={(e) => setForm((f) => ({ ...f, workplace: e.target.value }))}
              style={fieldStyle}
            />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
            <div>
              <label style={labelStyle} htmlFor="contact-age">
                Age
              </label>
              <input
                id="contact-age"
                type="number"
                min={1}
                max={120}
                required
                placeholder="Age"
                value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                style={fieldStyle}
              />
            </div>
            <div>
              <label style={labelStyle} htmlFor="contact-phone">
                Contact no.
              </label>
              <input
                id="contact-phone"
                type="tel"
                required
                placeholder="+91 …"
                value={form.contact}
                onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                style={fieldStyle}
              />
            </div>
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              marginTop: "auto",
              padding: "11px",
              borderRadius: "8px",
              border: "1px solid rgba(94,210,156,0.5)",
              background: "rgba(94,210,156,0.12)",
              color: "#5ed29c",
              fontSize: "10px",
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            Send
          </motion.button>
        </>
      )}
    </motion.form>
  );
}

function ScrollLaptop({ progress }: { progress: MotionValue<number> }) {
  const smooth = useSpring(progress, { stiffness: 70, damping: 20, mass: 0.35 });

  /* Closed: lid flat on keyboard. Open: screen tilted toward you */
  const lidRotate = useTransform(smooth, [0.08, 0.62], [-106, -18]);
  const lidLift = useTransform(smooth, [0.08, 0.62], [4, 48]);
  const lidShadow = useTransform(smooth, [0.08, 0.62], [0.12, 0.5]);

  const laptopY = useTransform(smooth, [0, 0.18], [60, 0]);
  const laptopScale = useTransform(smooth, [0, 0.2], [0.86, 1]);
  const laptopOpacity = useTransform(smooth, [0, 0.06], [0, 1]);

  const screenGlow = useTransform(smooth, [0.45, 0.72], [0, 1]);
  const formOpacity = useTransform(smooth, [0.52, 0.72], [0, 1]);
  const formY = useTransform(smooth, [0.52, 0.72], [28, 0]);
  const hintOpacity = useTransform(smooth, [0, 0.12, 0.48, 0.62], [1, 1, 0.35, 0]);
  const closedCoverOpacity = useTransform(smooth, [0.08, 0.32, 0.48], [1, 0.85, 0]);
  const screenReveal = useTransform(smooth, [0.22, 0.48], [0, 1]);
  const keyboardReveal = useTransform(smooth, [0.1, 0.38], [0.35, 1]);

  const screenBoxShadow = useTransform(
    screenGlow,
    (g) => `inset 0 0 ${36 + g * 70}px rgba(94,210,156,${0.06 + g * 0.14})`
  );
  const floorShadow = useTransform(
    lidShadow,
    (s) => `0 ${24 + s * 40}px ${50 + s * 80}px rgba(0,0,0,${0.35 + s * 0.25})`
  );

  const VIEW_TILT = -22;

  return (
    <motion.div
      style={{
        perspective: "2000px",
        perspectiveOrigin: "50% 42%",
        width: "min(100%, 720px)",
        margin: "0 auto",
        opacity: laptopOpacity,
        y: laptopY,
        scale: laptopScale,
      }}
    >
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          rotateX: VIEW_TILT,
          position: "relative",
          boxShadow: floorShadow,
        }}
      >
        {/* ── Screen lid — only this part rotates (hinge at bottom edge) ── */}
        <motion.div
          style={{
            transformStyle: "preserve-3d",
            transformOrigin: "50% 100%",
            rotateX: lidRotate,
            z: lidLift,
            position: "relative",
            zIndex: 4,
          }}
        >
          <div
            style={{
              background: "#0a0a0c",
              borderRadius: "14px 14px 4px 4px",
              padding: "11px 11px 0",
              border: "1px solid rgba(255,255,255,0.12)",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.35)",
              transformStyle: "preserve-3d",
            }}
          >
            {/* Closed: metal lid cover */}
            <motion.div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                background:
                  "linear-gradient(160deg, #45454d 0%, #2a2a30 35%, #141416 100%)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "inset 0 2px 4px rgba(255,255,255,0.12)",
                opacity: closedCoverOpacity,
                zIndex: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.08)",
                  background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.08), transparent)",
                }}
              />
              <span
                style={{
                  fontSize: "10px",
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                }}
              >
                Scroll to open
              </span>
            </motion.div>

            {/* Open: screen + form */}
            <motion.div style={{ opacity: screenReveal, position: "relative", zIndex: 1 }}>
              <div style={{ display: "flex", gap: "5px", marginBottom: "8px" }}>
                {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                  <div key={c} style={{ width: 9, height: 9, borderRadius: "50%", background: c }} />
                ))}
              </div>
              <motion.div
                style={{
                  aspectRatio: "16 / 10",
                  borderRadius: "4px 4px 0 0",
                  overflow: "hidden",
                  position: "relative",
                  background: "linear-gradient(160deg, #0f1419 0%, #080b0f 100%)",
                  boxShadow: screenBoxShadow,
                }}
              >
                <ContactForm opacity={formOpacity} y={formY} />
              </motion.div>
            </motion.div>
          </div>

          {/* Lid front edge (thickness) */}
          <div
            aria-hidden
            style={{
              height: "5px",
              margin: "0 6%",
              background: "linear-gradient(90deg, #1c1c20, #3d3d44, #1c1c20)",
              borderRadius: "0 0 3px 3px",
              transform: "translateZ(-3px)",
            }}
          />
        </motion.div>

        {/* ── Hinge barrel ── */}
        <div
          style={{
            position: "relative",
            zIndex: 5,
            height: "7px",
            margin: "0 8px",
            borderRadius: "4px",
            background:
              "linear-gradient(180deg, #4a4a52 0%, #252528 50%, #1a1a1c 100%)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.5)",
          }}
        />

        {/* ── Keyboard base (fixed, does not rotate) ── */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 3,
            transformStyle: "preserve-3d",
            translateZ: 0,
            opacity: keyboardReveal,
            background: "linear-gradient(180deg, #2a2a2e 0%, #1c1c1f 100%)",
            borderRadius: "4px 4px 10px 10px",
            padding: "14px 16px 16px",
            border: "1px solid rgba(255,255,255,0.08)",
            borderTop: "none",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(12, 1fr)",
              gap: "5px",
              marginBottom: "12px",
            }}
          >
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: "7px",
                  borderRadius: "2px",
                  background: "rgba(0,0,0,0.35)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              />
            ))}
          </div>
          <div
            style={{
              width: "38%",
              height: "22px",
              margin: "0 auto",
              borderRadius: "6px",
              background: "rgba(0,0,0,0.3)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          />
        </motion.div>

        {/* ── Bottom chassis lip ── */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            height: "12px",
            width: "96%",
            margin: "0 auto",
            borderRadius: "0 0 16px 16px",
            background: "linear-gradient(180deg, #242428, #121214)",
            transform: "translateZ(-4px)",
          }}
        />
      </motion.div>

      <motion.p
        style={{
          textAlign: "center",
          marginTop: "1.75rem",
          fontSize: "10px",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.3)",
          opacity: hintOpacity,
        }}
      >
        Keep scrolling to open
      </motion.p>
    </motion.div>
  );
}

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<"scroll" | "open" | "form">("scroll");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const headingY = useTransform(smoothProgress, [0, 0.5], [0, -20]);

  useMotionValueEvent(smoothProgress, "change", (v) => {
    if (v < 0.2) setPhase("scroll");
    else if (v < 0.6) setPhase("open");
    else setPhase("form");
  });

  return (
    <section
      id="contact"
      ref={containerRef}
      style={{
        position: "relative",
        height: `${SCROLL_VH}vh`,
        background: "#060908",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "clamp(1.5rem, 5vw, 3rem)",
          gap: "2rem",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(94,210,156,0.08) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        <motion.div style={{ textAlign: "center", zIndex: 2, y: headingY }}>
          <p
            style={{
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "#5ed29c",
              marginBottom: "0.75rem",
            }}
          >
            Get in touch
          </p>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              textTransform: "uppercase",
              lineHeight: 1,
            }}
          >
            Want to contact me?
          </h2>
          <p style={{ marginTop: "0.75rem", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
            {phase === "form"
              ? "Fill in your details below"
              : phase === "open"
                ? "Opening…"
                : "Scroll down to open the laptop"}
          </p>
        </motion.div>

        <div style={{ width: "100%", zIndex: 2 }}>
          <ScrollLaptop progress={smoothProgress} />
        </div>
      </div>
    </section>
  );
}
