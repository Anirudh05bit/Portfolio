import CinematicExperience from "@/components/CinematicExperience";
import Projects from "@/components/Projects";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white selection:bg-white/30">
      {/* 1. Cinematic Scrolling Experience (Hero, Images, and Text) */}
      <CinematicExperience />

      {/* 2. Projects / Work */}
      <Projects />
      
      {/* Footer */}
      <footer className="py-12 text-center text-white/40 bg-[#121212] border-t border-white/5 text-sm">
        <p>© {new Date().getFullYear()} Anirudh Suresh. All rights reserved.</p>
      </footer>
    </main>
  );
}
