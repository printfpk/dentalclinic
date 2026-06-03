import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Doctors = () => {
  const sectionRef = useRef(null);
  const outlineRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const expertsRef = useRef(null);

  const doctors = [
    {
      name: "Beatrice Cox",
      role: "Dentist",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Austin Camacho",
      role: "Surgeon",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Fletcher Morse",
      role: "Dentist",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Aysha Hayes",
      role: "Orthodontist",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop"
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
        { x: "5%", opacity: 0 },
        { x: "-5%", opacity: 0.15, duration: 2, ease: "none" }
      )
        .fromTo(cardsRef.current,
          { opacity: 0, y: 150, scale: 0.8, rotateX: 15, transformPerspective: 1000 },
          { opacity: 1, y: 0, scale: 1, rotateX: 0, duration: 2, stagger: 1.2, ease: "power3.out" },
          "-=1.5"
        )
        .fromTo(expertsRef.current,
          { opacity: 0, scale: 1 },
          { opacity: 0.08, scale: 7, duration: 4, ease: "power2.inOut" },
          "+=0.5"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="doctors" className="w-full min-h-screen flex items-center justify-center relative overflow-hidden z-10 bg-transparent">

      {/* Background Outline Text */}
      <div
        ref={outlineRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-display font-bold text-outline pointer-events-none whitespace-nowrap z-0 opacity-0"
      >
        DENTAL EXPERTS.
      </div>

      {/* Zoom Moment Text */}
      <div
        ref={expertsRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-display font-bold text-white pointer-events-none whitespace-nowrap z-0 opacity-0 origin-center"
      >
        EXPERTS.
      </div>

      {/* Content Container */}
      <div className="px-8 py-16 w-full max-w-[1600px] mx-auto relative z-10 flex flex-col justify-center h-full">

        {/* Top Header */}
        <div ref={headerRef} className="flex flex-col justify-start items-start mb-16 relative w-full pt-12 opacity-0">
          <div className="w-full">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-white/20 text-xs font-semibold tracking-wide uppercase text-white/80 mb-6">
              Our Doctors
            </div>

            <h2 className="relative z-10 text-[3.5rem] leading-tight font-display font-bold text-white tracking-tight mb-8">
              Dental Experts<br />You Can Trust
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 relative z-10 mt-8">
              <button className="px-6 py-2.5 rounded-full bg-white text-[#bb4413] font-semibold text-sm transition-colors">
                All Experts
              </button>
              <button className="px-6 py-2.5 rounded-full bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-[#bb4413] transition-colors">
                Dentists
              </button>
              <button className="px-6 py-2.5 rounded-full bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-[#bb4413] transition-colors">
                Surgeons
              </button>
              <button className="px-6 py-2.5 rounded-full bg-transparent border border-white/20 text-white font-semibold text-sm hover:bg-white hover:text-[#bb4413] transition-colors">
                Orthodontists
              </button>
            </div>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
          {doctors.map((doc, idx) => (
            <div
              key={idx}
              ref={el => cardsRef.current[idx] = el}
              className="flex flex-col group cursor-pointer transition-all duration-500 hover:-translate-y-2 opacity-0"
            >
              <div className="relative rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 h-[360px] mb-6 shadow-md group-hover:shadow-2xl transition-all duration-500">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#bb4413] group-hover:w-full transition-all duration-500 ease-in-out"></div>
              </div>
              <h3 className="text-xl font-semibold mb-1 text-white group-hover:text-[#bb4413] transition-colors">{doc.name}</h3>
              <p className="text-white/60 font-medium text-sm">{doc.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;
