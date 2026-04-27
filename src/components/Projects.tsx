"use client";

import { motion } from "framer-motion";

const projects = [
  {
    id: 1,
    title: "Pixta",
    category: "Mobile App",
    description: "An Instagram-inspired social media mobile app built with Flutter and Cloudinary, featuring photo sharing, user feeds, and real-time media uploads with scalable cloud storage.",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    id: 2,
    title: "Adapt AI",
    category: "Web App",
    description: "A clinical-grade, accessibility-first React and Tailwind web application. Offers a scalable UI framework for structured, multimodal ability assessment and supportive assistance across disability categories.",
    color: "from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    title: "YathraMate",
    category: "Mobile App",
    description: "A scam protection mobile app that helps travelers identify fair local prices and avoid overcharging when visiting new places. Built with React Native, Node.js backend and MySQL database.",
    color: "from-orange-500/20 to-red-500/20",
  },
];

const leadership = [
  {
    role: "Core Member & WEB-SIG Co-Lead",
    org: "ACM Student Chapter",
    period: "1/2025 – Present",
    description: "Organized and led 10+ technical seminars and bridge courses, mentoring 50+ students and guiding 15+ hands-on projects, increasing student technical participation by 40%.",
  },
];

const skills = {
  Languages: "Java, Python, C, JavaScript, Dart, Haskell",
  Frontend: "React.js, HTML5, CSS3 (Vanilla CSS), Tailwind CSS",
  Backend: "Node.js",
  Databases: "PostgreSQL, MySQL, MongoDB, Firebase",
  Mobile: "Flutter, React Native",
  Concepts: "Data Structures & Algorithms, Object-Oriented Programming (OOP), Database Design",
};

export default function Projects() {
  return (
    <>
      {/* Projects Section */}
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
              A collection of recent projects spanning web and mobile.
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
                      <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-[#121212] py-24 px-4 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Leadership Impact
            </h2>
          </motion.div>

          <div className="flex flex-col gap-6">
            {leadership.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-all duration-500"
              >
                <div className="relative h-full bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12 border border-white/5">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-violet-500/20 to-indigo-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-white/50 tracking-wider uppercase mb-2">
                        {item.org}
                      </p>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.role}
                      </h3>
                    </div>
                    <span className="text-white/40 text-sm mt-2 md:mt-0">{item.period}</span>
                  </div>
                  <p className="relative z-10 text-white/70 leading-relaxed max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-[#121212] py-24 px-4 md:px-12 lg:px-24 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Technical Skills
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden p-[1px] bg-gradient-to-b from-white/10 to-transparent"
          >
            <div className="relative bg-[#1a1a1a]/80 backdrop-blur-xl rounded-[23px] p-8 md:p-12 border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/4 opacity-50" />
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, value]) => (
                  <div key={category}>
                    <p className="text-sm font-medium text-white/50 tracking-wider uppercase mb-2">
                      {category}
                    </p>
                    <p className="text-white/80 leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}