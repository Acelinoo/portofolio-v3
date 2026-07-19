import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-[#0B192C] text-gray-900 dark:text-white transition-colors duration-300 px-6 text-center">
      <h1 className="text-8xl md:text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-br from-gray-800 to-gray-400 dark:from-white dark:to-gray-600 drop-shadow-sm mb-4">
        404
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-base md:text-lg text-gray-600 dark:text-gray-400 mb-10 max-w-md mx-auto leading-relaxed">
        Looks like you hit a broken route. Let's redirect you back to the main branch.
      </p>
      
      <Link 
        to="/" 
        className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
