import React, { useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CTA = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  const outlineRef = useRef(null);
  const smileRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      // Entrance Animations
      gsap.fromTo(outlineRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(20px)" },
        { 
          opacity: 0.15, 
          scale: 1, 
          filter: "blur(0px)",
          duration: 2, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50, filter: "blur(15px)" },
        { 
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
      gsap.fromTo(buttonRef.current,
        { opacity: 0, y: 30, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          duration: 1.5, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          }
        }
      );

      // Desktop: Cinematic scrub
      matchMedia.add("(min-width: 1024px)", () => {
        const tlScrub = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=150%",
            pin: true,
            scrub: 1,
          }
        });

        tlScrub.fromTo(smileRef.current,
          { opacity: 0, scale: 1 },
          { opacity: 0.1, scale: 15, duration: 5, ease: "power2.inOut" }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-transparent py-20 lg:py-0">
      
      {/* Desktop Background Outline Text */}
      <div 
        ref={outlineRef} 
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 opacity-0 tracking-tighter"
      >
        READY?
      </div>

      {/* Desktop Extreme Zoom Moment Text */}
      <div 
        ref={smileRef} 
        className="hidden lg:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-[#f5f1eb] pointer-events-none whitespace-nowrap z-0 opacity-0 origin-center tracking-tight"
      >
        BEGIN.
      </div>

      {/* Mobile Static Background Text */}
      <div className="lg:hidden absolute top-[15%] left-1/2 -translate-x-1/2 text-[30vw] font-display font-bold text-outline opacity-10 pointer-events-none whitespace-nowrap tracking-tighter" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.8)' }}>
        BEGIN.
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 lg:px-8 text-center max-w-4xl mx-auto">
        <div ref={textRef} className="opacity-0">
          <div className="inline-flex items-center px-5 py-2 lg:px-4 lg:py-1.5 rounded-full border border-white/20 text-[14px] lg:text-xs font-semibold tracking-wide uppercase text-white/80 mb-8 backdrop-blur-sm">
            Book Your Visit
          </div>
          <h2 className="text-[clamp(42px,10vw,96px)] leading-[1.0] font-display font-bold text-[#f5f1eb] tracking-tight mb-8 drop-shadow-lg">
            Ready for your<br />best smile?
          </h2>
          <p className="text-[20px] lg:text-xl text-[#f5f1eb]/80 font-medium max-w-2xl mx-auto mb-12 leading-relaxed">
            Join thousands of happy patients who trust Lume Dental with their smiles. Book your comprehensive consultation today.
          </p>
        </div>

        <button 
          ref={buttonRef}
          className="group/btn relative inline-flex items-center justify-center px-8 lg:px-8 py-5 lg:py-5 text-[18px] lg:text-lg font-bold text-[#bb4413] bg-[#f5f1eb] rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] opacity-0 w-full sm:w-auto"
        >
          <span className="relative z-10 flex items-center justify-center w-full">
            Schedule Appointment
            <div className="w-10 h-10 lg:w-8 lg:h-8 ml-4 lg:ml-3 bg-[#bb4413]/10 rounded-full flex items-center justify-center group-hover/btn:bg-[#bb4413] group-hover/btn:text-white transition-colors duration-300">
              <ArrowRight className="w-5 h-5 lg:w-4 lg:h-4" />
            </div>
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTA;
