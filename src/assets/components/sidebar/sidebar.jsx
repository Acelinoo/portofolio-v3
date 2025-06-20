import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [animateIn, setAnimateIn] = useState(false);

  // Kontrol scroll show/hide
  const controlSidebar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShowSidebar(false); // scroll down
      } else {
        setShowSidebar(true); // scroll up
      }
      setLastScrollY(window.scrollY);
    }
  };

  // Initial fade-in animasi
  useEffect(() => {
    window.addEventListener('scroll', controlSidebar);
    const timeout = setTimeout(() => {
      setAnimateIn(true);
    }, 100); // delay animasi 100ms
    return () => {
      window.removeEventListener('scroll', controlSidebar);
      clearTimeout(timeout);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`
        -mt-32
        fixed right-2 top-1/2 transform -translate-y-1/2 
        bg-white rounded-l-2xl shadow-lg py-4 px-2 z-50 
        transition-all duration-700 ease-out
        ${showSidebar ? 'translate-x-0' : 'translate-x-32'}
        ${animateIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
      `}
    >
      <ul className="flex flex-col items-center space-y-4">
        <li>
          <a href="https://github.com/Acelinoo" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/github.png" alt="Github" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/acelino/" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/instagram.png" alt="Instagram" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@acelino.k" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/tiktok.png" alt="TikTok" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/linkedin.png" alt="LinkedIn" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/twitter.png" alt="Twitter" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
        <li>
          <a href="https://open.spotify.com/playlist/29cax5tGOyot4CIkeeeUNO?si=CQggO0GjQLyHoMtiisuQOA" target="_blank" rel="noopener noreferrer">
            <img src="/public/images/spotify.png" alt="Spotify" className="w-7 object-contain hover:scale-125 transition-transform" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
