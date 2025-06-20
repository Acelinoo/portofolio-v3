import React from 'react';

const projects = [
  {
    title: 'Neonest.id',
    description: 'Service platform that is fast, efficient, secure.',
    image: "/images/neonest.png",
    link: 'https://neonestid.vercel.app',
    tech: ['Next.js', 'Tailwind CSS', 'Typescript'],
  },
  {
    title: 'OrbitStation - MAINTENANCE',
    description: 'Real-time ISS tracker.',
    image: '/src/assets/images/grosirfy.png',
    link: '#',
    tech: ['Laravel', 'Vue'],
  },
  {
    title: 'TEvest - MAINTENANCE',
    description: 'Online ticketing system.',
    image: '/src/assets/images/tevest.png',
    link: '#',
    tech: ['React', 'Tailwind CSS'],
  },
];

const Works = () => {
  return (
    <section id="works" className="py-14 px-4 md:px-16 bg-white">
      <h2 className="text-xl md:text-2xl font-bold mb-10 text-center">My Works</h2>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
        {projects.map((project, index) => (
          <a key={index} href={project.link} target="_blank" rel="noopener noreferrer" className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition duration-300">
            <div className="overflow-hidden h-36">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-4">
              <h3 className="text-base font-semibold mb-1">{project.title}</h3>
              <p className="text-xs text-gray-600 mb-2">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, idx) => (
                  <span key={idx} className="text-[10px] bg-gray-100 text-gray-700 px-2 py-[2px] rounded-full">{tech}</span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Works;