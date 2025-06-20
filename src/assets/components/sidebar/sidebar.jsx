import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlSidebar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        // Scroll ke bawah
        setShowSidebar(false);
      } else {
        // Scroll ke atas
        setShowSidebar(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlSidebar);
    return () => {
      window.removeEventListener('scroll', controlSidebar);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`
        fixed right-2 top-1/2 transform -translate-y-1/2 
        bg-white rounded-l-2xl shadow-lg py-4 px-2 z-50 
        transition-transform duration-500 ease-in-out
        ${showSidebar ? 'translate-x-0' : 'translate-x-32'}
      `}
    >
      <ul className="flex flex-col items-center space-y-4">
        <li>
          <a href="https://github.com/Acelinoo" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/github.png"
              alt="Instagram"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
        <li>
          <a href="https://www.instagram.com/acelino/" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/instagram (1).png"
              alt="Instagram"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
        <li>
          <a href="https://www.tiktok.com/@acelino.k" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/tiktok.png"
              alt="TikTok"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/linkedin.png"
              alt="LinkedIn"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
        <li>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/twitter.png"
              alt="Twitter"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
        <li>
          <a href="https://open.spotify.com/playlist/29cax5tGOyot4CIkeeeUNO?si=CQggO0GjQLyHoMtiisuQOA" target="_blank" rel="noopener noreferrer">
            <img
              src="/src/assets/images/spotify.png"
              alt="Twitter"
              className="w-7 object-contain transform transition-transform duration-300 hover:scale-125"
            />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
