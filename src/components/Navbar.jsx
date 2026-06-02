import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [activeItem, setActiveItem] = useState('Home');
  const navItems = ['Home', 'About', 'Product', 'Services', 'Appointment'];

  return (
    <nav className="w-full py-6 flex items-center justify-between font-sans relative z-50">
      {/* Logo */}
      <div className="flex-1">
        <Link to="/" className="text-[22px] font-semibold text-white tracking-tight">LifePath</Link>
      </div>

      {/* Center Links (Frosted Pill) */}
      <div className="flex-none bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 flex items-center">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
              activeItem === item ? 'text-black' : 'text-white/80 hover:text-white'
            }`}
          >
            {activeItem === item && (
              <motion.div
                layoutId="lifePathActivePill"
                className="absolute inset-0 bg-white rounded-full shadow-sm -z-10"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{item}</span>
          </button>
        ))}
      </div>

      {/* Right Button */}
      <div className="flex-1 flex justify-end">
        <button className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-white/90 transition-colors shadow-sm">
          <Phone className="w-4 h-4" />
          Call Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
