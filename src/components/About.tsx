"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SplineScene } from "@/components/ui/splite";
import { Spotlight } from "@/components/ui/spotlight";

/* ── Data ── */
const stats = [
  { label: "Focus", value: "Full-Stack Dev" },
  { label: "Exploring", value: "AI / ML" },
  { label: "Based In", value: "Kerala, IN" },
];

const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
  "Node.js",
  "Tailwind CSS",
];

const socialLinks = [
  { name: "GitHub", url: "https://github.com/Anirudh05bit" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/anirudh-suresh-5015b7328/" },
  { name: "Instagram", url: "https://www.instagram.com/anirudhsuresh05/?hl=en" },
];

/* ── Shared CSS ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');

  .about-kanit { font-family: 'Kanit', sans-serif; }

  .about-hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  @keyframes about-spotlight {
    0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
    100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
  }

  .about-spotlight-anim {
    animation: about-spotlight 2s ease 0.75s 1 forwards;
  }
`;

function useAboutCSS() {
  useEffect(() => {
    if (document.getElementById("about-me-css")) return;
    const style = document.createElement("style");
    style.id = "about-me-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
}

/* ── Reveal helpers ── */
function useReveal(amount = 0.1) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Glass Components */
const liquidGlassBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.01)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 30px rgba(0,0,0,0.2)",
  border: "none",
  position: "relative",
  overflow: "hidden",
};

function GlassBorder({ accent }: { accent?: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "inherit",
        padding: "1.4px",
        background: accent
          ? `linear-gradient(180deg, ${accent}80 0%, ${accent}20 30%, transparent 60%, ${accent}20 80%, ${accent}60 100%)`
          : "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%)",
        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
        WebkitMaskComposite: "xor" as React.CSSProperties["WebkitMaskComposite"],
        maskComposite: "exclude" as React.CSSProperties["maskComposite"],
        pointerEvents: "none",
      }}
    />
  );
}

function GlassStat({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay }}
      style={{ ...liquidGlassBase, borderRadius: "14px" }}
    >
      <GlassBorder accent="#5ed29c" />
      <div style={{ padding: "0.85rem 1.1rem" }}>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(94,210,156,0.85)", fontWeight: 600, marginBottom: "0.3rem" }}>
          {label}
        </p>
        <p style={{ fontSize: "0.92rem", color: "#D7E2EA", fontWeight: 500 }}>
          {value}
        </p>
      </div>
    </motion.div>
  );
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(true);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isDesktop;
}

/* Main Component */
export default function AboutMe() {
  useAboutCSS();
  const isDesktop = useIsDesktop();

  return (
    <section
      id="about"
      className="about-kanit"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        padding: "clamp(5rem,10vw,8rem) clamp(1.25rem,6vw,5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ambient glow orbs */}
      <div style={{ position: "absolute", width: "700px", height: "700px", left: "20%", top: "10%", borderRadius: "50%", background: "radial-gradient(circle, rgba(94,210,156,0.10), rgba(59,130,246,0.05), transparent 70%)", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", width: "500px", height: "500px", right: "5%", bottom: "0%", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)", filter: "blur(90px)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 2 }}>
        <FadeIn delay={0}>
          <p className="about-kanit" style={{ fontSize: "clamp(0.65rem,1.1vw,0.85rem)", letterSpacing: "0.3em", textTransform: "uppercase", color: "#5ed29c", fontWeight: 500, marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#5ed29c", boxShadow: "0 0 8px #5ed29c" }} />
            Who I Am
          </p>
        </FadeIn>

        <FadeIn y={40} delay={0.05}>
          <h2 className="about-hero-heading about-kanit" style={{ fontSize: "clamp(2.75rem,8vw,90px)", fontWeight: 900, textTransform: "uppercase", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: "clamp(2rem,5vw,3.5rem)" }}>
            Anirudh Suresh
          </h2>
        </FadeIn>

        {/* Glass panel */}
        <div style={{ ...liquidGlassBase, borderRadius: "clamp(24px,3vw,40px)", border: "1px solid rgba(255,255,255,0.06)" }}>
          <GlassBorder accent="#5ed29c" />

          <div className="about-card-row" style={{ display: "flex", flexDirection: isDesktop ? "row" : "column", minHeight: "560px" }}>
            {/* Left Content */}
            <div style={{ flex: 1, padding: isDesktop ? "3rem" : "2rem", position: "relative", zIndex: 10, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <FadeIn delay={0.1}>
                <p className="about-kanit" style={{ fontSize: "clamp(0.95rem,1.6vw,1.15rem)", color: "rgba(215,226,234,0.85)", lineHeight: 1.8, fontWeight: 300, maxWidth: "560px" }}>
                  I am a Computer Science student at{" "}
                  <span style={{ color: "#5ed29c", fontWeight: 500 }}>Amrita Vishwa Vidyapeetham</span>, passionate about building modern web applications and exploring the world of Artificial Intelligence.
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p className="about-kanit" style={{ marginTop: "1.1rem", fontSize: "clamp(0.85rem,1.3vw,1rem)", color: "rgba(215,226,234,0.55)", lineHeight: 1.8, fontWeight: 300, maxWidth: "560px" }}>
                  My primary focus is full-stack development using React, Next.js, JavaScript, TypeScript, Node.js, and modern web technologies.
                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="about-kanit" style={{ marginTop: "0.9rem", fontSize: "clamp(0.85rem,1.3vw,1rem)", color: "rgba(215,226,234,0.55)", lineHeight: 1.8, fontWeight: 300, maxWidth: "560px" }}>
                  Beyond development, I constantly explore emerging technologies, contribute to personal projects, and strive to improve my technical skills every day.
                </p>
              </FadeIn>

              {/* Stats */}
              <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                {stats.map((stat, i) => (
                  <GlassStat key={stat.label} label={stat.label} value={stat.value} delay={0.35 + i * 0.07} />
                ))}
              </div>

              {/* Tech tags */}
              <FadeIn delay={0.55}>
                <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {techStack.map((tag) => (
                    <span
                      key={tag}
                      className="about-kanit"
                      style={{
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "#5ed29c",
                        background: "rgba(94,210,156,0.07)",
                        border: "1px solid rgba(94,210,156,0.3)",
                        borderRadius: "4px",
                        padding: "5px 13px",
                        fontWeight: 500,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </FadeIn>

              {/* Social Links (Text Only) */}
              <FadeIn delay={0.65}>
                <div style={{ marginTop: "2.5rem" }}>
                  <p style={{ fontSize: "0.75rem", color: "rgba(215,226,234,0.6)", marginBottom: "0.8rem", letterSpacing: "0.5px" }}>
                    CONNECT WITH ME
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {socialLinks.map((social) => (
                      <motion.a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ x: 4 }}
                        style={{
                          color: "#5ed29c",
                          textDecoration: "none",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        → {social.name}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right Content — Spline */}
            <div
              className="about-spline-pane"
              style={{
                flex: 1,
                position: "relative",
                minHeight: isDesktop ? "100%" : "340px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(90deg, rgba(12,12,12,0.5) 0%, transparent 30%)",
                  zIndex: 1,
                  pointerEvents: "none",
                }}
              />
              <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}