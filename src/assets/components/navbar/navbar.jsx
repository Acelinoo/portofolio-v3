import React, { useEffect, useRef, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../theme/ThemeContext';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const { theme, toggleTheme } = useTheme();
  const lastScrollY = useRef(0);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
            setShowNavbar(false);
          } else {
            setShowNavbar(true);
          }
          lastScrollY.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`
        fixed top-1 left-1/2 -translate-x-1/2
        bg-transparent text-black dark:text-white
        rounded-[25px] px-5 py-2
        flex justify-center items-center gap-6 sm:gap-10 z-50
        transition-all duration-700 ease-out
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
        opacity-100 translate-y-0
      `}
    >
      {/* Menu Links */}
      {['Home', 'About', 'Works', 'Contact'].map((item) => (
        <a
          key={item}
          href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
          className="text-sm sm:text-[17px] font-bold uppercase hover:-translate-y-1 transition-all duration-300"
        >
          {item}
        </a>
      ))}

      {/* Music Icon */}
      <div className="w-6 h-6 cursor-pointer hover:-translate-y-1 transition-transform" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
        <img
          src="/images/music.png"
          alt="Music Icon"
          className={`w-full h-full ${isPlaying ? 'animate-spin' : ''} dark:invert`}
          style={{ animationDuration: '4s' }}
        />
        <audio ref={audioRef} src="/music/You.mp3" preload="none" />
      </div>

      {/* Theme Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="text-xl hover:-translate-y-1 transition-all duration-300 relative"
        title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      >
        {theme === 'dark' ? (
          <FiSun className="transition-transform duration-300" />
        ) : (
          <FiMoon className="transition-transform duration-300" />
        )}
      </button>
    </nav>
  );
};

export default Navbar;
