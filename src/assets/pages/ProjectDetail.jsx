import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowUpRight, FiSun, FiMoon } from 'react-icons/fi';
import { projectsData } from '../../data/projectsData';
import { useTheme } from '../components/theme/ThemeContext';
import { useTransitionNavigate } from '../components/animations/TransitionContext';
import SplitLineReveal from '../components/animations/SplitLineReveal';
import Footer from '../components/footer/footer';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigateWithTransition = useTransitionNavigate();
  const { theme, toggleTheme } = useTheme();

  // Find project by slug
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[currentIndex];

  // Scroll to top on page load / slug change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { immediate: true });
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-gray-900 dark:text-white px-6 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-sans">Project Not Found</h1>
        <p className="text-gray-500 mb-8 font-mono text-sm">
          The project you are looking for does not exist or has been moved.
        </p>
        <button
          onClick={() => navigateWithTransition('/')}
          className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-mono text-xs uppercase tracking-widest cursor-pointer"
        >
          ← Return to Home
        </button>
      </div>
    );
  }

  // Next & Previous projects for seamless cycling
  const prevProject =
    currentIndex > 0
      ? projectsData[currentIndex - 1]
      : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1
      ? projectsData[currentIndex + 1]
      : projectsData[0];

  const handleBackToWorks = (e) => {
    e.preventDefault();
    navigateWithTransition('/works');
  };

  const handleNavigateProject = (e, targetSlug) => {
    e.preventDefault();
    navigateWithTransition(`/works/${targetSlug}`);
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      
      {/* Top Floating Minimal Nav Header */}
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-900 px-4 sm:px-6 md:px-12 lg:px-20 py-4 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href="/works"
            onClick={handleBackToWorks}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-widest text-gray-900 dark:text-white hover:opacity-60 transition-opacity cursor-pointer"
          >
            <FiArrowLeft className="w-4 h-4" />
            <span>All Works</span>
          </a>

          <div className="flex items-center gap-4">
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 border border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              <span>Live Website</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              onClick={toggleTheme}
              className="p-1.5 text-base hover:opacity-70 transition-opacity cursor-pointer text-gray-900 dark:text-white"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Project Hero Header */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 md:pt-24 pb-20 sm:pb-28">
        
        {/* Number Tag & Large Project Title */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
              (PROJECT — {project.number})
            </span>
            <span className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800" />
            <span className="text-xs font-mono uppercase tracking-widest text-gray-400 font-semibold">
              {project.category}
            </span>
          </div>

          <SplitLineReveal
            as="h1"
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal font-sans tracking-tight text-gray-900 dark:text-white leading-[1.05] mb-6"
          >
            {project.title}
          </SplitLineReveal>

          <SplitLineReveal
            as="p"
            delay={0.15}
            className="text-base sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 font-sans font-normal max-w-4xl leading-relaxed"
          >
            {project.description}
          </SplitLineReveal>
        </div>

        {/* Top Metadata Row */}
        <div className="border-y border-gray-200 dark:border-gray-800 py-6 sm:py-8 my-10 sm:my-14 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 font-mono text-xs sm:text-sm">
          {/* Client */}
          <div>
            <span className="text-gray-400 uppercase tracking-widest block mb-1 text-[11px]">
              CLIENT
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {project.client}
            </span>
          </div>

          {/* Role */}
          <div>
            <span className="text-gray-400 uppercase tracking-widest block mb-1 text-[11px]">
              ROLE
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {project.role}
            </span>
          </div>

          {/* Timeline / Started */}
          <div>
            <span className="text-gray-400 uppercase tracking-widest block mb-1 text-[11px]">
              TIMELINE
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {project.timeline || (project.started ? `Started ${project.started}` : project.year)}
            </span>
          </div>

          {/* Stack */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1">
            <span className="text-gray-400 uppercase tracking-widest block mb-1 text-[11px]">
              STACK
            </span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {(project.stack || project.tech || []).join(' • ')}
            </span>
          </div>

          {/* Live */}
          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <span className="text-gray-400 uppercase tracking-widest block mb-1 text-[11px]">
              LIVE DEMO
            </span>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-gray-900 dark:text-white hover:opacity-60 transition-opacity inline-flex items-center gap-1 underline underline-offset-4"
            >
              <span>Visit Website</span>
              <FiArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Full-Width Preview Showcase Mockup */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-neutral-950 overflow-hidden mb-16 sm:mb-24 shadow-sm">
          <img
            src={project.image}
            alt={`${project.title} Interface Showcase`}
            width="1400"
            height="875"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2-Column Editorial Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 lg:gap-20 mb-20 sm:mb-28 border-b border-gray-200 dark:border-gray-800 pb-16 sm:pb-24">
          {/* Column 1: The Brief */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold block mb-2">
              (01) — THE BRIEF
            </span>
            <SplitLineReveal
              as="h2"
              className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-gray-900 dark:text-white mb-4"
            >
              Project Overview &amp; Objective
            </SplitLineReveal>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
              {project.brief}
            </p>
          </div>

          {/* Column 2: Challenge & Solution */}
          <div className="lg:col-span-6 space-y-4">
            <span className="font-mono text-xs uppercase tracking-widest text-gray-400 font-semibold block mb-2">
              (02) — EXECUTION &amp; CRAFT
            </span>
            <SplitLineReveal
              as="h2"
              className="text-2xl sm:text-3xl font-bold font-sans tracking-tight text-gray-900 dark:text-white mb-4"
            >
              Engineering &amp; Architecture
            </SplitLineReveal>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
              {project.challenge}
            </p>
          </div>
        </div>

        {/* Next / Previous Project Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-6">
          {/* Previous Project Card */}
          <a
            href={`/works/${prevProject.slug}`}
            onClick={(e) => handleNavigateProject(e, prevProject.slug)}
            className="p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all group block cursor-pointer"
          >
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
              ← PREVIOUS PROJECT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-gray-900 dark:text-white group-hover:opacity-70 transition-opacity">
              {prevProject.title}
            </h3>
            <span className="font-mono text-xs text-gray-500 uppercase mt-1 block">
              {prevProject.category}
            </span>
          </a>

          {/* Next Project Card */}
          <a
            href={`/works/${nextProject.slug}`}
            onClick={(e) => handleNavigateProject(e, nextProject.slug)}
            className="p-6 sm:p-8 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all group block md:text-right cursor-pointer"
          >
            <span className="font-mono text-xs text-gray-400 uppercase tracking-widest block mb-2">
              NEXT PROJECT →
            </span>
            <h3 className="text-xl sm:text-2xl font-bold font-sans text-gray-900 dark:text-white group-hover:opacity-70 transition-opacity">
              {nextProject.title}
            </h3>
            <span className="font-mono text-xs text-gray-500 uppercase mt-1 block">
              {nextProject.category}
            </span>
          </a>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ProjectDetail;
