import React, { useEffect, useRef, useContext } from 'react';
import { useBlocker } from 'react-router-dom';
import gsap from 'gsap';
import TransitionContext from './TransitionContext';
import { useTheme } from '../theme/ThemeContext';

const CurveTransition = () => {
  const transitionCtx = useContext(TransitionContext);
  const { theme } = useTheme();
  const svgRef = useRef(null);
  const pathRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const isProceedingRef = useRef(false);

  // Dynamic fill color: White in Dark Mode, Black in Light Mode
  const getFillColor = () => {
    const isDark =
      theme === 'dark' ||
      (typeof document !== 'undefined' &&
        document.documentElement.classList.contains('dark'));
    return isDark ? '#FFFFFF' : '#000000';
  };

  // Pure Mathematically Consistent SVG Curve Topology (No Twisting, No Leaks)
  const pInitial = 'M 0 100 Q 50 100 100 100 L 100 100 Q 50 100 0 100 Z';
  const pCoverWave = 'M 0 35 Q 50 -35 100 35 L 100 100 Q 50 100 0 100 Z';
  const pCoverFull = 'M 0 0 Q 50 0 100 0 L 100 100 Q 50 100 0 100 Z';
  const pUncoverWave = 'M 0 0 Q 50 0 100 0 L 100 35 Q 50 -35 0 35 Z';
  const pFinal = 'M 0 0 Q 50 0 100 0 L 100 0 Q 50 0 0 0 Z';

  // Synchronized Transition Animation Engine
  const executeTransitionAnimation = (toUrl, onCoverComplete) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    const path = pathRef.current;
    const svg = svgRef.current;
    if (!path || !svg) {
      if (onCoverComplete) onCoverComplete();
      isTransitioningRef.current = false;
      isProceedingRef.current = false;
      return;
    }

    const currentColor = getFillColor();
    svg.style.pointerEvents = 'auto';

    // Speed:
    // -> Entering detail works: Slow & Cinematic
    // -> Returning to works/home (including swipe-back): Fast & Snappy
    const isEnteringDetail = toUrl.includes('/works/');
    const waveCoverTime = isEnteringDetail ? 0.6 : 0.32;
    const flatCoverTime = isEnteringDetail ? 0.2 : 0.1;
    const holdTime = isEnteringDetail ? 100 : 40;
    const waveUncoverTime = isEnteringDetail ? 0.6 : 0.32;
    const flatUncoverTime = isEnteringDetail ? 0.2 : 0.1;

    const tl = gsap.timeline();

    // PHASE 1: Wave sweeps up from bottom
    tl.set(path, {
      attr: { d: pInitial },
      fill: currentColor,
    })
      .to(path, {
        duration: waveCoverTime,
        attr: { d: pCoverWave },
        ease: 'power3.in',
      })
      .to(path, {
        duration: flatCoverTime,
        attr: { d: pCoverFull },
        ease: 'power2.out',
        onComplete: () => {
          // PHASE 2: SCREEN IS 100% SOLID & FULLY COVERED
          if (toUrl === '/' || toUrl.includes('works')) {
            sessionStorage.setItem('return_to_works', 'true');
          }

          // Execute route change / blocker.proceed() BEHIND the opaque curtain
          if (onCoverComplete) {
            onCoverComplete();
          }

          // Adjust scroll position while completely hidden
          if (toUrl === '/' || toUrl.includes('works')) {
            if (window.__lenis) {
              window.__lenis.scrollTo('#works', { immediate: true });
            } else {
              const worksEl = document.getElementById('works');
              if (worksEl) {
                worksEl.scrollIntoView({ behavior: 'instant', block: 'start' });
              }
            }
          } else {
            window.scrollTo(0, 0);
            if (window.__lenis) {
              window.__lenis.scrollTo(0, { immediate: true });
            }
          }

          // PHASE 3: Hold solid cover, then peel away smoothly to top
          setTimeout(() => {
            const uncoverTl = gsap.timeline();
            uncoverTl
              .set(path, {
                attr: { d: pCoverFull },
                fill: currentColor,
              })
              .to(path, {
                duration: waveUncoverTime,
                attr: { d: pUncoverWave },
                ease: 'power3.inOut',
              })
              .to(path, {
                duration: flatUncoverTime,
                attr: { d: pFinal },
                ease: 'power2.out',
                onComplete: () => {
                  svg.style.pointerEvents = 'none';
                  isTransitioningRef.current = false;
                  isProceedingRef.current = false;
                },
              });
          }, holdTime);
        },
      });
  };

  // Intercept Trackpad Swipe-Back Gesture, Mouse Back Button, and Browser Back/Forward
  const blocker = useBlocker(({ currentLocation, nextLocation }) => {
    return (
      !isProceedingRef.current &&
      currentLocation.pathname !== nextLocation.pathname
    );
  });

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const nextUrl =
        blocker.location.pathname +
        (blocker.location.search || '') +
        (blocker.location.hash || '');

      executeTransitionAnimation(nextUrl, () => {
        isProceedingRef.current = true;
        blocker.proceed();
      });
    }
  }, [blocker.state]);

  // Register in-app click navigation handler
  useEffect(() => {
    if (transitionCtx?.registerTransitionHandler) {
      transitionCtx.registerTransitionHandler((toUrl, onNavigate) => {
        isProceedingRef.current = true;
        executeTransitionAnimation(toUrl, onNavigate);
      });
    }
  }, [transitionCtx, theme]);

  return (
    <div
      ref={svgRef}
      className="fixed inset-0 w-screen h-screen z-[99999] pointer-events-none"
      aria-hidden="true"
    >
      <svg
        className="w-full h-full block"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d={pInitial}
          fill={theme === 'dark' ? '#FFFFFF' : '#000000'}
        />
      </svg>
    </div>
  );
};

export default CurveTransition;
