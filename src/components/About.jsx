import React from 'react';
import { Microscope, Users, Sparkles, Smile } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="px-8 py-16 bg-lume-white max-w-[1600px] mx-auto rounded-[3rem]">
      {/* Top Header */}
      <div className="mb-12">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide uppercase text-lume-black/60 mb-6">
          Why Choose Us
        </div>
        <h2 className="text-[3.5rem] leading-tight font-display font-semibold text-lume-black tracking-tight">
          About Lume Dental Clinic
        </h2>
      </div>

      {/* Intro Text */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 max-w-5xl">
        <div className="text-lg text-lume-black/80 font-medium">
          <p className="mb-4">
            At Lume Dental, we believe that a healthy smile is a gateway to confidence and well-being.
          </p>
          <p>
            Our team of experienced dentists and hygienists use the latest technology to provide top-quality dental care in a comfortable and welcoming environment.
          </p>
        </div>
        <div className="text-lg text-lume-black/80 font-medium md:pt-1">
          Whether you need routine cleanings, cosmetic enhancements, or advanced procedures, we are here to help you achieve the smile of your dreams.
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            icon: <Microscope className="w-6 h-6" />,
            title: "State-of-the-art equipment",
            text: "We use the latest advancements in dental technology to provide the highest quality care."
          },
          {
            icon: <Users className="w-6 h-6" />,
            title: "Experienced & caring professionals",
            text: "Our team of dentists, hygienists, and specialists brings years of expertise and a passion for patient care."
          },
          {
            icon: <Sparkles className="w-6 h-6" />,
            title: "Pain-free, stress-free treatments",
            text: "We understand that dental visits can be stressful, which is why we prioritize gentle techniques."
          },
          {
            icon: <Smile className="w-6 h-6" />,
            title: "Personalized approach for every patient",
            text: "Every smile is unique, and so is every treatment plan. We take time to understand you."
          }
        ].map((card, idx) => (
          <div key={idx} className="group border border-black/10 bg-white hover:border-[#c84b16] hover:bg-[#c84b16] rounded-[2rem] p-8 flex flex-col justify-between h-[320px] transition-colors duration-300 cursor-pointer shadow-sm hover:shadow-xl">
            <div className="w-12 h-12 bg-lume-black group-hover:bg-white rounded-full flex items-center justify-center text-white group-hover:text-lume-black transition-colors duration-300">
              {card.icon}
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3 text-lume-black group-hover:text-white transition-colors duration-300">{card.title}</h3>
              <p className="text-lume-black/70 group-hover:text-white/90 font-medium text-sm leading-relaxed transition-colors duration-300">
                {card.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
