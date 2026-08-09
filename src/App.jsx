import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from "./assets/pages/index";
import NotFound from "./assets/pages/NotFound";
import Loading from './assets/components/loadingPage/loadingPage';
import SplashCursor from './assets/components/animations/SplashCursor';
import { ThemeProvider } from './assets/components/theme/ThemeContext';

const App = () => {
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const cursorTimer = setTimeout(() => {
      if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
        setShowCursor(true);
      }
    }, 1500);

    return () => clearTimeout(cursorTimer);
  }, []);

  return (
    <ThemeProvider>
      {showCursor && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <SplashCursor COLOR="#969696" RAINBOW_MODE={false} SPLAT_RADIUS={0.1} SPLAT_FORCE={4000} />
        </div>
      )}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
