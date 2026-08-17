import React from 'react';
import { motion } from 'framer-motion';

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

const Experience = () => {
  return (
    <section
      id="experience"
      className="py-16 px-6 md:px-20 bg-white dark:bg-transparent transition-colors duration-300 w-full overflow-hidden"
    >
      {/* Experience Header */}
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl md:text-3xl font-extrabold mb-12 text-center tracking-wide text-gray-900 dark:text-white"
      >
        Experience
      </motion.h2>

      {/* Experience Timeline */}
      <div className="relative max-w-3xl mx-auto px-4 md:px-0">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute top-0 left-6 md:left-8 w-[2px] h-full bg-gray-200 dark:bg-gray-700 z-0"
        />

        <ol className="relative z-10">
          {experienceData.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ x: -35, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 ml-10 md:ml-16 relative group cursor-pointer"
            >
              {/* Bullet Point */}
              <div className="absolute -left-[31px] md:-left-[39px] mt-1.5 w-4 h-4 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

              {/* Card */}
              <div className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 hover:-translate-y-1">
                <time className="block mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                  {item.period}
                </time>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {item.company}
                </h3>
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {item.role}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>

      {/* Programs & Events Sub-header */}
      <motion.h3
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-2xl md:text-3xl font-extrabold mt-16 mb-12 text-center tracking-wide text-gray-900 dark:text-white"
      >
        Programs & Events
      </motion.h3>

      {/* Programs & Events Timeline */}
      <div className="relative max-w-3xl mx-auto px-4 md:px-0">
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ originY: 0 }}
          className="absolute top-0 left-6 md:left-8 w-[2px] h-full bg-gray-200 dark:bg-gray-700 z-0"
        />

        <ol className="relative z-10">
          {programsData.map((item, idx) => (
            <motion.li
              key={idx}
              initial={{ x: -35, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="mb-10 ml-10 md:ml-16 relative group cursor-pointer"
            >
              {/* Bullet Point */}
              <div className="absolute -left-[31px] md:-left-[39px] mt-1.5 w-4 h-4 bg-black dark:bg-white rounded-full z-10 border-4 border-white dark:border-[#0B192C] group-hover:scale-125 transition-transform duration-300 shadow-sm" />

              {/* Card */}
              <div className="block bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 md:p-8 hover:-translate-y-1">
                <time className="block mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wider">
                  {item.period}
                </time>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {item.institution}
                </h4>
                <p className="text-base font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  {item.title}
                </p>
                <p className="text-sm md:text-base leading-relaxed text-gray-600 dark:text-gray-400 font-medium">
                  {item.type}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
