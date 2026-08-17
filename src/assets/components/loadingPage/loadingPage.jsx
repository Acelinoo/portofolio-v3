import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{
        y: '-100%',
        transition: {
          duration: 0.85,
          ease: [0.76, 0, 0.24, 1], // Smooth slide-up transition
        },
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-white dark:bg-[#0B192C] w-screen h-screen overflow-hidden pointer-events-auto"
      style={{ willChange: 'transform' }}
    >
      <motion.div
        exit={{
          y: -80,
          opacity: 0,
          transition: {
            duration: 0.6,
            ease: [0.76, 0, 0.24, 1],
          },
        }}
        className="flex items-center gap-4"
      >
        {/* Teks Hello */}
        <h1 className="text-3xl md:text-5xl font-bold text-black dark:text-white animate-pulse">
          Hello.
        </h1>

        {/* Gambar Halo dengan Animasi Tangan Melambai */}
        <div
          className={`relative w-16 h-16 md:w-24 md:h-24 transform transition-all duration-1000 ease-out ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          {/* Tubuh Orang */}
          <img
            src="/images/halo-body.webp"
            alt="Hello Body"
            width="96"
            height="96"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* Tangan Melambai Smooth */}
          <motion.img
            src="/images/halo-arm.webp"
            alt="Hello Arm"
            width="96"
            height="96"
            decoding="async"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{
              transformOrigin: '53% 31%', // Titik sendi bahu (shoulder pivot)
            }}
            animate={{
              rotate: [0, 16, -8, 16, 0],
            }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
