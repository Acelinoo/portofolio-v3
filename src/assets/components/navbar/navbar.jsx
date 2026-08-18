import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSun, FiMoon, FiChevronDown, FiChevronUp } from 'react-icons/fi';
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);
  const showNavbarRef = useRef(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
                setDropdownOpen(false);
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

  // Primary 4 links visible everywhere (Mobile + Desktop)
  const primaryLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/#about' },
    { name: 'Services', href: '/#services' },
    { name: 'Journey', href: '/#journey' },
  ];

  // Secondary links (Visible in dropdown on mobile, inline on desktop)
  const secondaryLinks = [
    { name: 'Works', href: '/#works' },
    { name: 'Contact', href: '/#contact' },
  ];

  return (
    <motion.nav
      variants={navContainerVariants}
      initial="hidden"
      animate={showNavbar ? 'visible' : 'hidden'}
      style={{ pointerEvents: showNavbar ? 'auto' : 'none' }}
      className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 bg-transparent text-white mix-blend-difference px-3 sm:px-6 py-2 flex justify-center items-center gap-3 sm:gap-6 md:gap-8 z-50 max-w-[96vw]"
    >
      {/* 4 Primary Menu Links */}
      {primaryLinks.map((item) => (
        <motion.a
          key={item.name}
          variants={navItemVariants}
          href={item.href}
          className="text-xs sm:text-xs md:text-sm font-bold uppercase hover:-translate-y-0.5 transition-all duration-200 inline-block tracking-wider whitespace-nowrap"
        >
          {item.name}
        </motion.a>
      ))}

      {/* Desktop Inline Links for Works & Contact */}
      {secondaryLinks.map((item) => (
        <motion.a
          key={item.name}
          variants={navItemVariants}
          href={item.href}
          className="hidden md:inline-block text-xs sm:text-xs md:text-sm font-bold uppercase hover:-translate-y-0.5 transition-all duration-200 tracking-wider whitespace-nowrap"
        >
          {item.name}
        </motion.a>
      ))}

      {/* Mobile Dropdown Button for More Links (Works, Contact) */}
      <div ref={dropdownRef} className="relative md:hidden">
        <motion.button
          variants={navItemVariants}
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="text-xs font-bold uppercase tracking-wider flex items-center gap-1 cursor-pointer bg-transparent border-0 text-white p-0"
          aria-expanded={dropdownOpen}
          aria-label="Toggle navigation menu dropdown"
        >
          <span>More</span>
          {dropdownOpen ? (
            <FiChevronUp className="w-3.5 h-3.5" />
          ) : (
            <FiChevronDown className="w-3.5 h-3.5" />
          )}
        </motion.button>

        {/* Floating Dropdown Panel */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-full mt-3 w-36 bg-black/95 text-white border border-white/20 p-2 shadow-2xl backdrop-blur-lg flex flex-col gap-1 z-[60]"
            >
              {secondaryLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setDropdownOpen(false)}
                  className="px-3 py-2 text-xs font-mono font-bold uppercase tracking-widest hover:bg-white/10 transition-colors text-left block"
                >
                  {link.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
