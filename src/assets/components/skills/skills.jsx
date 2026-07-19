import React from 'react';
import { SiReact, SiNextdotjs, SiTailwindcss, SiPrisma, SiPostgresql, SiJavascript } from 'react-icons/si';
import { FaJava, FaDatabase } from 'react-icons/fa';

const Skills = () => {
  const techStack = [
    { name: 'React.js', icon: <SiReact className="text-5xl" />, color: 'group-hover:text-[#61DAFB]' },
    { name: 'Next.js', icon: <SiNextdotjs className="text-5xl" />, color: 'group-hover:text-black dark:group-hover:text-white' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-5xl" />, color: 'group-hover:text-[#06B6D4]' },
    { name: 'Prisma', icon: <SiPrisma className="text-5xl" />, color: 'group-hover:text-[#2D3748]' },
    { name: 'PostgreSQL', icon: <SiPostgresql className="text-5xl" />, color: 'group-hover:text-[#336791]' },
    { name: 'Java', icon: <FaJava className="text-5xl" />, color: 'group-hover:text-[#007396]' },
    { name: 'JavaScript', icon: <SiJavascript className="text-5xl" />, color: 'group-hover:text-[#F7DF1E]' },
    { name: 'SheetDB', icon: <FaDatabase className="text-5xl" />, color: 'group-hover:text-[#34A853]' },
  ];

  return (
    <section id="skills" className="py-16 px-6 md:px-20 bg-gray-50 dark:bg-transparent transition-colors duration-300 w-full">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-10 tracking-wide text-gray-900 dark:text-white">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {techStack.map((tech, idx) => (
            <div key={idx} className="group relative flex flex-col items-center cursor-pointer">
              {/* Tooltip */}
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-800 text-white text-xs py-1 px-3 rounded pointer-events-none whitespace-nowrap shadow-md">
                {tech.name}
              </div>
              
              {/* Icon */}
              <div className={`text-gray-400 dark:text-gray-600 transition-all duration-300 transform group-hover:-translate-y-2 grayscale group-hover:grayscale-0 ${tech.color}`}>
                {tech.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
