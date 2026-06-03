import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-transparent text-slate-300 pt-20 pb-10 border-t border-white/10 relative z-10">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-display font-bold text-white tracking-tight">Lume.</span>
            </div>
            <p className="text-[18px] lg:text-base leading-relaxed text-white/70">
              Transforming smiles and improving lives through expert dental care. Your health and comfort are our top priorities.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bb4413] transition-colors hover:-translate-y-1 text-white border border-white/10">
                <svg className="w-5 h-5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bb4413] transition-colors hover:-translate-y-1 text-white border border-white/10">
                <svg className="w-5 h-5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
              </a>
              <a href="#" className="w-12 h-12 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#bb4413] transition-colors hover:-translate-y-1 text-white border border-white/10">
                <svg className="w-5 h-5 lg:w-4 lg:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-[22px] lg:text-lg mb-6 tracking-wide">Quick Links</h3>
            <ul className="space-y-4 lg:space-y-3">
              {['Home', 'About Us', 'Our Services', 'Testimonials', 'Contact Us'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-[18px] lg:text-base flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bb4413]/50 group-hover:bg-[#bb4413] transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold text-[22px] lg:text-lg mb-6 tracking-wide">Our Services</h3>
            <ul className="space-y-4 lg:space-y-3">
              {['Teeth Whitening', 'Dental Implants', 'Root Canal', 'Cosmetic Dentistry', 'Orthodontics'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-white/70 hover:text-white transition-colors text-[18px] lg:text-base flex items-center gap-3 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#bb4413]/50 group-hover:bg-[#bb4413] transition-colors"></span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-[22px] lg:text-lg mb-6 tracking-wide">Contact Us</h3>
            <ul className="space-y-5 lg:space-y-4 text-[18px] lg:text-base text-white/70">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#bb4413] transition-colors border border-white/10">
                  <MapPin className="w-5 h-5 lg:w-4 lg:h-4 text-[#bb4413] group-hover:text-white transition-colors" />
                </div>
                <span className="pt-2 lg:pt-1 leading-relaxed">123 Dental Street, Healthcare City, NY 10001</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#bb4413] transition-colors border border-white/10">
                  <Phone className="w-5 h-5 lg:w-4 lg:h-4 text-[#bb4413] group-hover:text-white transition-colors" />
                </div>
                <span>+1 (800) LUME</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 lg:w-8 lg:h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 group-hover:bg-[#bb4413] transition-colors border border-white/10">
                  <Mail className="w-5 h-5 lg:w-4 lg:h-4 text-[#bb4413] group-hover:text-white transition-colors" />
                </div>
                <span>hello@lumedental.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6 text-[16px] lg:text-sm text-white/50">
          <p>© 2026 Lume Dental. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
