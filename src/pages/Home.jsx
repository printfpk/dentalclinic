import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import ToothCanvas from '../components/ToothCanvas';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Setup Lenis Smooth Scroll only for Home
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
      });

      // CRITICAL FIX: Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      const tickerFn = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tickerFn);
      gsap.ticker.lagSmoothing(0, 0);

      // GSAP Background Evolution (Sunset-like slow transitions)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Slow scrubbing for sunset feel
        }
      });

      // We start at brand orange #bb4413
      // Hero -> Services: darken slightly
      tl.to(containerRef.current, { backgroundColor: "#99330c", ease: "none", duration: 1 });
      // Services -> About: darken more
      tl.to(containerRef.current, { backgroundColor: "#662005", ease: "none", duration: 1 });
      // About -> Doctors: dark with orange tint
      tl.to(containerRef.current, { backgroundColor: "#331002", ease: "none", duration: 1 });
      // Doctors -> Testimonials: deep dark
      tl.to(containerRef.current, { backgroundColor: "#110500", ease: "none", duration: 1 });
      // Testimonials -> CTA: return to rich orange glow
      tl.to(containerRef.current, { backgroundColor: "#bb4413", ease: "none", duration: 1 });

      // Refresh ScrollTrigger to ensure correct heights
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);

      // Cleanup function returned from context
      return () => {
        lenis.destroy();
        gsap.ticker.remove(tickerFn);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div 
      ref={containerRef}
      id="home-scroll-container" 
      className="relative w-full min-h-screen text-white transition-colors duration-1000 ease-out"
      style={{ backgroundColor: '#bb4413' }} // Initial brand color
    >
      {/* Global 3D Tooth Canvas */}
      <ToothCanvas />

      {/* Content wrapper */}
      <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 md:px-8">
        <Navbar />
        
        <main>
          <Hero />
          {/* Changed from flex flex-col to block to prevent GSAP pinning issues */}
          <div className="pb-24 block">
            <Services />
            <About />
            <Doctors />
            <Testimonials />
            <CTA />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
