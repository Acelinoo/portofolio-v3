import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../theme/ThemeContext';

const navContainerVariants = {
  hidden: { 
    y: -80, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const navItemVariants = {
  hidden: { y: -15, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
};

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);
  const showNavbarRef = useRef(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const delta = currentScrollY - lastScrollY.current;
          
          if (Math.abs(delta) > 5) {
            // Muncul HANYA ketika scroll UP dan bukan di paling atas halaman
            if (delta < 0 && currentScrollY > 100) {
              if (!showNavbarRef.current) {
                showNavbarRef.current = true;
                setShowNavbar(true);
              }
            } 
            // Sembunyi ketika scroll DOWN atau kembali ke paling atas
            else if (delta > 0 || currentScrollY <= 80) {
              if (!showNavbarRef.current === false) {
                showNavbarRef.current = false;
                setShowNavbar(false);
              }
            }
            lastScrollY.current = currentScrollY;
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      variants={navContainerVariants}
      initial="hidden"
      animate={showNavbar ? 'visible' : 'hidden'}
      style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 bg-transparent text-white mix-blend-difference px-3 sm:px-6 py-2 flex justify-center items-center gap-3.5 sm:gap-6 md:gap-8 z-50 max-w-[96vw] overflow-x-auto no-scrollbar"
    >
      {/* Menu Links */}
      {['Home', 'About', 'Services', 'Journey', 'Works', 'Contact'].map((item) => (
        <motion.a
          key={item}
          variants={navItemVariants}
          href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
          className="text-[11px] sm:text-xs md:text-sm font-bold uppercase hover:-translate-y-0.5 transition-all duration-200 inline-block tracking-wider whitespace-nowrap"
        >
          {item}
        </motion.a>
      ))}

      {/* Theme Mode Toggle Button */}
      <motion.button
        variants={navItemVariants}
        onClick={toggleTheme}
        className="text-sm sm:text-base md:text-lg hover:-translate-y-0.5 transition-transform relative cursor-pointer flex items-center justify-center p-0 bg-transparent border-0 text-white shrink-0"
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <FiSun className="transition-transform duration-300" />
        ) : (
          <FiMoon className="transition-transform duration-300" />
        )}
      </motion.button>
    </motion.nav>
  );
};

export default Navbar;
