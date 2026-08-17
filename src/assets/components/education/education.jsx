import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { FiChevronDown } from 'react-icons/fi';

const educationData = [
  {
    link: 'https://smkyadikasoreang.sch.id/Home',
    title: 'SMK Yadika Soreang',
    year: '2021 - 2024',
    description:
      'Pursuing a degree in Informatics to deepen my expertise in web development.',
  },
  {
    link: 'https://unikom.ac.id/',
    title: 'Universitas Komputer Indonesia',
    year: '2024 - Present',
    description:
      'Majored in Software Engineering, where I began learning coding and web development.',
  },
];

const experienceData = [
  {
    company: 'Freelance / Self-Employed',
    role: 'Full-Stack Web Developer / Frontend Specialist',
    period: '2022 – Present',
    description:
      'Building modern websites and web applications for personal projects and clients, with a focus on frontend development, user experience, and scalable implementation.',
  },
  {
    company: 'PT Nusantech',
    role: 'Web Developer Intern',
    period: '2023 – 2024',
    description:
      'Gained professional experience in web development through an internship, working with real-world development workflows and software projects.',
  },
  {
    company: 'NeoNest',
    role: 'Frontend Collaborator',
    period: '2024 – 2026',
    description:
      'Collaborated on software development, including interface design, frontend implementation, and GitHub-based development workflows.',
  },
  {
    company: 'Edamos Barbershop',
    role: 'Web Developer',
    period: '2025',
    description:
      'Analyzed requirements and developed a reservation system concept for a barbershop business.',
  },
];

const programsData = [
  {
    institution: 'UNIKOM × Cisco Academy',
    title: 'Network Configuration',
    period: 'December 2025',
    type: 'Learning Program / Course',
  },
  {
    institution: 'UNIKOM',
    title: 'Seminar Nasional Digipreneur Vol. 2',
    period: 'October 12, 2024',
    type: 'Seminar / Technology Event',
  },
];

const Education = () => {
  const [isExpExpanded, setIsExpExpanded] = useState(false);
  const expDropdownRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (expDropdownRef.current) {
      if (isExpExpanded) {
        // Smooth GSAP expand animation
        gsap.fromTo(
          expDropdownRef.current,
          { height: 0, opacity: 0 },
          {
            height: 'auto',
            opacity: 1,
            duration: 0.4,
            ease: 'power3.out',
          }
        );
      } else {
        // Smooth GSAP collapse animation
        gsap.to(expDropdownRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.35,
          ease: 'power3.inOut',
        });
      }
    }
  }, [isExpExpanded]);

  return (
    <section
      id="education"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-10 lg:px-12 bg-white dark:bg-transparent transition-colors duration-300 w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* 3-Column Grid Layout (Responsive 1-col on mobile, 2-col on tablet, 3-col on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-8 items-start">
          
          {/* Column 1: Education */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-extrabold mb-8 text-center md:text-left tracking-wide text-gray-900 dark:text-white"
            >
              Education
            </motion.h2>

            <div className="relative">
              <ol className="relative z-10">
                {/* Timeline Vertical Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                  className="absolute top-2 left-4 w-[2px] h-[calc(100%-2rem)] bg-gray-200 dark:bg-gray-700 z-0"
                />

                {educationData.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 ml-8 relative group cursor-pointer"
                  >
                    {/* Bullet Dot */}
                    <div className="absolute -left-[23px] mt-1.5 w-3.5 h-3.5 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                    {/* Card */}
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 hover:-translate-y-1"
                    >
                      <time className="block mb-1.5 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                        {item.year}
                      </time>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1.5">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </a>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

          {/* Column 2: Experience with 2 Cards Default & GSAP Underline Dropdown */}
          <div className="flex flex-col">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-extrabold mb-8 text-center md:text-left tracking-wide text-gray-900 dark:text-white"
            >
              Experience
            </motion.h2>

            <div className="relative">
              <ol className="relative z-10">
                {/* Timeline Vertical Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                  className="absolute top-2 left-4 w-[2px] h-[calc(100%-2rem)] bg-gray-200 dark:bg-gray-700 z-0"
                />

                {/* Always Visible First 2 Cards */}
                {experienceData.slice(0, 2).map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 ml-8 relative group cursor-pointer"
                  >
                    {/* Bullet Dot */}
                    <div className="absolute -left-[23px] mt-1.5 w-3.5 h-3.5 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                    {/* Card */}
                    <div className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 hover:-translate-y-1">
                      <time className="block mb-1.5 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                        {item.period}
                      </time>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.company}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                        {item.role}
                      </p>
                      <p className="text-xs md:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                        {item.description}
                      </p>
                    </div>
                  </motion.li>
                ))}

                {/* Collapsible Dropdown Container for Remaining Cards */}
                <div
                  ref={expDropdownRef}
                  style={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  {experienceData.slice(2).map((item, idx) => (
                    <li
                      key={`extra-${idx}`}
                      className="mb-8 ml-8 relative group cursor-pointer"
                    >
                      {/* Bullet Dot */}
                      <div className="absolute -left-[23px] mt-1.5 w-3.5 h-3.5 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                      {/* Card */}
                      <div className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 hover:-translate-y-1">
                        <time className="block mb-1.5 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                          {item.period}
                        </time>
                        <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                          {item.company}
                        </h3>
                        <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                          {item.role}
                        </p>
                        <p className="text-xs md:text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  ))}
                </div>
              </ol>

              {/* Clean Underline Button with Arrow */}
              {experienceData.length > 2 && (
                <div className="ml-8 mt-2 flex justify-center items-center">
                  <button
                    type="button"
                    onClick={() => setIsExpExpanded(!isExpExpanded)}
                    className="w-full flex items-center justify-center gap-1.5 text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors duration-200 cursor-pointer underline underline-offset-4 decoration-gray-400 dark:decoration-gray-500 hover:decoration-black dark:hover:decoration-white py-2"
                  >
                    <span>{isExpExpanded ? 'Show Less' : 'Show More'}</span>
                    <FiChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        isExpExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Programs & Events (Spans 2 cols on tablet, 1 col on desktop) */}
          <div className="flex flex-col md:col-span-2 lg:col-span-1">
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl md:text-3xl font-extrabold mb-8 text-center md:text-left tracking-wide text-gray-900 dark:text-white"
            >
              Programs & Events
            </motion.h2>

            <div className="relative">
              <ol className="relative z-10">
                {/* Timeline Vertical Line */}
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  style={{ originY: 0 }}
                  className="absolute top-2 left-4 w-[2px] h-[calc(100%-2rem)] bg-gray-200 dark:bg-gray-700 z-0"
                />

                {programsData.map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mb-8 ml-8 relative group cursor-pointer"
                  >
                    {/* Bullet Dot */}
                    <div className="absolute -left-[23px] mt-1.5 w-3.5 h-3.5 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

                    {/* Card */}
                    <div className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all duration-300 p-5 md:p-6 hover:-translate-y-1">
                      <time className="block mb-1.5 text-xs md:text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                        {item.period}
                      </time>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {item.institution}
                      </h3>
                      <p className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1.5">
                        {item.title}
                      </p>
                      <p className="text-xs md:text-sm leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                        {item.type}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Education;
