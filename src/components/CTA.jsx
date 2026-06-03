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
      // 1. Entrance Animation
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

      // 2. Cinematic scrub timeline
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
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="cta" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-transparent">
      
      {/* Background Outline Text */}
      <div 
        ref={outlineRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 opacity-0"
      >
        YOUR SMILE.
      </div>

      {/* Extreme Zoom Moment Text */}
      <div 
        ref={smileRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-display font-bold text-white pointer-events-none whitespace-nowrap z-0 opacity-0 origin-center"
      >
        SMILE.
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-8 text-center max-w-4xl mx-auto">
        <div ref={textRef} className="opacity-0">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide uppercase text-white/80 mb-8">
            Book Your Visit
          </div>
          <h2 className="text-[4rem] md:text-[6rem] leading-[1.1] font-display font-bold text-white tracking-tight mb-8">
            Ready for your<br />best smile?
          </h2>
          <p className="text-xl text-white/70 font-medium max-w-2xl mx-auto mb-12">
            Join thousands of happy patients who trust Lume Dental with their smiles. Book your comprehensive consultation today.
          </p>
        </div>

        <button 
          ref={buttonRef}
          className="group/btn relative inline-flex items-center justify-center px-8 py-5 text-lg font-bold text-[#bb4413] bg-white rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] opacity-0"
        >
          <span className="relative z-10 flex items-center">
            Schedule Appointment
            <div className="w-8 h-8 ml-3 bg-[#bb4413]/10 rounded-full flex items-center justify-center group-hover/btn:bg-[#bb4413] group-hover/btn:text-white transition-colors duration-300">
              <ArrowRight className="w-4 h-4" />
            </div>
          </span>
        </button>
      </div>
    </section>
  );
};

export default CTA;
