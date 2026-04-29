"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import ShinyText from "./ShinyText";

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

/* ─────────────────────────────────────────
   LIQUID GLASS STYLES (inline, no CSS file)
───────────────────────────────────────── */
const liquidGlassBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.01)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 4px 30px rgba(0,0,0,0.2)",
  border: "none",
  position: "relative",
  overflow: "hidden",
};

/* Simulates the ::before gradient border using an inner div */
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

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  return { ref, inView };
}

function BlurWord({ word, delay }: { word: string; delay: number }) {
  const { ref, inView } = useReveal();
  return (
    <motion.span
      ref={ref}
      initial={{ filter: "blur(14px)", opacity: 0, y: 50 }}
      animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ display: "inline-block", marginRight: "0.22em" }}
    >
      {word}
    </motion.span>
  );
}

function BlurHeading({ text, style = {} }: { text: string; style?: React.CSSProperties }) {
  return (
    <h2 style={style}>
      {text.split(" ").map((word, i) => (
        <BlurWord key={i} word={word} delay={i * 0.09} />
      ))}
    </h2>
  );
}

function SectionBadge({ text, color = "#5ed29c" }: { text: string; color?: string }) {
  const { ref, inView } = useReveal();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        marginBottom: "1.2rem",
      }}
    >
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }} />
      <span style={{
        fontSize: "11px", letterSpacing: "0.28em", fontWeight: 700,
        color, textTransform: "uppercase",
      }}>
        {text}
      </span>
    </motion.div>
  );
}

/* Liquid glass card wrapper */
function LiquidCard({
  children, delay = 0, accent, borderRadius = "20px", style = {},
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
      style={{
        ...liquidGlassBase,
        borderRadius,
        ...style,
      }}
    >
      <GlassBorder accent={accent} />
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function Projects() {
  return (
    <div
      style={{
        background: "#070b0a",
        fontFamily: "'Space Grotesk', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Global ambient glow ── */}
      <div style={{
        position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
        width: "900px", height: "300px", pointerEvents: "none", zIndex: 0,
      }}>
        <svg viewBox="0 0 900 300" style={{ width: "100%", height: "100%" }}>
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="25" result="blur" />
            </filter>
          </defs>
          <ellipse cx="450" cy="80" rx="380" ry="80" fill="#000000ff" filter="url(#glow)" opacity="0.7" />
        </svg>
      </div>

      {/* ── Vertical grid lines ── */}
      {[25, 50, 75].map(pct => (
        <div key={pct} style={{
          position: "fixed", top: 0, bottom: 0, left: `${pct}%`,
          width: "1px", background: "rgba(255,255,255,0.04)",
          pointerEvents: "none", zIndex: 0,
        }} />
      ))}

      {/* ══════════════════════════════
          PROJECTS SECTION
      ══════════════════════════════ */}
      <section style={{ padding: "clamp(6rem, 12vw, 10rem) clamp(1.5rem, 6vw, 6rem)", position: "relative", zIndex: 1 }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

          <SectionBadge text="Selected Works" />
          <BlurHeading
            text="Things I've built."
            style={{
              fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 0.92,
              textTransform: "uppercase",
              marginBottom: "3.5rem",
            }}
          />

          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {projects.map((project, idx) => (
              <LiquidCard key={project.id} delay={idx * 0.12} accent={project.accent}>
                <div style={{
                  padding: "2.5rem",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: "2rem",
                  alignItems: "start",
                }}>
                  <div>
                    {/* header row */}
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap" }}>
                      <span style={{
                        fontSize: "10px", fontFamily: "monospace",
                        color: "rgba(255,255,255,0.18)", letterSpacing: "0.1em",
                      }}>
                        {project.num}
                      </span>
                      <h3 style={{
                        fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 800,
                        letterSpacing: "-0.03em", lineHeight: 1,
                        textTransform: "uppercase",
                      }}>
                        <ShinyText speed={4}>{project.title}</ShinyText>
                      </h3>
                      <span style={{
                        fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase",
                        color: project.accent,
                        background: `${project.accent}12`,
                        border: `1px solid ${project.accent}35`,
                        borderRadius: "100px", padding: "3px 12px",
                      }}>
                        {project.category}
                      </span>
                    </div>

                    <p style={{
                      fontSize: "13px", color: "rgba(255,255,255,0.42)",
                      lineHeight: 1.8, maxWidth: "560px", marginBottom: "1.4rem",
                    }}>
                      {project.description}
                    </p>

                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      {project.tags.map(tag => (
                        <span key={tag} style={{
                          fontSize: "9px", letterSpacing: "0.14em", textTransform: "uppercase",
                          color: "rgba(255,255,255,0.28)",
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.07)",
                          borderRadius: "4px", padding: "3px 10px",
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* right */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "1rem" }}>
                    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.16)", letterSpacing: "0.1em" }}>
                      {project.year}
                    </span>
                    <motion.div
                      whileHover={{ scale: 1.15, borderColor: project.accent, boxShadow: `0 0 12px ${project.accent}50` }}
                      style={{
                        width: "38px", height: "38px", borderRadius: "50%",
                        border: "1px solid rgba(255,255,255,0.1)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        cursor: "pointer", transition: "all 0.3s",
                      }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                        <path d="M7 17L17 7M17 7H7M17 7V17" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.45" />
                      </svg>
                    </motion.div>
                  </div>
                </div>

                {/* bottom accent bar */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: idx * 0.12 + 0.4, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: "1px",
                    background: `linear-gradient(90deg, transparent, ${project.accent}50, transparent)`,
                    transformOrigin: "left",
                  }}
                />
              </LiquidCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          LEADERSHIP SECTION
      ══════════════════════════════ */}
      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionBadge text="Leadership" color="#7c3aed" />
          <BlurHeading
            text="Guiding teams. Driving impact."
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
              color: "#fff", letterSpacing: "-0.04em", lineHeight: 0.92,
              textTransform: "uppercase", marginBottom: "3rem",
            }}
          />

          {leadership.map((item, idx) => (
            <LiquidCard key={idx} delay={0.1} accent="#7c3aed">
              <div style={{ padding: "2.8rem 3rem", position: "relative" }}>
                {/* left accent bar */}
                <div style={{
                  position: "absolute", left: 0, top: "15%", bottom: "15%", width: "3px",
                  background: "linear-gradient(to bottom, #7c3aed, transparent)",
                  borderRadius: "0 2px 2px 0",
                }} />

                <div style={{
                  display: "flex", justifyContent: "space-between",
                  alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1.4rem",
                }}>
                  <div>
                    <p style={{
                      fontSize: "10px", letterSpacing: "0.28em",
                      color: "rgba(255,255,255,0.28)", textTransform: "uppercase", marginBottom: "0.4rem",
                    }}>
                      {item.org}
                    </p>
                    <h3 style={{
                      fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", fontWeight: 700,
                      color: "#fff", letterSpacing: "-0.02em",
                    }}>
                      {item.role}
                    </h3>
                  </div>
                  <div style={{ ...liquidGlassBase, borderRadius: "100px" }}>
                    <GlassBorder />
                    <span style={{
                      display: "block", fontSize: "10px", letterSpacing: "0.14em",
                      color: "rgba(255,255,255,0.35)", padding: "5px 16px",
                      textTransform: "uppercase",
                    }}>
                      {item.period}
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.48)", lineHeight: 1.8, maxWidth: "700px" }}>
                  {item.description}
                </p>
              </div>
            </LiquidCard>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════
          SKILLS SECTION
      ══════════════════════════════ */}
      <section style={{
        padding: "clamp(4rem, 10vw, 8rem) clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <SectionBadge text="Technical Skills" color="#5ed29c" />
          <BlurHeading
            text="The stack behind the work."
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4rem)", fontWeight: 800,
              color: "#fff", letterSpacing: "-0.04em", lineHeight: 0.92,
              textTransform: "uppercase", marginBottom: "3rem",
            }}
          />

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}>
            {Object.entries(skills).map(([category, value], idx) => {
              const accent = skillAccents[idx % skillAccents.length];
              return (
                <LiquidCard key={category} delay={idx * 0.07} accent={accent} borderRadius="16px">
                  <div style={{ padding: "1.8rem" }}>
                    {/* icon dot */}
                    <div style={{
                      width: "30px", height: "30px", borderRadius: "8px",
                      background: `${accent}15`,
                      border: `1px solid ${accent}30`,
                      marginBottom: "1rem",
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <div style={{
                        width: "8px", height: "8px", borderRadius: "50%",
                        background: accent, boxShadow: `0 0 8px ${accent}`,
                      }} />
                    </div>
                    <p style={{
                      fontSize: "10px", letterSpacing: "0.28em",
                      color: accent, textTransform: "uppercase", marginBottom: "0.5rem",
                      opacity: 0.8,
                    }}>
                      {category}
                    </p>
                    <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
                      {value}
                    </p>
                  </div>
                </LiquidCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════
          FOOTER
      ══════════════════════════════ */}
      <footer style={{
        padding: "2rem clamp(1.5rem, 6vw, 6rem)",
        borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", justifyContent: "space-between",
        alignItems: "center", flexWrap: "wrap", gap: "1rem",
        position: "relative", zIndex: 1,
      }}>
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.18)", letterSpacing: "0.06em" }}>
          © {new Date().getFullYear()} Anirudh Suresh. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["GitHub", "LinkedIn", "Resume"].map(link => (
            <motion.a
              key={link}
              href="#"
              whileHover={{ color: "#5ed29c" }}
              style={{
                fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.22)", textDecoration: "none",
              }}
            >
              {link}
            </motion.a>
          ))}
        </div>
      </footer>
    </div>
  );
}