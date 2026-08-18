import React from 'react';
import { motion } from 'framer-motion';

const MainContent = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen px-6 md:px-8 text-center md:text-left relative overflow-hidden pt-24 md:pt-0 pb-16 md:pb-0">
      {/* Konten Teks */}
      <div className="mt-8 md:mt-0 md:mr-12 z-10">
        {/* Eyebrow / Brand Alias */}
        <div className="overflow-hidden mb-2">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center md:justify-start gap-2"
          >
            <span className="text-xs font-mono font-bold tracking-[0.25em] text-gray-500 dark:text-gray-400 uppercase">
              ACELINO
            </span>
            <span className="h-[1px] w-4 bg-gray-400 dark:bg-gray-600 inline-block" />
            <span className="text-[11px] font-mono tracking-widest text-gray-400 uppercase">
              PORTFOLIO
            </span>
          </motion.div>
        </div>

        {/* Teks Nama dengan Masked Slide-Up */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight text-gray-900 dark:text-white"
          >
            MARCHELINO
          </motion.h1>
        </div>
        <div className="overflow-hidden mt-1">
          <motion.h1
            initial={{ y: 70, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wide leading-tight text-gray-900 dark:text-white"
          >
            KURNIAWAN
          </motion.h1>
        </div>

        {/* Subtitle & Animated Line */}
        <div className="mt-4 flex justify-center md:justify-start">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex flex-col items-center md:items-start w-fit"
          >
            <p className="text-sm sm:text-base md:text-lg font-semibold tracking-wider text-gray-800 dark:text-gray-200">
              FULL-STACK WEB DEVELOPER
            </p>
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              style={{ originX: 0 }}
              className="h-[2px] bg-black dark:bg-white mt-1 w-full block"
            />
          </motion.div>
        </div>
      </div>

      {/* Gambar Profil dengan Scale & Shadow Entrance */}
      <motion.div
        initial={{ scale: 0.88, y: 30, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-40 h-52 sm:w-48 sm:h-64 md:w-56 md:h-72 group cursor-pointer mb-6 md:mb-0 z-0"
      >
        <img
          src="/images/me1.webp"
          alt=""
          aria-hidden="true"
          width="224"
          height="288"
          fetchpriority="high"
          decoding="sync"
          className="absolute top-3 left-3 opacity-20 dark:opacity-10 w-full transition-all duration-500 group-hover:top-0 group-hover:left-0 pointer-events-none"
        />
        <img
          src="/images/me1.webp"
          alt="Acelino (Marchelino Kurniawan) - Full-Stack Web Developer"
          width="224"
          height="288"
          fetchpriority="high"
          decoding="sync"
          className="relative z-10 w-full transition-all duration-500 group-hover:scale-105"
        />
      </motion.div>
    </div>
  );
};

export default MainContent;
