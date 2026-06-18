"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

function ContactForm() {
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
    <form
      onSubmit={onSubmit}
      style={{
        padding: "clamp(1rem, 2.5vw, 1.5rem)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
        boxSizing: "border-box",
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
          <p style={{ fontSize: "33px", fontWeight: 600, color: "#fff", marginBottom: "0.25rem" }}>
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
    </form>
  );
}

export default function ContactSection() {
  return (
    <section
      id="contact"
      style={{
        position: "relative",
        background: "#060908",
        fontFamily: "'Space Grotesk', sans-serif",
        overflow: "hidden",
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

      <ContainerScroll
        titleComponent={
          <>
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
              Scroll down and fill in your details
            </p>
          </>
        }
      >
        <ContactForm />
      </ContainerScroll>
    </section>
  );
}