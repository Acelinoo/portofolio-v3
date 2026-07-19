import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Acelinoo' },
    { name: 'LinkedIn', url: '#' },
    { name: 'Instagram', url: '#' },
    { name: 'Spotify', url: '#' },
  ];

  return (
    <motion.footer 
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, damping: 12, mass: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="w-full bg-white dark:bg-[#0B192C] transition-colors duration-300 border-t border-gray-100 dark:border-gray-800/50 will-change-transform"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Copyright Text */}
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
          &copy; 2026 Marchelino Kurniawan. All rights reserved.
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-6 md:gap-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold tracking-wide text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 inline-block"
            >
              {link.name}
            </a>
          ))}
        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;
