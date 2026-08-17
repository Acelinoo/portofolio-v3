import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { projectsData } from '../../../data/projectsData';
import { useTransitionNavigate } from '../animations/TransitionContext';
import SplitLineReveal from '../animations/SplitLineReveal';

const categories = ['ALL', 'WEB APP', 'LANDING PAGE', 'ECOMMERCE'];

const Works = () => {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const navigateWithTransition = useTransitionNavigate();

  const filteredProjects =
    activeFilter === 'ALL'
      ? projectsData
      : projectsData.filter((project) => project.category === activeFilter);

  const handleProjectClick = (e, slug) => {
    e.preventDefault();
    navigateWithTransition(`/works/${slug}`);
  };

  return (
    <section
      id="works"
      className="w-full py-16 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-12 lg:px-20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top Header: Monospace Tag + Massive 'Selected works.' Display */}
        <div className="mb-10 sm:mb-14 md:mb-18 lg:mb-20">
          <div className="flex items-center gap-3 mb-3 sm:mb-5">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
              (WORKS — 03)
            </span>
            <span className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800" />
          </div>

          <SplitLineReveal
            as="h2"
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal font-sans tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6 sm:mb-8 md:mb-10"
          >
            Selected works.
          </SplitLineReveal>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-3.5 sm:px-5 py-1.5 sm:py-2 font-mono text-[11px] sm:text-xs md:text-sm font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                      : 'bg-transparent border border-gray-300 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white'
                  }`}
                  aria-pressed={isActive}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Responsive Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="group flex flex-col justify-between"
              >
                {/* 16:10 Landscape Screenshot Container */}
                <a
                  href={`/works/${project.slug}`}
                  onClick={(e) => handleProjectClick(e, project.slug)}
                  aria-label={`View case study for ${project.title}`}
                  className="relative w-full aspect-[16/10] overflow-hidden border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-black block mb-4 sm:mb-5 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width="800"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 will-change-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </a>

                {/* Project Metadata & Title */}
                <div>
                  <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2">
                    <div>
                      <span className="font-mono text-[10px] sm:text-xs uppercase tracking-widest text-gray-400 font-semibold mb-1 block">
                        {project.category}
                      </span>
                      <a
                        href={`/works/${project.slug}`}
                        onClick={(e) => handleProjectClick(e, project.slug)}
                        className="text-xl sm:text-2xl md:text-3xl font-bold font-sans tracking-tight text-gray-900 dark:text-white group-hover:opacity-60 transition-opacity block cursor-pointer"
                      >
                        {project.title}
                      </a>
                    </div>

                    {/* Action Button */}
                    <div className="flex items-center gap-2">
                      <a
                        href={`/works/${project.slug}`}
                        onClick={(e) => handleProjectClick(e, project.slug)}
                        aria-label={`Read case study for ${project.title}`}
                        className="w-9 h-9 sm:w-11 sm:h-11 border border-gray-300 dark:border-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all shrink-0 mt-1 font-mono text-xs cursor-pointer"
                        title="View Case Study"
                      >
                        <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
                    {project.description}
                  </p>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {(project.tech || project.stack || []).map((t, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/60 px-2.5 py-1 border border-gray-200 dark:border-gray-800"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default Works;