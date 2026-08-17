import React from 'react';
import { FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Acelinoo' },
    { name: 'Instagram', url: 'https://www.instagram.com/acelino/' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@acelino.k' },
    { name: 'Spotify', url: 'https://open.spotify.com/playlist/29cax5tGOyot4CIkeeeUNO?si=CQggO0GjQLyHoMtiisuQOA' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-10 md:py-14 flex flex-col md:flex-row items-center justify-between gap-8">
        
        {/* Copyright & Location */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm font-mono text-gray-500 dark:text-gray-400 text-center md:text-left">
          <span>© 2026 Marchelino Kurniawan.</span>
          <span className="hidden sm:inline-block text-gray-300 dark:text-gray-700">•</span>
          <span className="uppercase tracking-wider">Bandung, West Java, ID</span>
        </div>

        {/* Back to Top Button (Strict Monochrome & Editorial Style) */}
        <button
          onClick={scrollToTop}
          type="button"
          aria-label="Scroll back to top of page"
          className="group inline-flex items-center gap-2 px-5 py-2.5 border border-gray-300 dark:border-gray-800 hover:border-black dark:hover:border-white bg-transparent text-gray-900 dark:text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black cursor-pointer shadow-sm"
        >
          <span>BACK TO TOP</span>
          <FiArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
        </button>

        {/* Social Links */}
        <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit Marchelino's ${link.name}`}
              className="text-xs sm:text-sm font-mono font-semibold tracking-wider text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 inline-flex items-center gap-1"
            >
              <span>{link.name}</span>
              <span className="text-[10px] opacity-70">↗</span>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
};

export default Footer;
