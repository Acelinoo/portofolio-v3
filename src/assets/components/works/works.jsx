import React, { useState, useRef, useEffect } from 'react';
import { useInView } from 'framer-motion';
import ShapeBlur from '../animations/ShapeBlur';

const projects = [
  {
    id: 'project-1',
    title: 'Neonest.id',
    description: 'Developed a robust service platform frontend. Optimized UI components using Next.js and Tailwind CSS, reducing layout shifts and improving rendering speed.',
    image: "/images/neonest.webp",
    link: 'https://neonestid.vercel.app',
    tech: ['Next.js', 'Tailwind CSS', 'Typescript'],
  },
  {
    id: 'project-2',
    title: 'Learn With Acel',
    description: 'An interactive learning platform designed for a seamless educational experience, built with modern web technologies.',
    image: '/images/LWA.png',
    link: 'https://learnwithacel.vercel.app',
    tech: ['React', 'Tailwind CSS', 'Next.js'],
  }
];

const ProjectCardMobile = ({ project }) => {
  return (
    <div id={project.id} className="py-6 md:py-12">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 bg-white dark:bg-[#11223A] border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-lg flex flex-col w-full"
      >
        <div className="absolute inset-0 z-20 opacity-80 transition-opacity duration-700 pointer-events-none overflow-hidden flex justify-center items-center">
          <ShapeBlur variation={0} pixelRatioProp={1} shapeSize={1.0} roundness={0.25} />
        </div>
        <div className="w-full overflow-hidden h-48 border-b border-gray-100 dark:border-gray-800 relative bg-gray-50 dark:bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            width="800"
            height="450"
            className="w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="text-[10px] font-semibold tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full uppercase border border-gray-200 dark:border-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};

const ProjectCardDesktop = ({ project, setActiveProject }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });

  useEffect(() => {
    if (isInView) {
      setActiveProject(project.id);
    }
  }, [isInView, project.id, setActiveProject]);

  return (
    <div id={project.id} ref={ref} className="min-h-[80vh] flex items-center py-12 md:py-24">
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative z-10 bg-white dark:bg-[#11223A] border border-gray-100 dark:border-gray-800 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col w-full will-change-transform"
      >
        <div className="absolute inset-0 z-20 opacity-80 transition-opacity duration-700 pointer-events-none overflow-hidden flex justify-center items-center">
          <ShapeBlur variation={0} pixelRatioProp={1} shapeSize={1.0} roundness={0.25} borderSize={0.05} />
        </div>
        <div className="w-full overflow-hidden h-[240px] border-b border-gray-100 dark:border-gray-800 relative bg-gray-50 dark:bg-gray-900">
          <img
            src={project.image}
            alt={project.title}
            width="800"
            height="450"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
        </div>

        <div className="p-12 flex flex-col justify-center">
          <h3 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {project.tech.map((tech, idx) => (
              <span key={idx} className="text-xs font-semibold tracking-wider bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full uppercase border border-gray-200 dark:border-gray-700">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
};

const Works = () => {
  const [activeProject, setActiveProject] = useState(projects[0].id);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // Check immediately on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="works"
      className="relative transition-colors duration-300 w-full pt-32 pb-20 bg-gray-50 dark:bg-[#0B192C]"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-8 md:mb-16 text-center lg:text-left tracking-wide text-gray-900 dark:text-white">
          My Works
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative">

          {/* Left Column: Sticky Indicator */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-32">
              <div className="relative pl-8 py-4 border-l-[3px] border-gray-200 dark:border-gray-800">
                <ul className="space-y-12">
                  {projects.map((project) => {
                    const isActive = activeProject === project.id;
                    return (
                      <li key={project.id} className="relative cursor-pointer group" onClick={() => handleScrollTo(project.id)}>
                        {/* Indicator Dot */}
                        <span
                          className={`absolute -left-[38px] top-1.5 h-4 w-4 rounded-full transition-all duration-300 ${isActive
                            ? 'bg-blue-600 dark:bg-cyan-400 scale-125 ring-4 ring-blue-100 dark:ring-cyan-900/50'
                            : 'bg-gray-300 dark:bg-gray-700 scale-100 group-hover:bg-gray-400 dark:group-hover:bg-gray-600'
                            }`}
                        />
                        {/* Title Text */}
                        <span
                          className={`text-xl transition-all duration-300 block ${isActive
                            ? 'text-gray-900 dark:text-cyan-400 font-extrabold translate-x-3'
                            : 'text-gray-400 dark:text-gray-500 font-medium group-hover:text-gray-600 dark:group-hover:text-gray-400'
                            }`}
                        >
                          {project.title}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: Scrollable Content */}
          <div className="lg:col-span-8 flex flex-col">
            {projects.map((project) => (
              isMobile ? (
                <ProjectCardMobile key={project.id} project={project} />
              ) : (
                <ProjectCardDesktop
                  key={project.id}
                  project={project}
                  setActiveProject={setActiveProject}
                />
              )
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Works;