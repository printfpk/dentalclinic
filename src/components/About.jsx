import React, { useRef, useEffect } from 'react';
import { Microscope, Users, Sparkles, Smile } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const outlineRef = useRef(null);
  const titleLinesRef = useRef([]);
  const textLinesRef = useRef([]);
  const cardsRef = useRef([]);
  const trustRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(titleLinesRef.current,
        { yPercent: 100, filter: "blur(10px)" },
        { 
          yPercent: 0, 
          filter: "blur(0px)",
          duration: 1.5, 
          stagger: 0.1, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
      gsap.fromTo(textLinesRef.current,
        { yPercent: 100, filter: "blur(5px)", opacity: 0 },
        { 
          yPercent: 0, 
          filter: "blur(0px)",
          opacity: 1,
          duration: 1.5, 
          stagger: 0.05, 
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );

      // 2. Cinematic scrub timeline
      const tlScrub = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          pin: true,
          scrub: 1,
        }
      });

      tlScrub.fromTo(outlineRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 0.15, duration: 2, ease: "power2.out" }
      )
      .fromTo(cardsRef.current,
        { opacity: 0, y: 80, scale: 0.9, rotateZ: 2 },
        { opacity: 1, y: 0, scale: 1, rotateZ: 0, duration: 2, stagger: 0.5, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(trustRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 0.06, scale: 8, duration: 4, ease: "power2.inOut" },
        "+=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-transparent">
      
      {/* Background Outline Text */}
      <div 
        ref={outlineRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 opacity-0"
      >
        WHY LUME.
      </div>

      {/* Zoom Moment Text */}
      <div 
        ref={trustRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-white pointer-events-none whitespace-nowrap z-0 opacity-0 origin-center"
      >
        TRUST.
      </div>

      {/* Content Container */}
      <div className="px-8 py-16 w-full max-w-[1600px] mx-auto relative z-10 flex flex-col justify-center h-full">
        
        {/* Top Header */}
        <div className="flex flex-col justify-start items-start mb-24 relative w-full pt-12">
          <div>
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide uppercase text-white/80 mb-6">
              Why Choose Us
            </div>
            
            <div className="relative w-full overflow-hidden pb-2">
              <h2 
                ref={el => titleLinesRef.current[0] = el}
                className="relative z-10 text-[3.5rem] leading-tight font-display font-bold text-white tracking-tight"
              >
                About Lume Dental Clinic
              </h2>
            </div>
          </div>
        </div>

        {/* Intro Text - Masked Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-5xl relative z-10">
          <div className="text-lg text-white/80 font-medium space-y-4">
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[0] = el}>At Lume Dental, we believe that a healthy smile is</p>
            </div>
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[1] = el}>a gateway to confidence and well-being.</p>
            </div>
            <div className="overflow-hidden pb-1 mt-4">
              <p ref={el => textLinesRef.current[2] = el}>Our team of experienced dentists and hygienists</p>
            </div>
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[3] = el}>use the latest technology to provide top-quality dental</p>
            </div>
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[4] = el}>care in a comfortable and welcoming environment.</p>
            </div>
          </div>
          <div className="text-lg text-white/80 font-medium md:pt-1 space-y-4">
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[5] = el}>Whether you need routine cleanings, cosmetic</p>
            </div>
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[6] = el}>enhancements, or advanced procedures, we are</p>
            </div>
            <div className="overflow-hidden pb-1">
              <p ref={el => textLinesRef.current[7] = el}>here to help you achieve the smile of your dreams.</p>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {[
            {
              icon: <Microscope className="w-6 h-6" />,
              title: "State-of-the-art equipment",
              text: "We use the latest advancements in dental technology."
            },
            {
              icon: <Users className="w-6 h-6" />,
              title: "Experienced professionals",
              text: "Our team brings years of expertise and a passion for care."
            },
            {
              icon: <Sparkles className="w-6 h-6" />,
              title: "Pain-free treatments",
              text: "We understand visits can be stressful, we prioritize gentle techniques."
            },
            {
              icon: <Smile className="w-6 h-6" />,
              title: "Personalized approach",
              text: "Every smile is unique, and so is every treatment plan."
            }
          ].map((card, idx) => (
            <div 
              key={idx} 
              ref={el => cardsRef.current[idx] = el}
              className="group border border-white/20 bg-white/15 hover:border-[#bb4413] hover:bg-[#bb4413]/20 rounded-[2rem] p-8 flex flex-col justify-between h-[320px] transition-all duration-300 cursor-pointer backdrop-blur-md opacity-0 shadow-lg"
            >
              <div className="w-12 h-12 bg-white/20 group-hover:bg-[#bb4413] rounded-full flex items-center justify-center text-white transition-colors duration-300 shadow-sm">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-white transition-colors duration-300">{card.title}</h3>
                <p className="text-white/60 group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors duration-300">
                  {card.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About
