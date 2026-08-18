import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { projectsData, featuredProjectSlugs } from '../../../data/projectsData';
import { useTransitionNavigate } from '../animations/TransitionContext';
import SplitLineReveal from '../animations/SplitLineReveal';

const Works = () => {
  const navigateWithTransition = useTransitionNavigate();

  // Curate exactly the 4 requested flagship projects in order
  const featuredProjects = featuredProjectSlugs
    .map((slug) => projectsData.find((p) => p.slug === slug))
    .filter(Boolean);

  const handleProjectClick = (e, slug) => {
    e.preventDefault();
    navigateWithTransition(`/works/${slug}`);
  };

  const handleViewAllClick = (e) => {
    e.preventDefault();
    navigateWithTransition('/works');
  };

  return (
    <section
      id="works"
      className="w-full py-16 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-12 lg:px-20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top Header: Monospace Tag + Massive 'Selected works.' Display */}
        <div className="mb-10 sm:mb-14 md:mb-18 lg:mb-20 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
                (FEATURED WORKS — 03)
              </span>
              <span className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800" />
            </div>

            <SplitLineReveal
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal font-sans tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            >
              Selected works.
            </SplitLineReveal>
          </div>

          <p className="font-mono text-xs sm:text-sm text-gray-500 uppercase tracking-widest max-w-xs">
            Showcasing 4 flagship digital products engineered across Full-Stack &amp; Frontend specialization.
          </p>
        </div>

        {/* 2-Column Responsive Card Grid for 4 Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
        </div>

        {/* Bottom CTA Button: View All Works */}
        <div className="mt-14 sm:mt-20 md:mt-24 pt-10 border-t border-gray-100 dark:border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-1">
              PORTFOLIO ARCHIVE
            </span>
            <p className="text-sm sm:text-base font-sans text-gray-700 dark:text-gray-300">
              Explore the complete collection of {projectsData.length} web applications &amp; websites.
            </p>
          </div>

          <a
            href="/works"
            onClick={handleViewAllClick}
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-4.5 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-300 font-mono text-xs sm:text-sm uppercase tracking-widest font-semibold shrink-0 cursor-pointer shadow-md hover:shadow-xl"
          >
            <span>Lihat Semua Proyek ({projectsData.length})</span>
            <FiArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Works;