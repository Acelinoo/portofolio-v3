import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Home from "./assets/pages/index";
import NotFound from "./assets/pages/NotFound";
import Loading from './assets/components/loadingPage/loadingPage';
import SplashCursor from './assets/components/animations/SplashCursor';
import { ThemeProvider } from './assets/components/theme/ThemeContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showCursor, setShowCursor] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    const cursorTimer = setTimeout(() => {
      if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
        setShowCursor(true);
      }
    }, 800);

    return () => {
      clearTimeout(timer);
      clearTimeout(cursorTimer);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

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
