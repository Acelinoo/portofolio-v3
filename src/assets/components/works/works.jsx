import React from 'react';

const projects = [
  {
    title: 'Neonest.id',
    description: 'Developed a robust service platform frontend. Optimized UI components using Next.js and Tailwind CSS, reducing layout shifts and improving rendering speed.',
    image: "/images/neonest.png",
    link: 'https://neonestid.vercel.app',
    tech: ['Next.js', 'Tailwind CSS', 'Typescript'],
  },
  {
    title: 'OrbitStation - MAINTENANCE',
    description: 'Built a real-time ISS tracker. Engineered efficient backend pipelines with Laravel to handle live telemetry data with minimal latency.',
    image: '/src/assets/images/grosirfy.png',
    link: '#',
    tech: ['Laravel', 'Vue'],
  },
  {
    title: 'TEvest - MAINTENANCE',
    description: 'Designed an online ticketing system. Structured scalable database architecture to support high concurrency during peak ticket sales.',
    image: '/src/assets/images/tevest.png',
    link: '#',
    tech: ['React', 'Tailwind CSS'],
  },
];

const Works = () => {
  return (
    <section id="works" className="py-16 px-4 md:px-16 bg-gray-50 dark:bg-[#0B192C]/50 transition-colors duration-300 w-full">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-12 text-center tracking-wide text-gray-900 dark:text-white">My Works</h2>
      
      {/* Projects Grid */}
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <a 
            key={index} 
            href={project.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <div className="overflow-hidden h-40">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="text-[10px] font-semibold tracking-wider bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded-full uppercase">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;