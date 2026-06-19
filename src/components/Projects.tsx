"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import ShinyText from "./ShinyText";

/* ── Data ── */
const projects = [
  {
    id: 1,
    title: "Pixta",
    category: "Mobile App",
    year: "2025",
    description:
      "An Instagram-inspired social media mobile app built with Flutter and Cloudinary, featuring photo sharing, user feeds, and real-time media uploads with scalable cloud storage.",
    tags: ["Flutter", "Cloudinary", "Dart"],
    accent: "#3b82f6",
    num: "01",
    link: "https://github.com/Anirudh05bit/Social-Media-APP",
  },
  {
    id: 2,
    title: "Adapt AI",
    category: "Web App",
    year: "2026",
    description:
      "A clinical-grade, accessibility-first React and Tailwind web application offering a scalable UI framework for structured, multimodal ability assessment across disability categories.",
    tags: ["React", "Tailwind", "AI"],
    accent: "#10b981",
    num: "02",
    link: "https://github.com/Anirudh05bit/sense-align-assist",
  },
  {
    id: 3,
    title: "YathraMate",
    category: "Mobile App",
    year: "2025",
    description:
      "A scam protection mobile app helping travelers identify fair local prices and avoid overcharging. Built with React Native, Node.js backend and MySQL database.",
    tags: ["React Native", "Node.js", "MySQL"],
    accent: "#f97316",
    num: "03",
  },
];

const leadership = [
  {
    role: "Core Member & WEB-SIG Co-Lead",
    org: "ACM Student Chapter",
    period: "1/2025 – Present",
    description:
      "Organized and led 10+ technical seminars and bridge courses, mentoring 50+ students and guiding 15+ hands-on projects, increasing student technical participation by 40%.",
  },
];

const skills = {
  Languages: "Java, Python, C, JavaScript, Dart, Haskell",
  Frontend: "React.js, HTML5, CSS3, Tailwind CSS",
  Backend: "Node.js",
  Databases: "PostgreSQL, MySQL, MongoDB, Firebase",
  Mobile: "Flutter, React Native",
  Concepts: "DSA, OOP, Database Design",
};

const skillAccents = ["#3b82f6", "#10b981", "#f97316", "#8b5cf6", "#ec4899", "#14b8a6"];

/* ── CSS injected once ── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;600;700;800;900&display=swap');

  .kanit { font-family: 'Kanit', sans-serif; }

  .hero-heading {
    background: linear-gradient(180deg, #646973 0%, #BBCCD7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .contact-btn {
    background: linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%);
    box-shadow: 0px 4px 4px rgba(181,1,167,0.25), inset 4px 4px 12px #7721B1;
    outline: 2px solid white;
    outline-offset: -3px;
    border-radius: 9999px;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: clamp(0.6rem,1.5vw,1rem) clamp(1.5rem,3vw,3rem);
    font-size: clamp(0.7rem,1.2vw,0.95rem);
    cursor: pointer;
    border: none;
    font-family: 'Kanit', sans-serif;
    transition: opacity 0.2s;
  }
  .contact-btn:hover { opacity: 0.85; }

  .live-btn {
    border-radius: 9999px;
    border: 2px solid #D7E2EA;
    color: #D7E2EA;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    padding: 0.6rem 1.8rem;
    font-size: clamp(0.7rem,1.2vw,0.9rem);
    cursor: pointer;
    background: transparent;
    font-family: 'Kanit', sans-serif;
    transition: background 0.2s;
    text-decoration: none;
    display: inline-block;
  }
  .live-btn:hover { background: rgba(215,226,234,0.1); }

  /* Sticky project cards */
  .project-sticky {  position: sticky; 
    top: 6rem; 
    backdrop-filter: blur(12px); 
    -webkit-backdrop-filter: blur(12px); }
  
`;

function useGlobalCSS() {
  useEffect(() => {
    if (document.getElementById("jack-portfolio-css")) return;
    const style = document.createElement("style");
    style.id = "jack-portfolio-css";
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
  }, []);
}

/* ── Helpers ── */
function useReveal(amount = 0.1) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount });
  return { ref, inView };
}

function FadeIn({
  children,
  delay = 0,
  y = 30,
  x = 0,
  duration = 0.7,
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

/* Section heading with hero-heading gradient, Kanit style */
function SectionHeading({ text, color }: { text: string; color?: string }) {
  return (
    <FadeIn y={40}>
      <h2
        className="hero-heading kanit"
        style={{
          fontSize: "clamp(3rem,12vw,140px)",
          fontWeight: 900,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: "0.1em",
          ...(color
            ? {
                background: color,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }
            : {}),
        }}
      >
        {text}
      </h2>
    </FadeIn>
  );
}

/* Liquid glass card (kept from original) */
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

function LiquidCard({
  children,
  delay = 0,
  accent,
  borderRadius = "20px",
  style = {},
}: {
  children: React.ReactNode;
  delay?: number;
  accent?: string;
  borderRadius?: string;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.3 } }}
      style={{ ...liquidGlassBase, borderRadius, ...style }}
    >
      <GlassBorder accent={accent} />
      {children}
    </motion.div>
  );
}

/* Sticky stacking project card (Jack portfolio style) */
function StickyProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
}) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={containerRef} style={{ height: "85vh", position: "relative" }}>
      <motion.div
        className="project-sticky"
        style={{
          top: `${6 + index * 1.75}rem`,
          scale,
          transformOrigin: "top center",
          borderRadius: "clamp(30px,5vw,60px)",
          border: `2px solid ${project.accent}60`,
          background: "#0C0C0C",
          padding: "clamp(1rem,3vw,2rem)",
          willChange: "transform",
        }}
      >
        {/* Card top row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(0.5rem,2vw,1.5rem)",
            marginBottom: "clamp(0.75rem,2vw,1.5rem)",
            flexWrap: "wrap",
          }}
        >
          <span
            className="hero-heading kanit"
            style={{
              fontSize: "clamp(3rem,8vw,100px)",
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            {project.num}
          </span>

          <div style={{ flex: 1, minWidth: "120px" }}>
            <p
              className="kanit"
              style={{
                fontSize: "clamp(0.65rem,1.2vw,0.85rem)",
                color: project.accent,
                textTransform: "uppercase",
                letterSpacing: "0.22em",
                marginBottom: "0.2rem",
              }}
            >
              {project.category}
            </p>
            <h3
              className="kanit"
              style={{
                fontSize: "clamp(1rem,2.5vw,2rem)",
                fontWeight: 700,
                color: "#D7E2EA",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              <ShinyText speed={4}>{project.title}</ShinyText>
            </h3>
          </div>

          {(project as any).link && (
            <a href={(project as any).link} target="_blank" rel="noopener noreferrer" className="live-btn">
              Live Project
            </a>
          )}
        </div>

        {/* Description */}
        <p
          className="kanit"
          style={{
            fontSize: "clamp(0.78rem,1.4vw,1.05rem)",
            color: "rgba(215,226,234,0.55)",
            lineHeight: 1.7,
            fontWeight: 300,
            maxWidth: "680px",
            marginBottom: "clamp(0.75rem,2vw,1.5rem)",
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="kanit"
              style={{
                fontSize: "clamp(0.62rem,1vw,0.78rem)",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: project.accent,
                background: `${project.accent}10`,
                border: `1px solid ${project.accent}35`,
                borderRadius: "4px",
                padding: "3px 12px",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom accent bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            height: "1px",
            background: `linear-gradient(90deg, transparent, ${project.accent}60, transparent)`,
            transformOrigin: "left",
            marginTop: "clamp(0.75rem,2vw,1.5rem)",
          }}
        />
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function Projects() {
  useGlobalCSS();

  return (
    <div
      className="kanit"
      style={{
        background: "#0C0C0C",
        fontFamily: "'Kanit', sans-serif",
        position: "relative",
        overflowX: "clip",
      }}
    >
      {/* ══════════════════════════════
          PROJECTS SECTION
      ══════════════════════════════ */}
 {/* ══════════════════════════════
    PROJECTS SECTION
══════════════════════════════ */}
<section
  style={{
    background: "#000000",
    padding: "clamp(5rem,10vw,9rem) clamp(1.25rem,6vw,5rem) clamp(4rem,8vw,7rem)",
    position: "relative",
    overflow: "hidden",
  }}
>
  {/* ── DesignPro video background ── */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      opacity: 0.45,
      pointerEvents: "none",
    }}
  >
    <source
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_105406_16f4600d-7a92-4292-b96e-b19156c7830a.mp4"
      type="video/mp4"
    />
  </video>

  {/* ── Dark overlay ── */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(0, 0, 0, 0.1)",
      zIndex: 1,
      pointerEvents: "none",
    }}
  />

  {/* ── Content ── */}
  <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>

    {/* Eyebrow */}
    <FadeIn delay={0}>
      <p
        className="kanit"
        style={{
          fontSize: "clamp(0.65rem,1.1vw,0.85rem)",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#5ed29c",
          fontWeight: 500,
          marginBottom: "0.75rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{
          display: "inline-block", width: 6, height: 6,
          borderRadius: "50%", background: "#5ed29c",
          boxShadow: "0 0 8px #5ed29c",
        }} />
        
      </p>
    </FadeIn>

    <SectionHeading text="Things I've Built" />

    {/* Sticky stacking cards */}
    <div style={{ marginTop: "clamp(2rem,5vw,4rem)" }}>
      {projects.map((project, idx) => (
        <StickyProjectCard
          key={project.id}
          project={project}
          index={idx}
          total={projects.length}
        />
      ))}
    </div>
  </div>
</section>

      {/* ══════════════════════════════
          ABOUT / LEADERSHIP SECTION
          White background, rounded top — Jack portfolio Services style
      ══════════════════════════════ */}
   
<section
  style={{
    background: "#0C0C0C",
    borderRadius: "clamp(40px,6vw,60px) clamp(40px,6vw,60px) 0 0",
    padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,5rem)",
    marginTop: "-2rem",
    position: "relative",
    zIndex: 2,
    overflow: "hidden",
  }}
>
  {/* ── Ninja Turtle video background ── */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
      opacity: 1,
      pointerEvents: "none",
    }}
  >
    <source
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
      type="video/mp4"
    />
  </video>

  {/* ── Dark overlay for text legibility ── */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "rgba(7,11,10,0.05)",
      zIndex: 1,
      pointerEvents: "none",
    }}
  />

  {/* ── All existing leadership content, just add position relative + zIndex 2 ── */}
  <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative", zIndex: 2 }}>

<FadeIn y={40}>
  <h2
    className="kanit"
    style={{
      fontSize: "clamp(3rem,12vw,140px)",
      fontWeight: 900,
      textTransform: "uppercase",
      letterSpacing: "-0.03em",
      lineHeight: 1,
      color: "#ffffff",
      marginBottom: "clamp(2rem,5vw,4rem)",
      textAlign: "center",
      textShadow: "0 4px 40px rgba(0,0,0,0.8)",
    }}
  >
    Leadership
  </h2>
</FadeIn>

<div style={{ maxWidth: "900px", margin: "0 auto" }}>
  {leadership.map((item, idx) => (
    <FadeIn key={idx} delay={idx * 0.1} y={30}>

      {/* ── Premium frosted glass container ── */}
      <div
        style={{
          background: "rgba(5, 5, 8, 0.72)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "clamp(1.5rem, 3vw, 2.5rem) clamp(1.5rem, 3vw, 2.8rem)",
          marginBottom: "1.2rem",
          boxShadow: "0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Subtle left accent glow */}
        <div style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "3px",
          background: "linear-gradient(to bottom, #7c3aed, #b600a8, transparent)",
          borderRadius: "24px 0 0 24px",
        }} />

        {/* Top-right corner shine */}
        <div style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "180px",
          height: "180px",
          background: "radial-gradient(circle at top right, rgba(124,58,237,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div style={{
          display: "flex",
          gap: "clamp(1rem,3vw,2.5rem)",
          alignItems: "flex-start",
        }}>
          {/* Ghost number */}
          <span
            className="kanit"
            style={{
              fontSize: "clamp(2.5rem,6vw,72px)",
              fontWeight: 900,
              background: "linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1,
              flexShrink: 0,
              userSelect: "none",
              letterSpacing: "-0.04em",
            }}
          >
            {String(idx + 1).padStart(2, "0")}
          </span>

          <div style={{ flex: 1 }}>
            {/* Org label */}
            <p
              className="kanit"
              style={{
                fontSize: "clamp(0.6rem,0.9vw,0.72rem)",
                letterSpacing: "0.35em",
                textTransform: "uppercase",
                color: "#a78bfa",
                marginBottom: "0.45rem",
                fontWeight: 600,
              }}
            >
              {item.org}
            </p>

            {/* Role — large, crisp, white */}
            <h3
              className="kanit"
              style={{
                fontSize: "clamp(1.1rem,2.4vw,2rem)",
                fontWeight: 800,
                color: "#ffffff",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
                marginBottom: "0.75rem",
                lineHeight: 1.1,
                textShadow: "0 2px 20px rgba(0,0,0,0.6)",
              }}
            >
              {item.role}
            </h3>

            {/* Description — clean, readable */}
            <p
              className="kanit"
              style={{
                fontSize: "clamp(0.82rem,1.4vw,1.05rem)",
                color: "rgba(215,226,234,0.75)",
                lineHeight: 1.8,
                fontWeight: 300,
                maxWidth: "580px",
                marginBottom: "1rem",
              }}
            >
              {item.description}
            </p>

            {/* Period pill */}
            <span
              className="kanit"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "0.68rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(167,139,250,0.9)",
                border: "1px solid rgba(124,58,237,0.35)",
                background: "rgba(124,58,237,0.1)",
                borderRadius: "999px",
                padding: "4px 16px",
                fontWeight: 500,
              }}
            >
              <span style={{
                width: "5px", height: "5px", borderRadius: "50%",
                background: "#a78bfa",
                boxShadow: "0 0 6px #a78bfa",
                flexShrink: 0,
              }} />
              {item.period}
            </span>
          </div>
        </div>
      </div>

    </FadeIn>
  ))}
</div>
</div>
</section>
      {/* ══════════════════════════════
          SKILLS SECTION
          Dark, rounded top — overlapping
      ══════════════════════════════ */}
     ```jsx
<section
  style={{
    background: "#0C0C0C",
    borderRadius: "clamp(40px,6vw,60px) clamp(40px,6vw,60px) 0 0",
    padding: "clamp(4rem,8vw,8rem) clamp(1.25rem,6vw,5rem) clamp(5rem,10vw,9rem)",
    marginTop: "-2.5rem",
    position: "relative",
    zIndex: 3,
    overflow: "hidden",
  }}
>
  {/* Background Video */}
  <video
    autoPlay
    muted
    loop
    playsInline
    preload="none"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: 0.8,
      pointerEvents: "none",
      zIndex: 0,
    }}
  >
    <source
      src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_065045_c44942da-53c6-4804-b734-f9e07fc22e08.mp4"
      type="video/mp4"
    />
  </video>

  {/* Main Blur */}
  <div
    style={{
      position: "absolute",
      width: "984px",
      height: "527px",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      background: "#030712",
      opacity: 0.9,
      filter: "blur(82px)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  {/* Purple Glow */}
  <div
    style={{
      position: "absolute",
      width: "700px",
      height: "700px",
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "50%",
      background:
        "radial-gradient(circle, rgba(99,102,241,0.18), rgba(168,85,247,0.12), transparent 70%)",
      filter: "blur(80px)",
      pointerEvents: "none",
      zIndex: 0,
    }}
  />

  {/* Content */}
  <div
    style={{
      maxWidth: "1100px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    }}
  >
    {/* Eyebrow */}
    

    <SectionHeading text="The Stack" />

    {/* Skills Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(clamp(200px,28vw,280px), 1fr))",
        gap: "1rem",
        marginTop: "clamp(2rem,4vw,3.5rem)",
      }}
    >
      {Object.entries(skills).map(([category, value], idx) => {
        const accent = skillAccents[idx % skillAccents.length];

        return (
          <LiquidCard
            key={category}
            delay={idx * 0.07}
            accent={accent}
            borderRadius="20px"
          >
            <div style={{ padding: "1.8rem" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  background: `${accent}15`,
                  border: `1px solid ${accent}40`,
                  marginBottom: "1rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              </div>

              <p
                className="kanit"
                style={{
                  fontSize: "clamp(0.6rem,1vw,0.72rem)",
                  letterSpacing: "0.28em",
                  color: accent,
                  textTransform: "uppercase",
                  marginBottom: "0.45rem",
                  fontWeight: 600,
                  opacity: 0.85,
                }}
              >
                {category}
              </p>

              <p
                className="kanit"
                style={{
                  fontSize: "clamp(0.78rem,1.3vw,1rem)",
                  color: "rgb(185, 185, 185)",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {value}
              </p>
            </div>
          </LiquidCard>
        );
      })}
    </div>
  </div>
</section>
    </div>
  );
}