import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('services');
  const [isHovered, setIsHovered] = useState(false);
  
  const navItems = [
    { name: 'Services', target: 'services' },
    { name: 'About', target: 'about' },
    { name: 'Team', target: 'doctors' },
    { name: 'Reviews', target: 'testimonials' },
    { name: 'Appointment', target: 'cta' }
  ];

  const handleScroll = (targetId) => {
    setActiveItem(targetId);
    // Standard smooth scroll which works well with Lenis/GSAP
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="w-full py-6 flex items-center justify-between font-sans relative z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-[22px] font-semibold text-white tracking-tight">Lume.</Link>
      </div>

      {/* Center Links (Frosted Pill) */}
      <div className="flex-none bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center">
        {navItems.map((item) => (
          <button
            key={item.target}
            onClick={() => handleScroll(item.target)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeItem === item.target ? 'text-black' : 'text-white/80 hover:text-white'
            }`}
          >
            {activeItem === item.target && (
              <motion.div
                layoutId="lumeActivePill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item.name}</span>
          </button>
        ))}
      </div>

      {/* Right Button */}
      <div className="flex-1 flex justify-end">
        <motion.button 
          layout
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold flex items-center justify-center min-w-[140px] h-[44px] hover:bg-white/90 transition-colors shadow-sm overflow-hidden relative"
        >
          {/* Base State (Phone + Call Now) */}
          <motion.div
            animate={isHovered ? "hover" : "initial"}
            className="flex items-center gap-2 absolute"
          >
            <motion.div
              variants={{
                initial: { x: 0, opacity: 1, rotate: 0 },
                hover: {
                  x: [0, -4, 4, -4, 4, 0, -40],
                  rotate: [0, -15, 15, -15, 15, 0, -45],
                  opacity: [1, 1, 1, 1, 1, 1, 0],
                  transition: {
                    duration: 0.6,
                    times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                    ease: "easeInOut"
                  }
                }
              }}
            >
              <Phone className="w-4 h-4" />
            </motion.div>
            <motion.span
              variants={{
                initial: { y: 0, opacity: 1 },
                hover: { 
                  y: -20, 
                  opacity: 0, 
                  transition: { duration: 0.3, delay: 0.3, ease: "easeIn" } 
                }
              }}
            >
              Call Now
            </motion.span>
          </motion.div>

          {/* Reveal State (Green Dot + Phone Number) */}
          <motion.div
            animate={isHovered ? "hover" : "initial"}
            variants={{
              initial: { x: 30, opacity: 0, pointerEvents: "none" },
              hover: { 
                x: 0, 
                opacity: 1, 
                pointerEvents: "auto",
                transition: { duration: 0.4, delay: 0.5, ease: "easeOut" } 
              }
            }}
            className="flex items-center gap-2 absolute"
          >
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-2 h-2 bg-green-500 rounded-full animate-ping opacity-75"></span>
              <span className="relative w-2 h-2 bg-green-500 rounded-full"></span>
            </div>
            <span className="font-bold tracking-tight">+1 (800) LUME</span>
          </motion.div>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
