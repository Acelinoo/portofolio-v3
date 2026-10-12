import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        // Hapus legacy stored theme agar tidak memaksa darkmode lama
        localStorage.removeItem('theme');
      } catch (e) {}

      const saved = sessionStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
    }
    // Ketika web baru dibuka, langsung default menggunakan lightmode
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'game');
    if (theme === 'dark') root.classList.add('dark');
    try {
      sessionStorage.setItem('theme', theme);
    } catch (e) {}
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
