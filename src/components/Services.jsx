import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AnimatedCheck = ({ delay }) => {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3 flex-shrink-0 text-lume-black/50 group-hover:text-[#c84b16] transition-colors duration-300">
      {/* Box */}
      <rect 
        x="3" y="3" width="18" height="18" rx="4" 
        stroke="currentColor" 
        strokeWidth="2" 
      />
      {/* Animated Checkmark Path */}
      <motion.path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          rest: { pathLength: 0, opacity: 0, transition: { duration: 0.1 } },
          hover: { pathLength: 1, opacity: 1, transition: { duration: 0.4, ease: "easeOut", delay } }
        }}
      />
    </svg>
  );
};

const ServiceCard = ({ icon, title, features, link }) => {
  const navigate = useNavigate();

  return (
    <motion.div 
      initial="rest"
      whileHover="hover"
      animate="rest"
      onClick={() => link ? navigate(link) : null}
      className="border border-black/10 bg-white rounded-[2rem] p-4 flex flex-col justify-between group cursor-pointer transition-all duration-300 hover:border-black/20 hover:shadow-xl"
    >
      <div className="bg-[#f5f5f7] rounded-[1.5rem] h-48 mb-6 flex items-center justify-center overflow-hidden">
        <div className="text-[4rem] group-hover:scale-110 transition-transform duration-500 ease-out">{icon}</div>
      </div>
      <div className="px-2">
        <h3 className="text-xl font-semibold mb-6 text-lume-black">{title}</h3>
        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center text-sm font-medium text-lume-black/70 group-hover:text-lume-black transition-colors duration-300">
              <AnimatedCheck delay={idx * 0.3} />
              {feature}
            </li>
          ))}
        </ul>
        <button 
          onClick={() => link ? navigate(link) : null}
          className="w-full py-3.5 bg-white border border-black/10 hover:border-[#c84b16] hover:bg-[#c84b16] hover:text-white rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-300 group/btn"
        >
          Explore more
          <div className="w-6 h-6 bg-lume-black group-hover/btn:bg-white group-hover/btn:text-[#c84b16] rounded-full flex items-center justify-center text-white ml-2 transition-colors duration-300">
            <ArrowRight className="w-3 h-3" />
          </div>
        </button>
      </div>
    </motion.div>
  );
};

const Services = () => {
  const servicesData = [
    {
      icon: "🦷",
      title: "General Dentistry",
      features: ["Routine Check-ups", "Professional Cleanings", "X-Rays & Exams"],
      link: "/services/general-dentistry"
    },
    {
      icon: "✨",
      title: "Cosmetic Dentistry",
      features: ["Teeth Whitening", "Veneers", "Smile Makeovers"],
      link: "/services/cosmetic-dentistry"
    },
    {
      icon: "⚙️",
      title: "Implants & Prosthetics",
      features: ["Dental Implants", "Dentures", "Bridges"],
      link: "/services/implants-prosthetics"
    },
    {
      icon: "🔧",
      title: "Restorative",
      features: ["Fillings", "Crowns", "Root Canals"],
      link: "/services/restorative-dentistry"
    }
  ];

  return (
    <section id="services" className="px-8 py-16 bg-white max-w-[1600px] mx-auto rounded-[3rem] mt-24">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold tracking-wide uppercase text-lume-black/60 mb-6">
            Our Services
          </div>
          <h2 className="text-[3.5rem] leading-tight font-display font-semibold text-lume-black tracking-tight max-w-[500px]">
            Dental Services for Every Need
          </h2>
        </div>
        <div className="max-w-[400px]">
          <p className="text-lume-black/80 font-medium mb-6">
            From preventive care to advanced cosmetic and restorative treatments, we provide a full range of dental services tailored to your needs.
          </p>
          <button className="bg-lume-black text-white rounded-full font-medium text-sm px-6 py-3 hover:bg-black/80 transition-colors">
            Explore All Services
          </button>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {servicesData.map((service, idx) => (
          <ServiceCard 
            key={idx}
            icon={service.icon}
            title={service.title}
            features={service.features}
            link={service.link}
          />
        ))}
      </div>
    </section>
  );
};

export default Services;
