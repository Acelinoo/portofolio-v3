import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-16 px-6 md:px-20">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 w-full mb-10 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">About Me</h2>
          <p className="text-sm leading-relaxed text-gray-800">
            Hi there, I'm Marchelino Kurniawan. A junior web developer with over 3 years of experience.
            I'm currently pursuing my studies at Universitas Komputer Indonesia.
            I've been honing my coding skills since high school (SMK in Indonesian).
            I have a passion for learning new technologies.
            If you need assistance or are looking to collaborate on a project, feel free to reach out.
          </p>
        </div>
        <div className="md:w-1/2 w-full flex justify-center md:justify-end">
          <div className="relative w-56 h-72 group cursor-pointer">
            <img src="/src/assets/images/me2.png" alt="Shadow" className="w-56 absolute top-4 left-4 opacity-20 transition-all duration-500 group-hover:top-0 group-hover:left-0" />
            <img src="/src/assets/images/me2.png" alt="About" className="w-56 relative z-10 transition-transform duration-500 group-hover:scale-105" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;