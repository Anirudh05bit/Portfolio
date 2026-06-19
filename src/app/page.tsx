// Portfolio-main/src/app/page.tsx
"use client";   // ← Add this at the top

import dynamic from 'next/dynamic';

// Dynamic imports for heavy components
const CinematicExperience = dynamic(
  () => import("@/components/CinematicExperience"),
  { 
    loading: () => <div className="h-screen w-full bg-[#0a0a0a]" /> 
  }
);

const Projects = dynamic(
  () => import("@/components/Projects"),
  { ssr: true }
);

const AboutMe = dynamic(
  () => import("@/components/About"),
  { ssr: true }
);

const ContactSection = dynamic(
  () => import("@/components/ContactSection"),
  { ssr: true }
);

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30">
      {/* 1. Cinematic Scrolling Experience */}
      <CinematicExperience />

      {/* 2. About Section */}
      <AboutMe />

      {/* 3. Projects / Work */}
      <Projects />

      {/* 4. Contact */}
      <ContactSection />

      {/* Footer */}
      <footer className="py-12 text-center text-white/40 bg-[#121212] border-t border-white/5 text-sm">
        <p>© {new Date().getFullYear()} Anirudh Suresh. All rights reserved.</p>
      </footer>
    </main>
  );
}