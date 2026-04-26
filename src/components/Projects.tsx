"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Ethereal Ecommerce",
    category: "Web App",
    description: "A headless Shopify experience with immersive 3D product viewing and seamless transitions.",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Fintech Dashboard",
    category: "SaaS",
    description: "Real-time data visualization platform with customizable widgets and dark mode analytics.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    title: "AI Audio Studio",
    category: "Desktop App",
    description: "An electron-based audio manipulation tool using machine learning for stem separation.",
    color: "from-orange-500/20 to-red-500/20",
  },
  {
    id: 4,
    title: "Spatial Portfolio",
    category: "Creative",
    description: "WebXR enabled portfolio showcasing virtual reality environments directly in the browser.",
    color: "from-pink-500/20 to-rose-500/20",
  },
];

export default function Projects() {
  return (
    <section className="min-h-screen bg-[#121212] py-24 px-4 md:px-12 lg:px-24 relative z-20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Selected Works
          </h2>
          <p className="mt-4 text-white/60 text-lg">
            A collection of recent projects spanning web, mobile, and experiential design.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl -z-10" />
              
              <div className="relative h-full bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12 border border-white/5 flex flex-col justify-between">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${project.color} blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
                
                <div className="relative z-10">
                  <p className="text-sm font-medium text-white/50 tracking-wider uppercase mb-4">
                    {project.category}
                  </p>
                  <h3 className="text-3xl font-semibold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed max-w-sm">
                    {project.description}
                  </p>
                </div>

                <div className="relative z-10 mt-12 flex items-center gap-2 text-white group-hover:gap-4 transition-all duration-300">
                  <span className="font-medium">View Project</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
