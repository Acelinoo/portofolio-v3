import React from 'react';

const techStack = [
  'Next.js',
  'React',
  'TypeScript',
  'Tailwind CSS',
  'Node.js',
  'PostgreSQL',
  'Prisma',
  'FastAPI',
  'Supabase',
  'Framer Motion',
  'Vite',
  'JavaScript',
  'Git',
  'Vercel',
];

const Skills = () => {
  // Duplikat array agar continuous loop animasi marquee berjalan mulus tanpa jeda
  const marqueeList = [...techStack, ...techStack];

  return (
    <div
      id="skills"
      className="w-full py-6 sm:py-8 md:py-10 overflow-hidden select-none bg-white dark:bg-black border-y border-gray-100 dark:border-gray-800/60 transition-colors duration-300"
    >
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
        <div className="animate-marquee-right flex items-center whitespace-nowrap">
          {marqueeList.map((tech, idx) => (
            <div key={idx} className="inline-flex items-center">
              <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-semibold tracking-tight text-gray-900 dark:text-white hover:opacity-70 transition-opacity duration-200 cursor-default px-2">
                {tech}
              </span>
              {/* Separator netral tanpa warna hijau, senada dengan tema monokrom */}
              <span className="text-gray-300 dark:text-gray-700 text-lg sm:text-xl md:text-2xl mx-5 sm:mx-8 md:mx-10 select-none">
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
