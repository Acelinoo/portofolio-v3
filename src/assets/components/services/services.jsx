import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import SplitLineReveal from '../animations/SplitLineReveal';

const servicesList = [
  {
    number: '01',
    title: 'Frontend Craftsmanship & UI/UX',
    summary: 'Pixel-Perfect Interfaces • Fluid Micro-Animations • Lighthouse 90+ Performance',
    description:
      'Designing and developing distinctive, responsive frontend architectures with React, Next.js, and Tailwind CSS. Focused on seamless user experience, sub-second load times, and memorable interactions.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'TypeScript'],
  },
  {
    number: '02',
    title: 'Full-Stack Web Development',
    summary: 'End-to-End Applications • Clean API Integrations • Scalable Systems',
    description:
      'Building robust web solutions from frontend layouts to backend server logic and databases. Capable of delivering full-stack MVPs, dashboard systems, and interactive client platforms.',
    tech: ['Node.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'Supabase'],
  },
  {
    number: '03',
    title: 'Bespoke Digital Platforms (GerobakLink)',
    summary: 'Non-Generic Brand Identity • High-Converting Landing Pages • E-Commerce',
    description:
      'Through GerobakLink, we craft custom digital platforms that match your unique business character. Avoiding standard templates to ensure your brand stands out with high visual presentation quality.',
    tech: ['Custom UI', 'E-Commerce', 'Company Profiles', 'Web Solutions'],
  },
];

const Services = () => {
  return (
    <section
      id="services"
      className="w-full py-16 sm:py-24 md:py-32 lg:py-36 px-4 sm:px-6 md:px-12 lg:px-20 bg-white dark:bg-black text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden border-t border-gray-100 dark:border-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 md:mb-20 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-3 sm:mb-5">
              <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
                (SERVICES — 01)
              </span>
              <span className="h-[1px] w-12 bg-gray-200 dark:bg-gray-800" />
            </div>

            <SplitLineReveal
              as="h2"
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-normal font-sans tracking-tight text-gray-900 dark:text-white leading-[1.05]"
            >
              What I do.
            </SplitLineReveal>
          </div>

          {/* Quick Resume Link */}
          <div className="pb-2">
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase block mb-1">
              (RESUME / CV)
            </span>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 font-mono text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white hover:opacity-60 transition-opacity underline underline-offset-4"
            >
              <span>Request Resume (PDF)</span>
              <FiArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Horizontal Line Dividers List */}
        <div className="border-y border-gray-200 dark:border-gray-800 divide-y divide-gray-200 dark:divide-gray-800">
          {servicesList.map((service, index) => (
            <div
              key={index}
              className="py-8 sm:py-10 md:py-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start transition-colors duration-300 hover:bg-gray-50/50 dark:hover:bg-gray-950/40 px-2 sm:px-4"
            >
              {/* Number & Title */}
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-3 sm:gap-4 mb-2">
                  <span className="font-mono text-xs sm:text-sm md:text-base font-bold text-gray-400">
                    {service.number}
                  </span>
                  <SplitLineReveal
                    as="h3"
                    className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-sans tracking-tight text-gray-900 dark:text-white"
                  >
                    {service.title}
                  </SplitLineReveal>
                </div>
                <p className="font-mono text-[11px] sm:text-xs text-gray-500 dark:text-gray-400 tracking-wide mt-1.5 sm:mt-2">
                  {service.summary}
                </p>
              </div>

              {/* Description & Tech Stack Tags */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <SplitLineReveal
                  as="p"
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-600 dark:text-gray-300 font-sans leading-relaxed mb-5 sm:mb-6"
                >
                  {service.description}
                </SplitLineReveal>

                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {service.tech.map((t, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] sm:text-[11px] font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-900/60 px-2.5 py-1 border border-gray-200 dark:border-gray-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
