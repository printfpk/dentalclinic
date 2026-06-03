import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, User, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('services');
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { name: 'Services', target: 'services' },
    { name: 'About', target: 'about' },
    { name: 'Team', target: 'doctors' },
    { name: 'Reviews', target: 'testimonials' },
    { name: 'Appointment', target: 'cta' }
  ];

  const handleScroll = (targetId) => {
    setActiveItem(targetId);
    setIsMobileMenuOpen(false); // Close mobile menu on click
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="w-full py-6 px-4 md:px-8 flex items-center justify-between font-sans relative z-50">
        
        {/* Mobile: Hamburger (Left) */}
        <div className="flex-1 md:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white hover:text-white/80 transition-colors p-2 -ml-2"
          >
            <Menu className="w-7 h-7" strokeWidth={2} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex-1 text-center md:text-left">
          <Link to="/" className="text-[22px] font-semibold text-white tracking-tight">
            <span className="hidden md:inline">Lume.</span>
            <span className="md:hidden tracking-widest text-lg">LUME DENTAL</span>
          </Link>
        </div>

        {/* Desktop: Center Links (Frosted Pill) */}
        <div className="hidden md:flex flex-none bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 items-center">
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

        {/* Desktop: Right Actions */}
        <div className="hidden md:flex flex-1 justify-end items-center gap-3">
          {/* Login Button */}
          <button className="w-[44px] h-[44px] rounded-full bg-white flex items-center justify-center text-black hover:bg-white/90 transition-colors duration-300 cursor-pointer shadow-sm">
            <User className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>

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
                    transition: { duration: 0.6, times: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1], ease: "easeInOut" }
                  }
                }}
              >
                <Phone className="w-4 h-4" />
              </motion.div>
              <motion.span
                variants={{
                  initial: { y: 0, opacity: 1 },
                  hover: { y: -20, opacity: 0, transition: { duration: 0.3, delay: 0.3, ease: "easeIn" } }
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
                hover: { x: 0, opacity: 1, pointerEvents: "auto", transition: { duration: 0.4, delay: 0.5, ease: "easeOut" } }
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

        {/* Mobile: Call Button (Right) */}
        <div className="flex-1 flex justify-end md:hidden">
          <button onClick={() => handleScroll('cta')} className="text-sm font-semibold text-white tracking-widest uppercase">
            Call
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] flex flex-col px-6 py-8"
          >
            {/* Overlay Header */}
            <div className="flex justify-between items-center w-full mb-20">
              <span className="text-white tracking-widest text-lg font-semibold">LUME DENTAL</span>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white hover:text-white/70 transition-colors p-2 -mr-2 bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Staggered Navigation Links */}
            <div className="flex flex-col gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.target}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 + (i * 0.1), ease: "easeOut" }}
                >
                  <button
                    onClick={() => handleScroll(item.target)}
                    className="text-[48px] font-medium text-white/90 hover:text-[#bb4413] transition-colors leading-none tracking-tight text-left"
                  >
                    {item.name}
                  </button>
                </motion.div>
              ))}
              
              {/* Mobile Login */}
              <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.1 + (navItems.length * 0.1), ease: "easeOut" }}
                  className="mt-8 pt-8 border-t border-white/10"
              >
                  <button className="flex items-center gap-4 text-2xl font-medium text-white/70 hover:text-white transition-colors">
                    <User className="w-8 h-8" />
                    Client Login
                  </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
