import React, { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      id: "general",
      outline: "GENERAL",
      titleWord1: "General",
      titleWord2: "Dentistry",
      subtitle: "COMPREHENSIVE EXAMS. PREVENTATIVE CARE.",
      desc: "From thorough examinations to advanced cleanings, we safeguard your dental health with uncompromising precision.",
      image: "https://ik.imagekit.io/printf/my-post/ChatGPT%20Image%20Jun%203,%202026,%2004_42_02%20PM.png",
      icons: ["Checkups", "Cleanings", "Prevention"],
      link: "/services/general-dentistry"
    },
    {
      id: "cosmetic",
      outline: "COSMETIC",
      titleWord1: "Cosmetic",
      titleWord2: "Dentistry",
      subtitle: "ENHANCE YOUR SMILE. ELEVATE CONFIDENCE.",
      desc: "From veneers and whitening to complete smile makeovers, we create natural, beautiful results that last.",
      image: "https://ik.imagekit.io/printf/my-post/ChatGPT%20Image%20Jun%203,%202026,%2004_46_24%20PM.png",
      icons: ["Veneers", "Whitening", "Makeovers"],
      link: "/services/cosmetic-dentistry"
    },
    {
      id: "implants",
      outline: "IMPLANTS",
      titleWord1: "Implants &",
      titleWord2: "Prosthetics",
      subtitle: "PERMANENT. NATURAL-LOOKING.",
      desc: "State-of-the-art permanent solutions for missing teeth, expertly engineered to restore flawless function and aesthetics.",
      image: "https://ik.imagekit.io/printf/my-post/ChatGPT%20Image%20Jun%203,%202026,%2004_48_03%20PM.png",
      icons: ["Implants", "Crowns", "Bridges"],
      link: "/services/implants-prosthetics"
    },
    {
      id: "restorative",
      outline: "RESTORATION",
      titleWord1: "Restorative",
      titleWord2: "Care",
      subtitle: "ADVANCED STRUCTURAL REPAIR.",
      desc: "Meticulous restorative procedures utilizing premium materials to rebuild your smile with enduring strength.",
      image: "https://ik.imagekit.io/printf/my-post/ChatGPT%20Image%20Jun%203,%202026,%2004_50_21%20PM.png",
      icons: ["Fillings", "Root Canals", "Extractions"],
      link: "/services/restorative-dentistry"
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia();
      const panels = gsap.utils.toArray('.service-panel');

      // ==========================================
      // DESKTOP: 400vh Pinned Scrub
      // ==========================================
      matchMedia.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=400%", // 4 panels * 100vh scrub space
            pin: true,
            scrub: 1,
            id: "services-scrub" 
          }
        });

        panels.forEach((panel, i) => {
          if (i === 0) return; // First panel is visible initially

          const prevPanel = panels[i - 1];
          
          // Prev panel fades out and slides up
          tl.to(prevPanel, {
            y: -150,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          }, i * 2);

          // At the exact end of fade out, send to back and disable pointer events
          tl.set(prevPanel, { pointerEvents: "none", zIndex: 10 }, i * 2 + 1);

          // Setup starting states for incoming panel
          gsap.set(panel, { opacity: 0, y: 120 }); 
          const img = panel.querySelector('.service-image-container');
          gsap.set(img, { clipPath: 'inset(100% 0 0 0)' });
          
          const outline = panel.querySelector('.service-outline');
          gsap.set(outline, { opacity: 0 });

          const heading = panel.querySelector('.service-heading');
          gsap.set(heading, { y: 60, opacity: 0 });

          const desc = panel.querySelector('.service-desc');
          const icons = panel.querySelectorAll('.service-icon');
          gsap.set([desc, icons], { opacity: 0, y: 30 });

          // At the exact start of fade in, bring to front and enable pointer events
          tl.set(panel, { pointerEvents: "auto", zIndex: 50 }, i * 2);

          // Incoming panel animation sequence
          tl.to(panel, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out"
          }, i * 2);

          tl.to(img, {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: 1.2,
            ease: "power3.inOut"
          }, i * 2 + 0.2);

          tl.to(outline, {
            opacity: 0.08,
            duration: 1,
            ease: "power2.out"
          }, i * 2 + 0.5);

          tl.to(heading, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
          }, i * 2 + 0.6);

          tl.to(desc, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power2.out"
          }, i * 2 + 0.8);

          tl.to(icons, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power2.out"
          }, i * 2 + 0.9);
        });
      });

      // ==========================================
      // MOBILE: 100vh Stacked Chapters
      // ==========================================
      matchMedia.add("(max-width: 1023px)", () => {
        panels.forEach((panel) => {
          gsap.fromTo(panel, 
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0, duration: 1, ease: "power2.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 75%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="w-full lg:h-screen relative bg-transparent lg:overflow-hidden flex flex-col lg:block">
      <div ref={containerRef} className="lg:absolute inset-0 w-full lg:h-full flex flex-col lg:block">
        {services.map((service, idx) => (
          <div 
            key={service.id} 
            className={`service-panel relative lg:absolute lg:inset-0 w-full min-h-[100vh] lg:h-full flex items-center justify-center pointer-events-auto ${idx === 0 ? 'lg:z-50' : 'lg:z-10 lg:pointer-events-none'}`}
          >
            {/* Outline Background Text */}
            <div className="service-outline absolute top-[5%] lg:top-[10%] left-1/2 -translate-x-1/2 text-[18vw] lg:text-[22vw] font-display font-bold whitespace-nowrap z-0 tracking-tighter"
                 style={{ 
                   WebkitTextStroke: '1px rgba(255,255,255,0.08)', 
                   color: 'transparent',
                   opacity: 0.08 
                 }}>
              {service.outline}
            </div>

            {/* Layout Grid (Clickable) */}
            <div 
              className="w-full h-full max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 px-4 lg:px-16 pt-4 pb-12 lg:pt-32 lg:pb-16 relative z-10 items-center cursor-pointer"
              onClick={() => service.link ? navigate(service.link) : null}
            >
              
              {/* Left Side: Editorial Image (Hover Group) */}
              <div className="relative w-full h-[40vh] lg:h-[75vh] flex flex-col justify-end group mt-4 lg:mt-0">
                <div 
                  className="service-image-container absolute inset-0 w-full h-full overflow-hidden rounded-xl shadow-[0_40px_120px_rgba(0,0,0,0.35)]"
                  style={{ clipPath: 'inset(0% 0% 0% 0%)' }} // Static on mobile, GSAP overrides on desktop
                >
                  <img 
                    src={service.image} 
                    alt={service.titleWord1}
                    className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    style={{ filter: 'brightness(.75) contrast(1.1) saturate(.9)' }}
                  />
                  {/* Glass overlay on image instead of solid black */}
                  <div className="absolute inset-0" style={{ 
                    background: 'linear-gradient(180deg, rgba(0,0,0,.15), rgba(0,0,0,.35))'
                  }}></div>
                </div>

                {/* Arrow Button */}
                <div className="absolute bottom-4 right-4 lg:bottom-10 lg:right-10 z-20">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-md bg-black/10 group-hover:bg-[#f5f1eb] group-hover:border-[#f5f1eb] transition-all duration-500 shadow-lg">
                     <span className="inline-block text-[#f5f1eb] group-hover:text-black text-lg lg:text-xl font-light tracking-tighter leading-none transition-all duration-300 group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:scale-110">↗</span>
                  </div>
                </div>
              </div>

              {/* Right Side: Typography and Details */}
              <div className="flex flex-col justify-center h-full relative z-10 pt-6 lg:pt-0 pb-12 lg:pb-0">
                
                {/* Radial Spotlight Depth (Rule 7) */}
                <div className="absolute inset-0 -mx-4 lg:-mx-16 -my-8 lg:-my-16 -z-10 pointer-events-none" 
                     style={{ background: 'radial-gradient(circle at center, rgba(0,0,0,.15), transparent 70%)' }}></div>

                {/* Dark Glass Content Panel (Rule 2) */}
                <div className="relative p-5 lg:p-12 rounded-[2rem] lg:rounded-[2.5rem] bg-[rgba(0,0,0,0.25)] backdrop-blur-[16px] border border-[rgba(255,255,255,0.08)] shadow-2xl">
                  
                  {/* Heading (Rule 1 & 6) */}
                  <h2 className="service-heading text-[clamp(42px,11vw,110px)] font-display font-light leading-[0.95] tracking-[-0.02em] mb-5 lg:mb-10 drop-shadow-2xl">
                    <span className="block text-[#f5f1eb]">{service.titleWord1}</span>
                    <span className="block text-[#f4d8c9] mt-1 lg:mt-2 drop-shadow-lg">{service.titleWord2}</span>
                  </h2>

                  <div className="flex gap-4 lg:gap-8 mb-6 lg:mb-12">
                    {/* Gradient Divider (Rule 3) */}
                    <div className="w-[2px] h-auto lg:h-[120px] shrink-0" 
                         style={{ background: 'linear-gradient(to bottom, #ffffff, #bb4413)' }}></div>
                    
                    {/* Description */}
                    <div className="service-desc flex flex-col justify-center max-w-[280px]">
                      <p className="text-[#f5f1eb] text-[14px] lg:text-[12px] font-semibold tracking-[0.2em] uppercase mb-2 leading-relaxed opacity-90">
                        {service.subtitle}
                      </p>
                      <p className="text-[#f5f1eb]/80 text-[18px] lg:text-[15px] leading-relaxed font-medium drop-shadow-md">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Icon Strip (Rule 5) */}
                  <div className="flex flex-wrap gap-2 lg:gap-3">
                    {service.icons.map((icon, i) => (
                      <div key={i} className="service-icon group/chip flex items-center gap-2 lg:gap-2.5 rounded-full px-4 lg:px-5 py-2 lg:py-2.5 transition-all duration-300 cursor-default bg-[rgba(0,0,0,0.35)] lg:bg-[rgba(0,0,0,0.25)] border border-[rgba(255,255,255,0.15)] lg:border-[rgba(255,255,255,0.1)] hover:bg-white hover:border-white">
                        <div className="w-1.5 h-1.5 rounded-full border-2 border-[#bb4413] group-hover/chip:border-black transition-colors duration-300"></div>
                        <span className="text-[#f5f1eb] group-hover/chip:text-black text-[14px] lg:text-[11px] font-bold tracking-widest uppercase mt-[1px] transition-colors duration-300">{icon}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
