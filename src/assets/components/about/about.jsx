import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiFileText, FiAward, FiExternalLink } from 'react-icons/fi';
import SplitLineReveal from '../animations/SplitLineReveal';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    const overlay = overlayRef.current;

    if (!section || !content || !overlay) return;

    const ctx = gsap.context(() => {
      // Saat section About ditinggalkan, layar menggelap secara mulus & konten meredup
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'center top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        content,
        { opacity: 1, scale: 1 },
        {
          opacity: 0.05,
          scale: 0.95,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'center top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full flex items-center justify-center bg-black text-white py-20 md:py-28 lg:py-36 px-4 sm:px-6 overflow-hidden"
    >
      {/* Darkening Overlay saat meninggalkan section About */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black pointer-events-none z-20 opacity-0 will-change-transform"
        aria-hidden="true"
      />

      {/* Main Content Area */}
      <div
        ref={contentRef}
        className="w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between px-4 sm:px-8 md:px-12 lg:px-16 gap-10 lg:gap-20 relative z-10 will-change-transform"
      >
        {/* Teks Kiri: Large & Long Typography with GSAP Line Splits on Scroll */}
        <div className="lg:w-3/5 w-full text-left">
          {/* Section Tag + Location */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-6">
            <span className="text-xs sm:text-sm font-mono tracking-widest text-gray-400 uppercase font-semibold">
              ABOUT
            </span>
            <span className="h-[1px] w-8 bg-gray-700 hidden sm:block" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
              BANDUNG, WEST JAVA, INDONESIA
            </span>
          </div>

          {/* Large Statement Typography */}
          <SplitLineReveal
            as="h2"
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-normal leading-[1.3] md:leading-[1.25] tracking-tight text-white font-sans mb-6"
          >
            I'm Marchelino Kurniawan (Acelino) — Founder &amp; Full-Stack Web Developer specialized in Frontend Development based in Bandung, Indonesia.
          </SplitLineReveal>

          {/* Long Narrative Paragraphs */}
          <div className="space-y-4 text-sm sm:text-base md:text-lg leading-relaxed text-gray-300 font-sans font-normal max-w-2xl mb-8">
            <SplitLineReveal delay={0.1}>
              Acelino (Marchelino Kurniawan) is the Founder of GerobakLink and a Full-Stack Web Developer specializing in modern web applications, interactive visual experiences (UI/UX), and high-performance frontend architectures.
            </SplitLineReveal>
            <SplitLineReveal delay={0.2}>
              Together with my colleague at GerobakLink, I lead the Frontend Specialization and user experience design, while independently engineering complete Full-Stack web applications—bridging robust server architectures with ultra-fast, high-converting digital products.
            </SplitLineReveal>
          </div>

          {/* Quick Highlight Metrics */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 font-mono text-xs text-gray-400 py-4 border-y border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-gray-200 uppercase tracking-wider font-semibold">Founder @ GerobakLink</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-gray-200 uppercase tracking-wider font-semibold">Frontend Specialist</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-gray-200 uppercase tracking-wider font-semibold">Full-Stack Capable</span>
            </div>
          </div>
        </div>

        {/* Gambar Kanan & Credentials (CV + Sertifikasi) */}
        <div className="lg:w-2/5 w-full flex flex-col items-center lg:items-end">
          {/* Foto Container */}
          <div className="relative w-52 h-70 sm:w-60 sm:h-80 md:w-68 md:h-92 lg:w-76 lg:h-[400px] group cursor-pointer mb-8">
            <div className="absolute -top-3.5 left-0 right-0 h-[1px] bg-gray-800 group-hover:bg-gray-600 transition-colors duration-300" />
            <div className="absolute -bottom-3.5 left-0 right-0 h-[1px] bg-gray-800 group-hover:bg-gray-600 transition-colors duration-300" />

            <img
              src="/images/me3.webp"
              alt=""
              aria-hidden="true"
              width="320"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover absolute top-4 left-4 opacity-25 transition-all duration-500 group-hover:top-0 group-hover:left-0 brightness-75 pointer-events-none"
            />
            <img
              src="/images/me3.webp"
              alt="Acelino (Marchelino Kurniawan) - Web Developer"
              width="320"
              height="400"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          {/* Credentials Area (CV & Sertifikat) */}
          <div className="w-52 sm:w-60 md:w-68 lg:w-76 flex flex-col gap-3.5">
            {/* CV Download / View Button */}
            <a
              href="/cv/Marchelino_Kurniawan_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group/cv relative flex items-center justify-between px-4 py-3 bg-white text-black hover:bg-gray-200 transition-all duration-300 shadow-md font-mono"
              title="View & Download Curriculum Vitae"
            >
              <div className="flex items-center gap-2.5">
                <FiFileText className="w-4 h-4 text-black shrink-0" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  CURRICULUM VITAE
                </span>
              </div>
              <span className="text-[10px] bg-black text-white px-2 py-0.5 uppercase tracking-widest font-semibold group-hover/cv:bg-gray-800 transition-colors">
                PDF
              </span>
            </a>

            {/* Verified Certifications Section */}
            <div className="border border-gray-800 bg-gray-950/80 p-3.5 flex flex-col gap-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-gray-800">
                <span className="font-mono text-[10px] uppercase tracking-widest text-gray-400 font-semibold flex items-center gap-1.5">
                  <FiAward className="w-3.5 h-3.5 text-gray-300" />
                  VERIFIED CERTIFICATES
                </span>
                <span className="font-mono text-[10px] text-gray-400 font-bold">
                  (03)
                </span>
              </div>

              {/* Certificate 1: Cisco CCNA */}
              <a
                href="/sertifikat/cisco-ccna-introduction-to-networks.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start justify-between gap-2 p-2 hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white transition-colors leading-snug">
                    CCNA: Introduction to Networks
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    Cisco Networking Academy
                  </span>
                </div>
                <FiExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-white shrink-0 mt-0.5 transition-colors" />
              </a>

              {/* Certificate 2: Dicoding Web Dasar */}
              <a
                href="/sertifikat/dicoding-pemrograman-web-dasar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start justify-between gap-2 p-2 hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white transition-colors leading-snug">
                    Dasar Pemrograman Web
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    Dicoding Academy • HTML &amp; CSS
                  </span>
                </div>
                <FiExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-white shrink-0 mt-0.5 transition-colors" />
              </a>

              {/* Certificate 3: Dicoding SQL Dasar */}
              <a
                href="/sertifikat/dicoding-sql-dasar.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group/item flex items-start justify-between gap-2 p-2 hover:bg-white/5 border border-transparent hover:border-gray-800 transition-all duration-200"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-gray-200 group-hover/item:text-white transition-colors leading-snug">
                    Dasar SQL (Structured Query)
                  </span>
                  <span className="text-[10px] font-mono text-gray-500">
                    Dicoding Academy • Database
                  </span>
                </div>
                <FiExternalLink className="w-3.5 h-3.5 text-gray-500 group-hover/item:text-white shrink-0 mt-0.5 transition-colors" />
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
