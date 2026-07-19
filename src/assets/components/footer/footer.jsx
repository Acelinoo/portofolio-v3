import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white dark:bg-[#060D17] py-6 px-4 text-center transition-colors duration-300 w-full">
      <p className="text-sm text-gray-300 dark:text-gray-400">&copy; {new Date().getFullYear()} Marchelino Kurniawan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
