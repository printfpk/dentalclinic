import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import Doctors from '../components/Doctors';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="font-sans selection:bg-lume-cyan/50 selection:text-lume-black text-lume-black">
      
      {/* Orange Denta Header/Hero Section */}
      <div className="w-full bg-denta-orange" style={{ background: 'linear-gradient(135deg, #cc4e17 0%, #b23f10 100%)' }}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <Navbar />
          <Hero />
        </div>
      </div>

      {/* Rest of the original Lume Dental sections */}
      <div className="max-w-[1600px] mx-auto mt-16">
        <main>
          <Services />
          <About />
          <Doctors />
          <Testimonials />
        </main>
      </div>

    </div>
  );
};

export default Home;
