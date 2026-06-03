import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Star } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef();
  
  // Refs for animation
  const outlineTextRef = useRef();
  const solidTextRef = useRef();
  const sideContentRef = useRef();
  const footerRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const doctors = [
    {
      id: 1,
      name: "Clara Collins",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Mason Harper",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Beatrice Cox",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Austin Camacho",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % doctors.length);
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // =====================================
      // DESKTOP ANIMATION
      // =====================================
      matchMedia.add("(min-width: 768px)", () => {
        const tl = gsap.timeline();
        
        gsap.set([outlineTextRef.current, sideContentRef.current, footerRef.current], {
          opacity: 0
        });

        // Fast initial load for background
        tl.to(outlineTextRef.current, {
          opacity: 0.15,
          duration: 2,
          ease: "power2.inOut"
        }, 0.5);

        // Staggered line-by-line reveal
        tl.to('.hero-title-line', {
          y: "0%",
          duration: 1.5,
          stagger: 0.15,
          ease: "power4.out",
          force3D: true
        }, 1.2);

        tl.to('.hero-subtitle-line', {
          y: "0%",
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          force3D: true
        }, 1.5);

        // Fade in right gallery and footer
        tl.to([sideContentRef.current, footerRef.current], {
          opacity: 1,
          duration: 1.5,
          ease: "power2.inOut",
          force3D: true
        }, 2);
      });

      // =====================================
      // MOBILE BESPOKE ANIMATION
      // =====================================
      matchMedia.add("(max-width: 767px)", () => {
        const mobileTl = gsap.timeline();

        // Staggered text reveal
        mobileTl.to('.hero-title-line-mobile', {
          y: "0%",
          opacity: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "power4.out",
          force3D: true
        }, 0.6);
        
        // Subtext reveal
        mobileTl.fromTo('.hero-subtext-mobile',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        1.0);

        // Bottom text appears
        mobileTl.fromTo('.hero-footer-mobile', 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power2.out" }, 
        1.2);

        // Scroll Sequence: Headline scales and fades out
        gsap.to('.hero-title-wrapper-mobile', {
          scale: 1.15,
          opacity: 0,
          transformOrigin: "left center",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true
          }
        });
        
        // Scroll Sequence: Footer fades out faster
        gsap.to('.hero-footer-mobile', {
          opacity: 0,
          y: 30,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "center top",
            scrub: true
          }
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative w-full h-[calc(100vh-100px)] min-h-[600px] md:min-h-[750px] flex flex-col justify-between pt-8 z-10 overflow-hidden">

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center flex-1 h-full relative">

        {/* Left Section - Typography */}
        <div className="flex flex-col justify-center h-full w-full relative">
          
          {/* Background Outline Text (Desktop) */}
          <div 
            ref={outlineTextRef}
            className="hidden md:block absolute top-1/2 left-0 -translate-y-1/2 text-[10rem] font-display font-bold text-outline opacity-0 pointer-events-none whitespace-nowrap z-0 will-change-[opacity]"
          >
            MODERN CARE
          </div>

          {/* Background Typography (Mobile) - Very low opacity behind content */}
          <div 
            className="md:hidden absolute top-1/2 -translate-y-1/2 left-[10%] w-full text-[55vw] leading-[0.78] font-display font-black text-white pointer-events-none z-0 tracking-[-0.05em] opacity-5" 
          >
            SMI<br/>LE
          </div>

          <div ref={solidTextRef} className="relative z-10 w-full max-w-[500px]">
            
            {/* Desktop Subtitle (Hidden on Mobile) */}
            <div className="hidden md:block mb-12 max-w-[320px]">
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">From preventive care</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">to complex restorations,</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">a comprehensive approach</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">to your dental health.</p></div>
            </div>
            
            {/* Desktop Main Title (Hidden on Mobile) */}
            <h1 className="hidden md:block text-[6.5rem] leading-[0.95] font-display tracking-[-0.03em]">
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/70 translate-y-[110%] will-change-transform">Modern</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/50 translate-y-[110%] will-change-transform">Care for</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/90 translate-y-[110%] will-change-transform">a Perfect</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/100 translate-y-[110%] will-change-transform">Smile</span></div>
            </h1>
          </div>
        </div>

        {/* Mobile Bespoke Title (Absolute offset vertically) */}
        <div className="hero-title-wrapper-mobile md:hidden absolute top-[42%] -translate-y-1/2 left-0 w-full max-w-[500px] z-10 pl-6 pr-4 pointer-events-none">
          <div className="font-display tracking-[-0.03em]" style={{ fontSize: 'clamp(46px, 12vw, 72px)', lineHeight: 0.9, fontWeight: 700 }}>
            <div className="overflow-hidden pb-1 w-full"><span className="hero-title-line-mobile block text-[#ffffff] whitespace-nowrap translate-y-[110%] will-change-transform origin-left">EVERY SMILE</span></div>
            <div className="overflow-hidden pb-1 w-full"><span className="hero-title-line-mobile block text-[#ffffff] whitespace-nowrap translate-y-[110%] will-change-transform origin-left">HAS A STORY.</span></div>
          </div>
          
          <div className="hero-subtext-mobile opacity-0 mt-8">
            <div className="w-8 h-[1px] bg-white/30 mb-5"></div>
            <p className="text-[18px] text-white/75 tracking-widest uppercase leading-[1.6] font-light" style={{ letterSpacing: '0.15em' }}>
              EXPERT CARE.<br/>BEAUTIFUL RESULTS.
            </p>
          </div>
        </div>

        {/* Center Section - Hover Area for 3D Tooth (Hidden on Mobile) */}
        <div className="h-full hidden lg:flex items-center justify-center relative min-w-[400px]">
           <div className="w-[300px] h-[550px] cursor-pointer group pointer-events-auto flex items-end justify-center pb-10">
              
              {/* Premium Rotating Scroll Indicator */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-1000 scale-90 group-hover:scale-100 flex items-center justify-center relative w-[140px] h-[140px]">
                
                {/* Rotating Text Ring */}
                <svg viewBox="0 0 100 100" className="absolute w-full h-full animate-[spin_12s_linear_infinite] opacity-60 text-[#f5f1eb] fill-current">
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                  <text className="text-[10px] font-bold tracking-[0.2em] uppercase">
                    <textPath href="#circlePath" startOffset="0%">
                      SCROLL TO EXPLORE • SCROLL TO EXPLORE • 
                    </textPath>
                  </text>
                </svg>

                {/* Center Arrow */}
                <div className="w-14 h-14 rounded-full backdrop-blur-xl bg-black/30 border border-white/20 flex items-center justify-center z-10 group-hover:bg-[#bb4413] group-hover:border-[#bb4413] transition-all duration-500 shadow-xl overflow-hidden">
                    <span className="inline-block text-[#f5f1eb] group-hover:text-black text-2xl font-light transition-transform duration-500 group-hover:translate-y-1">↓</span>
                </div>

              </div>

           </div>
        </div>

        {/* Right Section - Doctors Gallery Carousel (Hidden on Mobile) */}
        <div ref={sideContentRef} className="hidden lg:flex flex-col justify-end h-full pl-8 border-l border-white/10 w-[460px] overflow-hidden relative">
          <div className="relative w-full h-[310px] mt-12 mb-[2vh]">
            
            {/* Fixed Next Button overlaying the active card */}
            <div 
              onClick={nextSlide}
              className="absolute top-0 left-0 bg-[#bb4413] hover:bg-[#a63d10] cursor-pointer transition-colors px-5 py-2 flex items-center gap-2 text-white/90 font-medium text-[13px] tracking-wide z-20 rounded-br-xl shadow-lg"
            >
              Next <span className="text-[11px] font-light leading-none mt-[1px]">&gt;</span>
            </div>

            {/* Sliding Track */}
            <div 
              className="flex gap-3 w-max transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(calc(-${currentIndex * (210 + 12)}px))` }}
            >
              {doctors.map((doc) => (
                <div key={doc.id} className="relative w-[210px] h-[310px] group cursor-pointer overflow-hidden rounded-xl shrink-0">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 bg-[#161616]/90 backdrop-blur-md text-white/90 font-medium text-[13px] px-4 py-2.5 shadow-lg z-10 rounded-tr-xl">
                    {doc.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info Row (Desktop) */}
      <div ref={footerRef} className="hidden md:grid grid-cols-3 w-full text-[13px] text-white/60 font-medium mt-16 pt-8 border-t border-white/10 pb-8">
        <div>
          Best Dentistry<br />
          2025
        </div>
        <div className="text-center">
          Barcelona, Spain<br />
          17:17:03 GMT+1
        </div>
        <div className="text-right">
          Advanced Dental<br />
          Technologies
        </div>
      </div>

      {/* Footer Info Row (Mobile) */}
      <div className="hero-footer-mobile md:hidden w-full mt-auto pb-10 relative z-10 opacity-0 px-6">
        <div className="w-full h-[1px] bg-white/10 mb-6"></div>
        <div className="flex items-center gap-5">
          <div className="w-[46px] h-[46px] rounded-full border border-white/20 flex items-center justify-center shrink-0 shadow-lg">
            <Star className="w-[18px] h-[18px] text-[#bb4413] opacity-80 stroke-[1.5px] fill-transparent" />
          </div>
          <div className="text-[15px] text-white font-medium leading-[1.5] tracking-wide">
            Award Winning Dental Studio<br />
            <span className="text-[#f5f1eb]/50 font-normal text-[14px]">Barcelona • Since 2012</span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] tracking-[0.25em] text-[#f5f1eb]/40 uppercase font-semibold">Scroll</span>
          <div className="w-[1px] h-10 bg-white/20 relative">
            <div className="w-[3px] h-[3px] bg-white rounded-full absolute bottom-0 left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,1)]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
