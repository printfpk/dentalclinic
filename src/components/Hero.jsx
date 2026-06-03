import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';

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
    // Cinematic entrance sequence
    const tl = gsap.timeline();
    
    gsap.set([outlineTextRef.current, sideContentRef.current, footerRef.current], {
      opacity: 0
    });

    // Fast initial load for background (starts right away)
    tl.to(outlineTextRef.current, {
      opacity: 0.15,
      duration: 2,
      ease: "power2.inOut"
    }, 0.5);

    // Staggered line-by-line reveal (delayed to let 3D Canvas compile shaders)
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

    return () => tl.kill();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative w-full h-[calc(100vh-100px)] min-h-[750px] flex flex-col justify-between pt-8 pb-8 z-10">

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center flex-1 h-full">

        {/* Left Section - Typography */}
        <div className="flex flex-col justify-center h-full w-full relative">
          
          {/* Background Outline Text */}
          <div 
            ref={outlineTextRef}
            className="absolute top-1/2 left-0 -translate-y-1/2 text-[10rem] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 will-change-[opacity]"
          >
            MODERN CARE
          </div>

          <div ref={solidTextRef} className="relative z-10 max-w-[500px]">
            
            {/* Subtitle */}
            <div className="mb-12 max-w-[320px]">
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">From preventive care</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">to complex restorations,</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">a comprehensive approach</p></div>
              <div className="overflow-hidden pb-1"><p className="hero-subtitle-line text-white/60 text-[1.1rem] leading-snug font-medium translate-y-[110%] will-change-transform">to your dental health.</p></div>
            </div>
            
            {/* Main Title */}
            <h1 className="text-[6.5rem] leading-[0.95] font-display tracking-[-0.03em]">
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/70 translate-y-[110%] will-change-transform">Modern</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/50 translate-y-[110%] will-change-transform">Care for</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/90 translate-y-[110%] will-change-transform">a Perfect</span></div>
              <div className="overflow-hidden pb-2"><span className="hero-title-line block text-white/100 translate-y-[110%] will-change-transform">Smile</span></div>
            </h1>
          </div>
        </div>

        {/* Center Section - Hover Area for 3D Tooth */}
        <div className="h-full flex items-center justify-center relative min-w-[400px]">
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

        {/* Right Section - Doctors Gallery Carousel */}
        <div ref={sideContentRef} className="flex flex-col justify-end h-full pl-8 border-l border-white/10 w-[460px] overflow-hidden relative">
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

      {/* Footer Info Row */}
      <div ref={footerRef} className="grid grid-cols-3 w-full text-[13px] text-white/60 font-medium mt-16 pt-8 border-t border-white/10">
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
    </section>
  );
};

export default Hero;
