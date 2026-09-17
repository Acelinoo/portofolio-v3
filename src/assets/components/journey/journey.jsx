import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiMinus, FiPlus, FiAward } from 'react-icons/fi';
import SplitLineReveal from '../animations/SplitLineReveal';

const journeyData = [
  {
    id: '2021',
    year: '2021',
    periodLabel: 'Foundations',
    headline: 'Starting My Software Engineering Journey',
    summary: 'SMK Yadika Soreang — Software Engineering / Rekayasa Perangkat Lunak',
    items: [
      {
        category: 'Education',
        role: 'Software Engineering / Rekayasa Perangkat Lunak',
        organization: 'SMK Yadika Soreang',
        period: '2021 – 2024',
        link: 'https://smkyadikasoreang.sch.id/Home',
        description:
          'Started my formal journey in software engineering through vocational education, building foundational skills in programming and web development.',
      },
    ],
  },
  {
    id: '2022',
    year: '2022',
    periodLabel: 'Independent Journey',
    headline: 'Independent Web Development Foundations',
    summary: 'Web Development Practice • JavaScript • React',
    items: [
      {
        category: 'Experience',
        role: 'Web Development Practice • JavaScript • React',
        organization: 'Independent Web Development',
        period: '2022',
        description:
          'Began developing websites independently while strengthening JavaScript, React, frontend development, and practical web development skills.',
      },
    ],
  },
  {
    id: '2023',
    year: '2023',
    periodLabel: 'Industry Immersion',
    headline: 'Real-World Web Development Experience',
    summary: 'PT Nusantech — Junior Web Developer / Internship • Frontend Development',
    items: [
      {
        category: 'Experience',
        role: 'Junior Web Developer / Internship • Frontend Development',
        organization: 'PT Nusantech',
        period: '2023 – 2024',
        description:
          'Gained real-world web development experience through a long-term internship, working on practical web projects and strengthening frontend development skills.',
      },
    ],
  },
  {
    id: '2024',
    year: '2024',
    periodLabel: 'Academic & Industry Milestones',
    headline: 'High School Graduation & University Journey',
    summary: 'SMK Yadika Soreang — Graduation • UNIKOM — Started Undergraduate Study',
    items: [
      {
        category: 'Education',
        role: 'Undergraduate Student — Informatics / Manajemen Informatika',
        organization: 'Universitas Komputer Indonesia (UNIKOM)',
        period: '2024 – Present',
        link: 'https://unikom.ac.id/',
        description:
          'Graduated from vocational high school and continued my education at Universitas Komputer Indonesia (UNIKOM), majoring in Informatics / Manajemen Informatika.',
      },
      {
        category: 'Education',
        role: 'Vocational High School Graduate — Software Engineering',
        organization: 'SMK Yadika Soreang',
        period: '2021 – 2024',
        link: 'https://smkyadikasoreang.sch.id/Home',
        description:
          'Graduated from vocational high school with a strong foundation in software engineering fundamentals, database basics, and hands-on web programming.',
      },
    ],
  },
  {
    id: '2025',
    year: '2025',
    periodLabel: 'Systems & Architecture',
    headline: 'Expanding Real-World Development Experience',
    summary: 'Edamos Barbershop — Web Developer • Cisco Networking Academy Course',
    items: [
      {
        category: 'Experience',
        role: 'Web Developer',
        organization: 'Edamos Barbershop',
        period: '2025',
        description:
          'Expanded practical experience through client-oriented web development while also exploring foundational networking concepts.',
      },
      {
        category: 'Programs & Events',
        role: 'Course Participant',
        organization: 'UNIKOM × Cisco Academy',
        period: 'December 2025',
        type: 'Network Configuration Course',
        description:
          'Completed coursework on computer networking fundamentals, routing protocols, and enterprise network architecture.',
      },
    ],
  },
  {
    id: '2026',
    year: '2026',
    periodLabel: 'Present',
    headline: 'Frontend Engineering, Product Building & AI-Assisted Development',
    summary: 'Frontend Specialist • Freelance & Self-Employed • AI-Assisted Development & Continuous Learning',
    items: [
      {
        category: 'Experience',
        role: 'Frontend Specialist / Full-Stack Web Developer',
        organization: 'Freelance & Self-Employed',
        period: '2022 – Present',
        description:
          'Focused on frontend engineering, UI/UX, interactive web experiences, modern web applications, and AI-assisted development while building independent products and growing a scalable web development workflow.',
      },
      {
        category: 'Experience',
        role: 'Frontend Collaborator',
        organization: 'NeoNest',
        period: '2024 – 2026',
        description:
          'Collaborated on web products through frontend implementation, interface development, React/Next.js workflows, and GitHub-based team collaboration.',
      },
      {
        category: 'Skills Badges',
        isBadge: true,
        role: '28 Google Skills Badges • AI & Gemini',
        organization: 'Google Skills',
        period: 'Aug – Sep 2026',
        description:
          'Earned 28 Google Skills badges focused on AI-assisted workflows, Gemini, prompting, automation, productivity, and practical AI applications.',
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
  'Skills Badges':
    'bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 border border-gray-800 dark:border-gray-200 font-semibold',
};

const Journey = () => {
  const [activeYear, setActiveYear] = useState('2021');

  const toggleYear = (year) => {
    setActiveYear((prev) => (prev === year ? null : year));
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

        {/* Interactive Timeline Rail with Manual Click Opening */}
        <div className="border-y border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
          {journeyData.map((period) => {
            const isOpen = activeYear === period.year;

            return (
              <div
                key={period.id}
                className={`transition-colors duration-300 ${
                  isOpen
                    ? 'bg-gray-50/60 dark:bg-gray-900/40'
                    : 'bg-transparent hover:bg-gray-50/20 dark:hover:bg-gray-900/20'
                }`}
              >
                {/* Clickable Header Row */}
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
                                    className={`text-[10px] sm:text-[11px] uppercase tracking-wider px-2.5 py-1 inline-flex items-center gap-1.5 ${
                                      categoryBadgeStyles[item.category] ||
                                      'bg-gray-100 dark:bg-gray-800'
                                    }`}
                                  >
                                    {item.isBadge && <FiAward className="w-3 h-3 shrink-0" />}
                                    <span>{item.category}</span>
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
