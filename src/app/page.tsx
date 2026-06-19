import CinematicExperience from "@/components/CinematicExperience";
import ContactSection from "@/components/ContactSection";
import Projects from "@/components/Projects";
import AboutMe from "@/components/About";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30">
      {/* 1. Cinematic Scrolling Experience (Hero, Images, and Text) */}
      <CinematicExperience />
      <AboutMe/>
      {/* 2. Projects / Work */}
      <Projects />

      {/* 3. Contact */}
      <ContactSection />

        {/* Footer */}
        <footer className="py-12 text-center text-white/40 bg-[#121212] border-t border-white/5 text-sm">
          <p>© {new Date().getFullYear()} Anirudh Suresh. All rights reserved.</p>
        </footer>
    </main>
  );
}
