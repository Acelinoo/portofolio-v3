import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import About from '../components/about/about';
import Contact from '../components/contact/contact';
import Footer from '../components/footer/footer';
import Journey from '../components/journey/journey';
import MainContent from '../components/main/main-content';
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';
import Works from '../components/works/works';
import Skills from '../components/skills/skills';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // 1. Detect if the page was reloaded / refreshed (F5 or browser reload)
    const navEntries = performance.getEntriesByType('navigation');
    const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';

    if (isReload) {
      sessionStorage.removeItem('return_to_works');
      window.scrollTo(0, 0);
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
    } else {
      // If returning from a project detail (in-app transition or back navigation)
      const shouldScrollToWorks =
        sessionStorage.getItem('return_to_works') === 'true' ||
        window.location.hash.includes('works');

      if (shouldScrollToWorks) {
        sessionStorage.removeItem('return_to_works');

        const performScrollToWorks = () => {
          if (window.__lenis) {
            window.__lenis.scrollTo('#works', { immediate: true });
          } else {
            const worksEl = document.getElementById('works');
            if (worksEl) {
              worksEl.scrollIntoView({ behavior: 'instant', block: 'start' });
            }
          }
        };

        // Trigger on immediate execution and successive animation frames
        performScrollToWorks();
        requestAnimationFrame(performScrollToWorks);
        setTimeout(performScrollToWorks, 50);
        setTimeout(performScrollToWorks, 150);
      } else {
        window.scrollTo(0, 0);
      }
    }

    // Clean up session storage on page unload
    const handleBeforeUnload = () => {
      sessionStorage.removeItem('return_to_works');
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 2. GSAP Layered Pinning: Hero (gambar1) pinned underneath, About slides over it (ketiban)
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '#home',
        start: 'top top',
        endTrigger: '#about',
        end: 'top top',
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Layered depth transition from Selected Works to Contact
      // Contact slides up smoothly over Works (z-20 over z-10) while Works subtly recedes
      gsap.to('#works-inner', {
        scale: 0.95,
        opacity: 0.35,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: '#contact-container',
          start: 'top bottom',
          end: 'top 20%',
          scrub: true,
        },
      });
    });

    return () => {
      ctx.revert();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="relative w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 overflow-x-clip">
      <Navbar />
      <Sidebar />

      {/* Layer 1: Hero Section (gambar1) - Pinned by GSAP underneath */}
      <section
        id="home"
        className="relative z-0 w-full h-screen min-h-screen bg-white dark:bg-black flex items-center justify-center will-change-transform"
      >
        <MainContent />
      </section>

      {/* Layer 2: About Me - Slides Up and Layers on top of Hero (gambar1 ketiban) */}
      <div className="relative z-10 w-full bg-black text-white shadow-[0_-30px_80px_rgba(0,0,0,0.85)] border-t border-gray-800/80">
        <section id="about" className="relative w-full min-h-screen">
          <About />
        </section>

        {/* Layer 2.5: Tech Stack */}
        <section
          id="tech-stack"
          className="relative w-full bg-white dark:bg-black text-gray-900 dark:text-gray-100 border-b border-gray-100 dark:border-gray-800/60"
        >
          <Skills />
        </section>

        {/* Layer 3: Journey (Education, Experience & Programs 2021-2026) */}
        <Journey />

        {/* Layer 5: Works Section (Pinned underneath with Overscroll) */}
        <div id="works-container" className="relative z-10 w-full bg-white dark:bg-black">
          <div id="works-inner" className="w-full will-change-transform origin-bottom">
            <Works />
          </div>
        </div>

        {/* Layer 6: Contact & Footer (Layers on top over Works) */}
        <div
          id="contact-container"
          className="relative z-20 w-full bg-white dark:bg-black shadow-[0_-35px_80px_rgba(0,0,0,0.15)] dark:shadow-[0_-35px_80px_rgba(0,0,0,0.85)] border-t border-gray-200 dark:border-gray-800"
        >
          <Contact />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
