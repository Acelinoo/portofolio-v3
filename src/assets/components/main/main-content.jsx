import React, { useEffect, useState } from 'react';

const MainContent = () => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimateIn(true), 300);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 md:px-8 text-center md:text-left
        transition-all duration-700 ease-out
        ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {/* Konten Teks */}
      <div className="mt-6 md:mt-0 md:mr-12 z-10">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          MARCHELINO <br /> KURNIAWAN
        </h1>

        <div className="flex items-center gap-3 justify-center md:justify-start mt-4 flex-wrap">
          <div className="flex flex-col items-center md:items-start">
            <p className="text-base md:text-lg font-semibold">WEB DEVELOPER</p>
            <span className="h-[2px] bg-black mt-1 animate-line w-full max-w-[140px]" />
          </div>

          {/* Gambar Scroll */}
          <a href="#about">
            <img
              src="/images/scroll.png"
              alt="scroll icon"
              className="h-5 md:h-[24px] w-auto mt-1"
            />
          </a>
        </div>
      </div>

      {/* Gambar Profil */}
      <div className="relative w-44 h-60 md:w-56 md:h-72 group cursor-pointer mb-6 md:mb-0 z-0">
        <img
          src="/images/me1.png"
          alt="shadow"
          className="absolute top-3 left-3 opacity-20 w-full transition-all duration-500 group-hover:top-0 group-hover:left-0"
        />
        <img
          src="/images/me1.png"
          alt="foto"
          className="relative z-10 w-full transition-all duration-500"
        />
      </div>
    </div>
  );
};

export default MainContent;
