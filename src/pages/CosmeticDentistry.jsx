import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ScrollControls, Scroll, useScroll, Resize, Center, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Smile, Clock, Monitor, Zap, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Interactive Before/After Slider Component
const InteractiveSlider = () => {
  const [sliderPos, setSliderPos] = useState(50);
  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-[2rem] overflow-hidden cursor-ew-resize select-none bg-[#b23f10] border border-white/20 shadow-2xl">
      {/* Before Image (Simulated) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20">
        <span className="text-5xl md:text-7xl font-bold text-white/30 tracking-widest uppercase">Before</span>
        <span className="mt-4 text-white/50">Discolored & Misaligned</span>
      </div>
      
      {/* After Image (Simulated via Clip Path) */}
      <div 
        className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md" 
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <span className="text-5xl md:text-7xl font-bold text-white shadow-sm tracking-widest uppercase">After</span>
        <span className="mt-4 text-white font-medium">Bright & Perfect Symmetry</span>
      </div>
      
      <input 
        type="range" min="0" max="100" value={sliderPos} onChange={e => setSliderPos(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
      />
      
      {/* Slider Handle */}
      <div className="absolute top-0 bottom-0 w-1 bg-white z-10 pointer-events-none" style={{ left: `${sliderPos}%` }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
           <div className="flex gap-1">
             <div className="w-1 h-5 bg-gray-300 rounded-full"></div>
             <div className="w-1 h-5 bg-gray-300 rounded-full"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

// The 3D Object reacting to Scroll
const CosmeticScrollingScene = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const groupRef = useRef();
  const wrapperRef = useRef();
  
  // Refs for 3D Text elements
  const text1Ref = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();

  useFrame(() => {
    if (!groupRef.current || !wrapperRef.current) return;
    
    // Calculate how many viewport heights the user has scrolled
    const viewportsScrolled = window.scrollY / window.innerHeight;

    // --- TEETH ANIMATION (Only active in first 400vh) ---
    const heroProgress = Math.min(viewportsScrolled / 4, 1); 
    
    const targetRotY = heroProgress * Math.PI * 4; 
    const targetRotX = heroProgress * Math.PI * 0.5; 
    const targetScale = 1 + heroProgress * 0.5;

    let targetPosX = 0;
    if (heroProgress > 0.15 && heroProgress < 0.5) targetPosX = 3; 
    else if (heroProgress >= 0.5 && heroProgress < 0.85) targetPosX = -3; 

    // Lerp teeth properties
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    wrapperRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    wrapperRef.current.position.x = THREE.MathUtils.lerp(wrapperRef.current.position.x, targetPosX, 0.05);

    // Fade out tooth completely after 400vh
    const toothOpacity = viewportsScrolled > 4 ? 1 - Math.min((viewportsScrolled - 4) * 2, 1) : 1;
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, toothOpacity, 0.1);
      }
    });

    // --- 3D TEXT ANIMATIONS ---
    const animateGroupOpacity = (ref, targetOpacity) => {
      if (!ref.current) return;
      ref.current.children.forEach(child => {
        if (child.material) {
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
        }
      });
    };

    if (text1Ref.current) {
      const opacity = heroProgress < 0.15 ? 1 : 0;
      animateGroupOpacity(text1Ref, opacity);
      const targetZ = heroProgress < 0.15 ? 1.5 : 5; 
      text1Ref.current.position.z = THREE.MathUtils.lerp(text1Ref.current.position.z, targetZ, 0.1);
    }

    if (text2Ref.current) {
      const isActive = heroProgress > 0.15 && heroProgress < 0.5;
      animateGroupOpacity(text2Ref, isActive ? 1 : 0);
      const targetZ = isActive ? 0 : -5; 
      text2Ref.current.position.z = THREE.MathUtils.lerp(text2Ref.current.position.z, targetZ, 0.1);
    }

    if (text3Ref.current) {
      const isActive = heroProgress > 0.5 && heroProgress < 0.85;
      animateGroupOpacity(text3Ref, isActive ? 1 : 0);
      const targetZ = isActive ? 0 : -5;
      text3Ref.current.position.z = THREE.MathUtils.lerp(text3Ref.current.position.z, targetZ, 0.1);
    }
  });

  return (
    <group>
      <group ref={wrapperRef}>
        <Resize scale={3}>
          <Center>
            <group ref={groupRef} position={[0, -0.5, 0]}>
              <primitive object={scene} />
            </group>
          </Center>
        </Resize>
      </group>

      <group ref={text1Ref} position={[0, 0, 1.5]}>
        <Text position={[-0.7, 0, 0]} fontSize={0.65} fontWeight="bold" color="white" anchorX="right" anchorY="bottom" material-transparent={true}>
          Cosmetic
        </Text>
        <Text position={[0.7, 0, 0]} fontSize={0.65} fontWeight="bold" color="white" anchorX="left" anchorY="bottom" material-transparent={true}>
          Dentistry
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.16} color="white" anchorX="center" anchorY="top" maxWidth={4} textAlign="center" material-transparent={true}>
          Enhance confidence with whitening, veneers, smile makeovers, and digital smile design.
        </Text>
      </group>

      <group ref={text2Ref} position={[-2.5, 0, -5]}>
        <Text fontSize={0.65} fontWeight="bold" color="white" anchorX="center" anchorY="bottom" material-transparent={true} textAlign="center" lineHeight={1.1}>
          {"Teeth\nWhitening"}
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="top" maxWidth={3.5} textAlign="center" material-transparent={true}>
          Professional laser whitening and take-home kits for a brilliantly bright smile.
        </Text>
      </group>

      <group ref={text3Ref} position={[2.5, 0, -5]}>
        <Text fontSize={0.65} fontWeight="bold" color="white" anchorX="center" anchorY="bottom" material-transparent={true} textAlign="center" lineHeight={1.1}>
          {"Porcelain\nVeneers"}
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="top" maxWidth={3.5} textAlign="center" material-transparent={true}>
          Seamlessly correct gaps and shape with ultra-thin, natural-looking porcelain.
        </Text>
      </group>
    </group>
  );
};

const CosmeticDentistry = () => {
  return (
    <div className="w-full min-h-screen font-sans selection:bg-lume-cyan/50 selection:text-lume-black text-white bg-denta-orange" 
         style={{ background: 'linear-gradient(135deg, #cc4e17 0%, #b23f10 100%)' }}>
      
      <div className="absolute top-0 left-0 w-full z-50">
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <Navbar />
        </div>
      </div>

      {/* Main 3D Scroll Canvas (Fixed Background) */}
      <div className="w-full h-screen fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            <CosmeticScrollingScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Standard HTML Overlay (Naturally scrolls the window) */}
      <div className="relative w-full z-10 pt-24">
        
        {/* 400vh spacer for the WebGL hero to play out before HTML content appears */}
        <div style={{ height: '400vh', width: '100%' }} className="pointer-events-none"></div>

        {/* --- START OF HTML CONTENT --- */}
        <div className="w-full text-white py-32 px-8 md:px-24">
          <div className="max-w-[1400px] mx-auto">
            
            {/* Sticky Scroll Services Section */}
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-32 relative">
              
              {/* Left: Sticky Header */}
              <div className="lg:w-1/3 lg:sticky top-32 lg:top-48 z-20">
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">Transform<br/>Your Smile</h2>
                  <p className="text-xl text-white/80 leading-relaxed">
                    Advanced cosmetic treatments designed to give you the flawless, natural-looking smile you've always wanted.
                  </p>
                </motion.div>
              </div>

              {/* Right: Scrolling Service Blocks */}
              <div className="lg:w-2/3 flex flex-col gap-8 md:gap-12">
                {[
                  { title: "Teeth Whitening", desc: "Professional laser whitening & take-home kits for a brilliantly bright smile.", icon: <Leaf className="w-10 h-10 text-white" /> },
                  { title: "Porcelain Veneers", desc: "Ultra-thin porcelain to correct gaps, chips, and shape for perfect symmetry.", icon: <Smile className="w-10 h-10 text-white" /> },
                  { title: "Smile Makeovers", desc: "Comprehensive digital smile design tailored to your unique facial features.", icon: <Clock className="w-10 h-10 text-white" /> },
                  { title: "Dental Bonding", desc: "Quick, painless correction for chipped or cracked teeth using composite resin.", icon: <Monitor className="w-10 h-10 text-white" /> },
                  { title: "Gum Contouring", desc: "Reshape your gumline with precision lasers for a perfectly balanced smile.", icon: <Zap className="w-10 h-10 text-white" /> },
                  { title: "Invisible Aligners", desc: "Straighten your teeth discreetly without the hassle of traditional metal braces.", icon: <Star className="w-10 h-10 text-white" /> }
                ].map((service, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-500 group"
                  >
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8">
                      <div className="bg-white/10 p-6 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">{service.icon}</div>
                      <div>
                        <h3 className="text-3xl font-display font-bold mb-3">{service.title}</h3>
                        <p className="text-lg text-white/70 leading-relaxed max-w-xl">{service.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>

            {/* Benefits Section */}
            <div className="mb-32">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Why Choose Us</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { title: "Natural Results", icon: <Leaf className="w-10 h-10 text-white" /> },
                  { title: "Painless Process", icon: <Smile className="w-10 h-10 text-white" /> },
                  { title: "Long-lasting", icon: <Clock className="w-10 h-10 text-white" /> },
                  { title: "Digital Planning", icon: <Monitor className="w-10 h-10 text-white" /> },
                  { title: "Quick Recovery", icon: <Zap className="w-10 h-10 text-white" /> },
                  { title: "Confidence Boost", icon: <Star className="w-10 h-10 text-white" /> }
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white/5 backdrop-blur-md p-8 rounded-[2rem] border border-white/10 text-center hover:bg-white/10 transition-all group flex flex-col items-center justify-center"
                  >
                     <div className="mb-6 group-hover:-translate-y-2 transition-transform duration-300">{benefit.icon}</div>
                     <h4 className="text-xl font-bold">{benefit.title}</h4>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="mb-32 max-w-5xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Your Journey to a Perfect Smile</h2>
              
              <div className="relative border-l-2 md:border-l-0 border-white/20 pl-8 md:pl-0">
                {/* Center line for desktop */}
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-white/20 -translate-x-1/2"></div>
                
                {[
                  { title: 'Consultation', desc: 'Discuss your goals and concerns.' }, 
                  { title: 'Smile Analysis', desc: '3D scanning and photography.' }, 
                  { title: 'Digital Preview', desc: 'See your new smile before we start.' }, 
                  { title: 'Treatment', desc: 'Painless, precise execution.' }, 
                  { title: 'Final Smile', desc: 'Walk out with total confidence.' }
                ].map((step, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 50 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.6 }}
                     viewport={{ once: true, margin: "-100px" }}
                     className={`relative flex flex-col md:flex-row justify-between items-center w-full mb-12 md:mb-16 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                   >
                     
                     {/* Content Box */}
                     <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                       <div className="p-8 bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                         <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                         <p className="text-white/70">{step.desc}</p>
                       </div>
                     </div>

                     {/* Center Circle */}
                     <div className="absolute left-[-2.5rem] md:static w-14 h-14 rounded-full border-4 border-white/20 bg-[#b23f10] text-white font-bold flex items-center justify-center shadow-lg z-10 text-2xl">
                       {idx + 1}
                     </div>

                     {/* Empty spacer for the other side on desktop */}
                     <div className="hidden md:block md:w-[45%]"></div>
                     
                   </motion.div>
                ))}
              </div>
            </div>

            {/* Pricing Preview */}
            <div className="mb-32">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Transparent Pricing</h2>
              <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl rounded-[2rem] border border-white/10 overflow-hidden">
                {[
                  { name: "Professional Whitening", price: "₹4,999" },
                  { name: "Porcelain Veneers", price: "₹8,999 / tooth" },
                  { name: "Complete Smile Makeover", price: "Starting ₹25,000" }
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-8 border-b border-white/10 last:border-0">
                    <span className="text-xl font-medium">{item.name}</span>
                    <span className="text-2xl font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Final CTA */}
            <div className="text-center pb-32">
              <h2 className="text-5xl font-display font-bold mb-8">Ready for Your Dream Smile?</h2>
              <button className="bg-white text-[#cc4e17] px-12 py-5 rounded-full text-xl font-bold hover:bg-gray-100 hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                Book a Free Consultation
              </button>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#0f172a] w-full min-h-[20vh] relative z-20">
          <Footer />
        </div>

      </div>
    </div>
  );
};

export default CosmeticDentistry;
