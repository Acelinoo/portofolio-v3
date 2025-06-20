import React, { useEffect, useRef, useState } from 'react';

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mounted, setMounted] = useState(false);
  const audioRef = useRef(null);

  const controlNavbar = () => {
    if (window.scrollY > lastScrollY) setShowNavbar(false);
    else setShowNavbar(true);
    setLastScrollY(window.scrollY);
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    isPlaying ? audio.pause() : audio.play();
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    const audio = audioRef.current;

    // Delay fade-down saat mount
    const timeout = setTimeout(() => setMounted(true), 100);

    if (audio) {
      const autoplay = setTimeout(() => {
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }, 500);
      return () => {
        clearTimeout(autoplay);
        clearTimeout(timeout);
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, []);

  return (
    <nav
      className={`
        fixed top-1 left-1/2 -translate-x-1/2
        bg-transparent text-black rounded-[25px] px-5 py-2
        flex justify-center items-center gap-6 sm:gap-10 z-50
        transition-all duration-700 ease-out
        ${showNavbar ? 'translate-y-0' : '-translate-y-full'}
        ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
      `}
    >
      {/* Menu Link */}
      {['Home', 'About', 'Works', 'Contact'].map((item) => (
        <a
          key={item}
          href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
          className="text-sm sm:text-[17px] font-bold uppercase hover:-translate-y-1 transition-transform"
        >
          {item}
        </a>
      ))}

      {/* Music Icon */}
      <div className="w-6 h-6 cursor-pointer" onClick={togglePlay} title={isPlaying ? 'Pause' : 'Play'}>
        <img
          src="/images/music.png"
          alt="Music Icon"
          className={`w-full h-full ${isPlaying ? 'animate-spin' : ''}`}
          style={{ animationDuration: '4s' }}
        />
        <audio ref={audioRef} src="/music/You.mp3" preload="auto" />
      </div>
    </nav>
  );
};

export default Navbar;
