import React, { useRef, useEffect } from 'react';
import { Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef(null);
  const outlineRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const confidenceRef = useRef(null);

  const reviews = [
    {
      name: "Jeremy Curry",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop",
      text: "The team at Lume Dental is incredible. I've always had anxiety about visiting the dentist, but they made me feel completely at ease. My new veneers look totally natural."
    },
    {
      name: "Stella Lawson",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
      text: "State of the art facility and the most professional staff I've ever encountered. The entire process from booking to the actual procedure was flawless."
    },
    {
      name: "Marco Silva",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
      text: "I recently had an implant procedure here and the results exceeded my expectations. Dr. Cox and her team are true artists. Highly recommend to anyone."
    }
  ];

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Entrance Animation
      gsap.fromTo(headerRef.current, 
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

      const isMobile = window.innerWidth < 768;

      // 2. Cinematic scrub timeline
      const tlScrub = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: isMobile ? "+=100%" : "+=250%",
          pin: !isMobile,
          scrub: isMobile ? 0.3 : 1,
        }
      });

      const validCards = cardsRef.current.filter(Boolean);

      tlScrub.fromTo(outlineRef.current,
        { y: "10%", opacity: 0 },
        { y: "-15%", opacity: 0.15, duration: 2, ease: "none" }
      )
      .fromTo(validCards,
        { opacity: 0, y: isMobile ? 40 : 150, scale: isMobile ? 0.95 : 0.8, rotateY: isMobile ? 0 : 15, transformPerspective: 1000 },
        { opacity: 1, y: 0, scale: 1, rotateY: 0, duration: 2, stagger: isMobile ? 0.5 : 1.5, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(confidenceRef.current,
        { opacity: 0, scale: 1 },
        { opacity: 0.05, scale: 8, duration: 4, ease: "power2.inOut" },
        "+=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-transparent">
      
      {/* Background Outline Text */}
      <div 
        ref={outlineRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 opacity-0"
      >
        TRUST.
      </div>

      {/* Zoom Moment Text */}
      <div 
        ref={confidenceRef} 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-bold text-white pointer-events-none whitespace-nowrap z-0 opacity-0 origin-center"
      >
        CONFIDENCE.
      </div>

      {/* Content Container */}
      <div className="px-8 py-16 w-full max-w-[1600px] mx-auto relative z-10 flex flex-col justify-center h-full">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col items-center text-center mb-20 relative w-full pt-12 opacity-0">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide uppercase text-white/80 mb-6">
            Patient Stories
          </div>
          <h2 className="text-[clamp(40px,8vw,56px)] leading-tight font-display font-bold text-white tracking-tight">
            Real Stories from<br />Real Smiles
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
          {reviews.map((review, idx) => (
            <div 
              key={idx} 
              ref={el => cardsRef.current[idx] = el}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-10 flex flex-col justify-between backdrop-blur-sm relative opacity-0"
            >
              <div className="absolute top-8 right-8 text-white/10">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>
              
              <div className="mb-8 relative z-10">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#bb4413] text-[#bb4413]" />
                  ))}
                </div>
                <p className="text-white/80 text-lg leading-relaxed font-medium">"{review.text}"</p>
              </div>
              
              <div className="flex items-center gap-4 relative z-10">
                <img 
                  src={review.image} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-white font-semibold">{review.name}</h4>
                  <div className="text-white/50 text-sm">Verified Patient</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
