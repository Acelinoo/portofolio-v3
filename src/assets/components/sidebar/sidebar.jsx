import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaTiktok, FaSpotify } from 'react-icons/fa6';

const sidebarContainerVariants = {
  hidden: { 
    x: 80, 
    opacity: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

const sidebarItemVariants = {
  hidden: { x: 20, opacity: 0, scale: 0.8 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
};

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const showSidebarRef = useRef(false);
  const lastScrollY = useRef(0);

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
              if (!showSidebarRef.current) {
                showSidebarRef.current = true;
                setShowSidebar(true);
              }
            } 
            // Sembunyi ketika scroll DOWN atau kembali ke paling atas
            else if (delta > 0 || currentScrollY <= 80) {
              if (showSidebarRef.current) {
                showSidebarRef.current = false;
                setShowSidebar(false);
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

  const socialLinks = [
    { href: 'https://github.com/Acelinoo', icon: FaGithub, name: 'GitHub', alt: 'GitHub Profile of Marchelino' },
    { href: 'https://www.instagram.com/acelino/', icon: FaInstagram, name: 'Instagram', alt: 'Instagram Profile of Marchelino' },
    { href: 'https://www.tiktok.com/@acelino.k', icon: FaTiktok, name: 'TikTok', alt: 'TikTok Profile of Marchelino' },
    { href: 'https://open.spotify.com/playlist/29cax5tGOyot4CIkeeeUNO?si=CQggO0GjQLyHoMtiisuQOA', icon: FaSpotify, name: 'Spotify', alt: 'Spotify Playlist of Marchelino' },
  ];

  return (
    <motion.div
      variants={sidebarContainerVariants}
      initial="hidden"
      animate={showSidebar ? 'visible' : 'hidden'}
      style={{ pointerEvents: showSidebar ? 'auto' : 'none' }}
      className="hidden lg:block fixed right-0 md:right-2 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-black/90 border border-gray-200 dark:border-gray-800 rounded-l-2xl shadow-2xl py-4 px-2.5 z-50 transition-colors duration-300 backdrop-blur-md"
    >
      <ul className="flex flex-col items-center space-y-3.5">
        {socialLinks.map((link, i) => {
          const Icon = link.icon;
          return (
            <motion.li key={i} variants={sidebarItemVariants}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-neutral-800/80 transition-all duration-200 hover:scale-115"
                aria-label={link.alt}
                title={link.name}
              >
                <Icon className="w-5 h-5" />
              </a>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
};

export default Sidebar;

