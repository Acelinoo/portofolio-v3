import React, { useEffect, useState } from 'react';

const Loading = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-screen bg-white">
      <div className="flex items-center gap-4">
        {/* Teks Hello */}
        <h1 className="text-3xl md:text-5xl font-bold text-black animate-pulse">
          Hello.
        </h1>

        {/* Gambar Halo */}
        <img
          src="/images/halo.png"
          alt="Hello Icon"
          className={`w-16 h-16 md:w-24 md:h-24 animate-pulse transform transition-all duration-1000 ease-out ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

export default Loading;
