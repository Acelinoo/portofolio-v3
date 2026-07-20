import React from 'react';

const About = () => {
  const currentYear = new Date().getFullYear();
  const yearsOfExperience = currentYear - 2021;

  return (
    <section id='about' className="w-full">
         <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-32 lg:px-52 py-24">
      {/* Teks Kiri */}
      <div className="md:w-1/2 w-full mb-10 md:mb-0">
        <h2 className="text-3xl font-extrabold mb-6 tracking-wide text-gray-900 dark:text-white">About Me</h2>
        <p className="text-base md:text-lg leading-relaxed text-gray-700 dark:text-gray-300 font-medium">
          Hi there, I'm Marchelino Kurniawan. A junior web developer with over {yearsOfExperience} years of experience.
          I'm currently pursuing my studies at Universitas Komputer Indonesia.
          I've been honing my coding skills since high school (SMK in Indonesian).
          I have a passion for learning new technologies.
          If you need assistance or are looking to collaborate on a project, feel free to reach out.
        </p>
      </div>

      {/* Gambar Kanan */}
      <div className="md:w-1/2 w-full flex justify-center md:justify-end">
        <div className="relative w-56 h-72 group cursor-pointer md:mr-8">
          {/* Gambar Bayangan */}
          <img
            src="/images/me2.png"
            alt="Shadow"
            className="w-56 absolute top-4 left-4 opacity-20 dark:opacity-10 transition-all duration-500 group-hover:top-0 group-hover:left-0"
          />
          {/* Gambar Utama */}
          <img
            src="/images/me2.png"
            alt="About"
            className="w-56 relative z-10 transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </div>
    </div>
        </section>
  );
};

export default About;
