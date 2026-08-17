import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMinus, FiPlus } from 'react-icons/fi';
import SplitLineReveal from '../animations/SplitLineReveal';

const journeyData = [
  {
    id: '2021',
    year: '2021',
    periodLabel: 'Foundations',
    headline: 'First Steps in Software Engineering',
    summary: 'SMK Yadika Soreang Software Engineering Enrollment',
    items: [
      {
        category: 'Education',
        role: 'Software Engineering Student',
        organization: 'SMK Yadika Soreang',
        period: '2021 – 2024',
        link: 'https://smkyadikasoreang.sch.id/Home',
        description:
          'Enrolled in Software Engineering vocational track, learning HTML, CSS, JavaScript, database fundamentals, and computer programming logic.',
      },
    ],
  },
  {
    id: '2022',
    year: '2022',
    periodLabel: 'Independent Journey',
    headline: 'Initiation into Independent Web Development',
    summary: 'First Client Projects • JavaScript & React Deep Dive',
    items: [
      {
        category: 'Experience',
        role: 'Freelance Web Developer',
        organization: 'Self-Employed',
        period: '2022 – Present',
        description:
          'Began taking freelance commissions, creating responsive web layouts, exploring modern JavaScript ecosystems, and developing custom web experiences.',
      },
    ],
  },
  {
    id: '2023',
    year: '2023',
    periodLabel: 'Industry Immersion',
    headline: 'Agency Internship & Real-World Web Projects',
    summary: 'PT Nusantech Internship • Frontend Mastery • Client Projects',
    items: [
      {
        category: 'Experience',
        role: 'Web Developer Intern',
        organization: 'PT Nusantech',
        period: '2023 – 2024',
        description:
          'Entered formal industry internship, learning agile methodologies, frontend component architectures, and responsive web delivery.',
      },
      {
        category: 'Experience',
        role: 'Freelance Frontend Developer',
        organization: 'Independent Client Work',
        period: '2022 – Present',
        description:
          'Built custom client landing pages and interactive web interfaces, establishing frontend design and coding workflows.',
      },
    ],
  },
  {
    id: '2024',
    year: '2024',
    periodLabel: 'Academic & Industry Milestones',
    headline: 'University Commencement, Tech Internship & High School Graduation',
    summary: 'UNIKOM Software Engineering • PT Nusantech Intern • Digipreneur Seminar • SMK Yadika Graduate',
    items: [
      {
        category: 'Education',
        role: 'Software Engineering Major',
        organization: 'Universitas Komputer Indonesia (UNIKOM)',
        period: '2024 – Present',
        link: 'https://unikom.ac.id/',
        description:
          'Commenced undergraduate degree in Software Engineering, building upon technical fundamentals with advanced computer science topics.',
      },
      {
        category: 'Experience',
        role: 'Web Developer Intern',
        organization: 'PT Nusantech',
        period: '2023 – 2024',
        description:
          'Contributed to production codebases in a professional tech agency environment, refining teamwork, clean code practices, and development workflows.',
      },
      {
        category: 'Programs & Events',
        role: 'Event Attendee',
        organization: 'Seminar Nasional Digipreneur Vol. 2 (UNIKOM)',
        period: 'October 12, 2024',
        type: 'National Technology Seminar',
        description:
          'Gained insights into digital entrepreneurship, business scaling, tech industry trends, and creative economy dynamics.',
      },
      {
        category: 'Education',
        role: 'Vocational High School Degree in Software Engineering',
        organization: 'SMK Yadika Soreang',
        period: '2021 – 2024',
        link: 'https://smkyadikasoreang.sch.id/Home',
        description:
          'Graduated with a strong foundation in informatics, software engineering basics, and hands-on web programming.',
      },
    ],
  },
  {
    id: '2025',
    year: '2025',
    periodLabel: 'Systems & Architecture',
    headline: 'Client Systems & Network Configurations',
    summary: 'Edamos Barbershop Web Developer • Cisco Academy Network Course',
    items: [
      {
        category: 'Experience',
        role: 'Web Developer',
        organization: 'Edamos Barbershop',
        period: '2025',
        description:
          'Analyzed business requirements and engineered a modern reservation and scheduling system concept for barbershop client operations.',
      },
      {
        category: 'Programs & Events',
        role: 'Course Participant',
        organization: 'UNIKOM × Cisco Academy',
        period: 'December 2025',
        type: 'Network Configuration Certification Course',
        description:
          'Completed hands-on coursework on computer networking infrastructure, routing protocols, and enterprise network architecture.',
      },
    ],
  },
  {
    id: '2026',
    year: '2026',
    periodLabel: 'Present',
    headline: 'Frontend Engineering & Full-Stack Collaborations',
    summary: 'NeoNest Collaborator • Freelance Full-Stack Developer • UNIKOM Degree',
    items: [
      {
        category: 'Experience',
        role: 'Frontend Collaborator',
        organization: 'NeoNest',
        period: '2024 – 2026',
        description:
          'Collaborated on scalable web products, interface design, frontend implementation with React and Next.js, and modern GitHub-based team workflows.',
      },
      {
        category: 'Experience',
        role: 'Full-Stack Web Developer / Frontend Specialist',
        organization: 'Freelance & Self-Employed',
        period: '2022 – Present',
        description:
          'Delivering tailored digital experiences, web apps, and modern user interfaces for clients and independent projects with high visual and performance standards.',
      },
      {
        category: 'Education',
        role: 'Undergraduate Software Engineering',
        organization: 'Universitas Komputer Indonesia (UNIKOM)',
        period: '2024 – Present',
        link: 'https://unikom.ac.id/',
        description:
          'Pursuing higher education in Informatics / Software Engineering, deepening algorithmic foundations, system architectures, and frontend specializations.',
      },
    ],
  },
];

const categoryBadgeStyles = {
  Experience:
    'bg-black text-white dark:bg-white dark:text-black font-semibold',
  Education:
    'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-700 font-medium',
  'Programs & Events':
    'bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200 border border-dashed border-gray-300 dark:border-gray-700 font-medium',
};

const Journey = () => {
  const [activeYear, setActiveYear] = useState('2021');

  const toggleYear = (year) => {
    setActiveYear((prev) => (prev === year ? null : year));
  };

  const handleMouseEnter = (year) => {
    setActiveYear(year);
  };

  return (
    <section
      id="journey"
      className="py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-16 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 w-full overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs sm:text-sm font-mono font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
              // 02 JOURNEY (2021 — 2026)
            </span>
            <span className="h-[1px] w-12 bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <SplitLineReveal
              as="h2"
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white font-display uppercase"
            >
              Career &amp; Growth
            </SplitLineReveal>
            <SplitLineReveal
              as="p"
              delay={0.15}
              className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-lg font-sans font-medium leading-relaxed"
            >
              A chronological record of education, industry experiences, and milestone programs that shaped my engineering path.
            </SplitLineReveal>
          </div>
        </div>

        {/* Interactive Timeline Rail with Cursor Hover Auto-Opening */}
        <div className="border-y border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
          {journeyData.map((period) => {
            const isOpen = activeYear === period.year;

            return (
              <div
                key={period.id}
                onMouseEnter={() => handleMouseEnter(period.year)}
                className={`transition-colors duration-300 ${
                  isOpen
                    ? 'bg-gray-50/60 dark:bg-gray-900/40'
                    : 'bg-transparent hover:bg-gray-50/20 dark:hover:bg-gray-900/20'
                }`}
              >
                {/* Clickable & Hoverable Header Row */}
                <button
                  type="button"
                  onClick={() => toggleYear(period.year)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-6 sm:py-7 md:py-8 px-2 sm:px-4 flex items-center justify-between gap-4 cursor-pointer focus:outline-none transition-colors group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 md:gap-8 flex-1 min-w-0">
                    {/* Big Year Anchor */}
                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                          isOpen
                            ? 'bg-black dark:bg-white scale-125'
                            : 'bg-gray-300 dark:bg-gray-700 group-hover:bg-gray-500 dark:group-hover:bg-gray-400'
                        }`}
                      />
                      <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-mono tracking-tight text-gray-900 dark:text-white group-hover:translate-x-0.5 transition-transform">
                        {period.year}
                      </span>
                    </div>

                    {/* Headline & Summary */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="text-base sm:text-lg font-bold font-heading text-gray-900 dark:text-gray-100 tracking-tight">
                          {period.headline}
                        </span>
                        <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                          {period.items.length} {period.items.length > 1 ? 'Milestones' : 'Milestone'}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1 truncate font-medium">
                        {period.summary}
                      </p>
                    </div>
                  </div>

                  {/* Toggle Indicator Button */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 shrink-0 rounded-full flex items-center justify-center border transition-all duration-300 ${
                      isOpen
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'border-gray-200 dark:border-gray-800 text-gray-500 dark:text-gray-400 group-hover:border-black dark:group-hover:border-white group-hover:text-black dark:group-hover:text-white'
                    }`}
                  >
                    {isOpen ? (
                      <FiMinus className="w-4 h-4" />
                    ) : (
                      <FiPlus className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {/* Smooth Expandable Content Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`content-${period.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 sm:px-4 pb-8 sm:pb-10 pt-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                          {period.items.map((item, itemIdx) => (
                            <div
                              key={itemIdx}
                              className="p-5 sm:p-6 bg-gray-50/60 dark:bg-gray-900/40 border-l-2 border-black dark:border-white flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                            >
                              <div>
                                <div className="flex items-center justify-between gap-2 mb-3">
                                  <span
                                    className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 ${
                                      categoryBadgeStyles[item.category] ||
                                      'bg-gray-100 dark:bg-gray-800'
                                    }`}
                                  >
                                    {item.category}
                                  </span>
                                  <span className="text-xs font-mono text-gray-500 dark:text-gray-400 font-medium">
                                    {item.period}
                                  </span>
                                </div>

                                <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white leading-snug mb-1">
                                  {item.organization}
                                </h3>
                                <p className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2.5">
                                  {item.role || item.type}
                                </p>

                                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                                  {item.description}
                                </p>
                              </div>

                              {item.link && (
                                <div className="mt-4 pt-3 border-t border-gray-200/50 dark:border-gray-800/80 flex items-center justify-end">
                                  <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Visit official website of ${item.organization}`}
                                    className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:underline underline-offset-4"
                                  >
                                    <span>Official Website</span>
                                    <FiArrowUpRight className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Journey;
