import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Home from "./assets/pages/index";
import CurveTransition from "./assets/components/animations/CurveTransition";
import { TransitionProvider } from "./assets/components/animations/TransitionContext";
import { ThemeProvider } from './assets/components/theme/ThemeContext';
import SmoothScroll from "./assets/components/scroll/SmoothScroll";

const WorksPage = lazy(() => import("./assets/pages/WorksPage"));
const ProjectDetail = lazy(() => import("./assets/pages/ProjectDetail"));
const NotFound = lazy(() => import("./assets/pages/NotFound"));

const Layout = () => {
  return (
    <SmoothScroll>
      <TransitionProvider>
        <CurveTransition />
        <Suspense fallback={<div className="min-h-screen bg-white dark:bg-black" />}>
          <Outlet />
        </Suspense>
      </TransitionProvider>
    </SmoothScroll>
  );
};

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/works', element: <WorksPage /> },
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
