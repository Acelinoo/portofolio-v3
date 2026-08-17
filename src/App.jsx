import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from "./assets/pages/index";
import ProjectDetail from "./assets/pages/ProjectDetail";
import NotFound from "./assets/pages/NotFound";
import CurveTransition from "./assets/components/animations/CurveTransition";
import { TransitionProvider } from "./assets/components/animations/TransitionContext";
import { ThemeProvider } from './assets/components/theme/ThemeContext';
import SmoothScroll from "./assets/components/scroll/SmoothScroll";

const Layout = () => {
  return (
    <SmoothScroll>
      <TransitionProvider>
        <CurveTransition />
        <Outlet />
      </TransitionProvider>
    </SmoothScroll>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/works/:slug', element: <ProjectDetail /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
