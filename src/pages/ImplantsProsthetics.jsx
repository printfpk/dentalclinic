import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Resize, Center, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, Shield, Clock, Heart, 
  Activity, Star, ChevronDown, Award, Users
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// The 3D Object reacting to Scroll
const ImplantScrollingScene = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  
  const assemblyRef = useRef();
  const postRef = useRef();
  const abutmentRef = useRef();
  const crownRef = useRef();
  
  // Text Refs
  const text1Ref = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();

  useFrame(() => {
    if (!assemblyRef.current || !postRef.current || !abutmentRef.current || !crownRef.current) return;
    
    // Calculate how many viewport heights the user has scrolled
    const viewportsScrolled = window.scrollY / window.innerHeight;

    // --- TEETH ANIMATION (Only active in first 400vh) ---
    const progress = Math.min(viewportsScrolled / 4, 1); 

    // Global rotation for the whole assembly
    assemblyRef.current.rotation.y += 0.005;
    
    // Stage 1: Post insertion (progress 0.1 to 0.4)
    const postTargetY = progress > 0.1 ? 0.8 : -2;
    postRef.current.position.y = THREE.MathUtils.lerp(postRef.current.position.y, postTargetY, 0.05);
    
    // Stage 2: Abutment attachment (progress 0.4 to 0.7)
    const abutmentTargetY = progress > 0.4 ? 1.6 : -1;
    abutmentRef.current.position.y = THREE.MathUtils.lerp(abutmentRef.current.position.y, abutmentTargetY, 0.05);
    
    // Stage 3: Crown placement (progress 0.7 to 1.0)
    const crownTargetY = progress > 0.7 ? 2.5 : 8;
    crownRef.current.position.y = THREE.MathUtils.lerp(crownRef.current.position.y, crownTargetY, 0.05);

    // Fade out everything after 400vh
    const fadeOutOpacity = viewportsScrolled > 4 ? 1 - Math.min((viewportsScrolled - 4) * 2, 1) : 1;
    
    // Apply fade out to primitives
    postRef.current.material.opacity = fadeOutOpacity;
    postRef.current.material.transparent = true;
    abutmentRef.current.material.opacity = fadeOutOpacity;
    abutmentRef.current.material.transparent = true;

    // Apply fade out to the loaded GLTF scene
    scene.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material.transparent = true;
        child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, fadeOutOpacity, 0.1);
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
      const isActive = progress > 0.1 && progress < 0.4;
      animateGroupOpacity(text1Ref, isActive ? 1 : 0);
      text1Ref.current.position.z = THREE.MathUtils.lerp(text1Ref.current.position.z, isActive ? 0 : -5, 0.1);
    }

    if (text2Ref.current) {
      const isActive = progress > 0.4 && progress < 0.7;
      animateGroupOpacity(text2Ref, isActive ? 1 : 0);
      text2Ref.current.position.z = THREE.MathUtils.lerp(text2Ref.current.position.z, isActive ? 0 : -5, 0.1);
    }

    if (text3Ref.current) {
      const isActive = progress > 0.7 && progress <= 1.0;
      animateGroupOpacity(text3Ref, isActive ? 1 : 0);
      text3Ref.current.position.z = THREE.MathUtils.lerp(text3Ref.current.position.z, isActive ? 0 : -5, 0.1);
    }
  });

  return (
    <group>
      <group ref={assemblyRef} position={[0, -1, 0]} scale={[0.8, 0.8, 0.8]}>
        
        {/* Titanium Post */}
        <mesh ref={postRef} position={[0, -2, 0]}>
          <cylinderGeometry args={[0.25, 0.15, 1.2, 32]} />
          <meshStandardMaterial color="#9ca3af" metalness={0.9} roughness={0.2} />
          {/* Threading details via simple rings */}
          {[...Array(6)].map((_, i) => (
             <mesh key={i} position={[0, -0.4 + (i * 0.15), 0]}>
               <torusGeometry args={[0.22 - (i*0.01), 0.04, 16, 32]} />
               <meshStandardMaterial color="#6b7280" metalness={0.9} roughness={0.3} />
             </mesh>
          ))}
        </mesh>
        
        {/* Abutment */}
        <mesh ref={abutmentRef} position={[0, -1, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.6, 32]} />
          <meshStandardMaterial color="#e5e7eb" metalness={0.7} roughness={0.4} />
        </mesh>
        
        {/* Crown (Loaded GLTF) */}
        <group ref={crownRef} position={[0, 8, 0]}>
          <Resize scale={2.5}>
            <Center>
               <primitive object={scene} />
            </Center>
          </Resize>
        </group>
      </group>

      {/* 3D Texts */}
      <group ref={text1Ref} position={[-3, 0, -5]}>
        <Text fontSize={0.5} fontWeight="bold" color="#ffffff" anchorX="center" anchorY="bottom" material-transparent={true}>
          1. Titanium Post
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="top" maxWidth={3} textAlign="center" material-transparent={true}>
          A biocompatible foundation acts as an artificial tooth root, fusing securely with your jawbone.
        </Text>
      </group>

      <group ref={text2Ref} position={[3, 0, -5]}>
        <Text fontSize={0.5} fontWeight="bold" color="#ffffff" anchorX="center" anchorY="bottom" material-transparent={true}>
          2. The Abutment
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="top" maxWidth={3} textAlign="center" material-transparent={true}>
          A precision-crafted connector is attached to the post to firmly hold your new custom crown.
        </Text>
      </group>

      <group ref={text3Ref} position={[-3, 0, -5]}>
        <Text fontSize={0.5} fontWeight="bold" color="#ffffff" anchorX="center" anchorY="bottom" material-transparent={true}>
          3. Custom Crown
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.15} color="#ffffff" anchorX="center" anchorY="top" maxWidth={3} textAlign="center" material-transparent={true}>
          Your permanent, natural-looking tooth is secured, restoring total function and a flawless smile.
        </Text>
      </group>
    </group>
  );
};

// Accordion Component for FAQ
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black/10 rounded-2xl mb-4 overflow-hidden bg-white/50 backdrop-blur-sm transition-all hover:bg-white/80">
      <button 
        className="w-full px-6 py-5 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-semibold text-lg text-lume-black">{question}</span>
        <ChevronDown className={`w-5 h-5 text-[#cc4e17] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-6 pb-5 text-lume-black/70 leading-relaxed"
          >
            {answer}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ImplantsProsthetics = () => {
  // Always scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <ambientLight intensity={0.8} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, 5, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="studio" />
            <ImplantScrollingScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Standard HTML Overlay (Naturally scrolls the window) */}
      <div className="relative w-full z-10 pt-24">
        
        {/* 400vh spacer for the WebGL hero to play out before HTML content appears */}
        <div style={{ height: '400vh', width: '100%' }} className="pointer-events-none">
          {/* Static Hero Text visible at the top */}
          <div className="absolute top-[20vh] w-full text-center px-4">
             <motion.h1 
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8 }}
               className="text-[4rem] md:text-[5.5rem] font-display font-bold leading-tight mb-6 text-white"
             >
               Restore Your Smile
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.3 }}
               className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium"
             >
               Advanced Dental Implants & Prosthetics designed for total comfort, extreme durability, and absolute confidence.
             </motion.p>
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.8, delay: 0.6 }}
               className="mt-8 flex justify-center gap-4"
             >
                <button className="bg-white text-lume-black px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-white/90 transition-colors pointer-events-auto">
                  Book Consultation
                </button>
             </motion.div>
          </div>
        </div>

        {/* --- START OF HTML CONTENT --- */}
        <div className="w-full bg-white rounded-t-[3rem] py-32 px-8 md:px-24 shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-black/5 relative z-20 text-lume-black">
          <div className="max-w-[1400px] mx-auto">

            {/* Why Choose Implants (Benefits Grid) */}
            <div className="mb-32">
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Why Choose Dental Implants?</h2>
                 <p className="text-lg text-lume-black/60 max-w-2xl mx-auto">
                   Implants are the gold standard for tooth replacement, offering unparalleled structural integrity and a completely natural aesthetic.
                 </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Permanent Solution", desc: "Designed to last a lifetime with proper care, acting exactly like a natural tooth root.", icon: <Shield className="w-8 h-8 text-[#cc4e17]" /> },
                  { title: "Natural Appearance", desc: "Custom-shaded porcelain crowns that blend flawlessly with your surrounding teeth.", icon: <Star className="w-8 h-8 text-[#cc4e17]" /> },
                  { title: "Preserves Bone", desc: "Titanium posts stimulate the jawbone, preventing the rapid bone loss associated with missing teeth.", icon: <Activity className="w-8 h-8 text-[#cc4e17]" /> },
                  { title: "Full Chewing Power", desc: "Restore 100% of your bite force, allowing you to eat your favorite foods without restriction.", icon: <Award className="w-8 h-8 text-[#cc4e17]" /> },
                  { title: "No Damage to Neighbors", desc: "Unlike traditional bridges, implants do not require grinding down healthy adjacent teeth.", icon: <Heart className="w-8 h-8 text-[#cc4e17]" /> },
                  { title: "High Success Rate", desc: "Clinical studies show a 98% long-term success rate for modern dental implant procedures.", icon: <CheckCircle className="w-8 h-8 text-[#cc4e17]" /> }
                ].map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="p-8 rounded-[2rem] bg-[#f5f5f7] hover:bg-white border border-transparent hover:border-[#cc4e17]/20 transition-all duration-300 hover:shadow-xl group"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-lume-black/70 leading-relaxed">{benefit.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Implant Solutions (Types) */}
            <div className="mb-32">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">Comprehensive Replacement Solutions</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="bg-[#161616] text-white rounded-[2rem] p-10 flex flex-col justify-between group overflow-hidden relative">
                  <div className="relative z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-6">
                      Single & Multiple
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">Dental Implants</h3>
                    <p className="text-white/70 mb-8 max-w-md">
                      Whether you are missing one tooth or several, individual titanium implants provide the most robust and natural-looking replacement available today.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {["Single Tooth Replacement", "Multiple Tooth Implants", "Implant-Supported Bridges"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 text-white/90">
                          <CheckCircle className="w-5 h-5 text-[#cc4e17]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-fit flex items-center gap-2 text-white font-semibold group-hover:text-[#cc4e17] transition-colors relative z-10">
                    Explore Details <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  {/* Decorative background shape */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#cc4e17]/20 rounded-full blur-3xl group-hover:bg-[#cc4e17]/40 transition-colors duration-500"></div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#f5f5f7] rounded-[2rem] p-10 flex flex-col justify-between group">
                  <div>
                    <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-xs font-semibold uppercase tracking-wider mb-6">
                      Full Arch Restoration
                    </div>
                    <h3 className="text-3xl font-display font-bold mb-4">All-on-4® System</h3>
                    <p className="text-lume-black/70 mb-8 max-w-md">
                      Revolutionary full-mouth restoration. Replace an entire upper or lower arch of teeth using just four strategically placed titanium implants.
                    </p>
                    <ul className="space-y-4 mb-8">
                      {["Same-Day Smile (Teeth in a Day)", "Prevents Facial Sinking", "Permanent & Non-Removable"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 font-medium text-lume-black/80">
                          <CheckCircle className="w-5 h-5 text-[#cc4e17]" /> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button className="w-fit flex items-center gap-2 font-semibold text-lume-black group-hover:text-[#cc4e17] transition-colors">
                    Learn About All-on-4 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Treatment Process Timeline */}
            <div className="mb-32">
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">Your Treatment Journey</h2>
               
               <div className="max-w-4xl mx-auto relative">
                 {/* Central Line */}
                 <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 md:-translate-x-1/2 rounded-full"></div>
                 
                 {[
                   { title: "Initial Consultation", desc: "Comprehensive exam, 3D CBCT scans, and personalized treatment planning.", icon: <Users className="w-6 h-6" /> },
                   { title: "Implant Placement", desc: "Precision surgical placement of the titanium post using computer-guided technology.", icon: <Activity className="w-6 h-6" /> },
                   { title: "Osseointegration", desc: "A healing period of 3-6 months where the bone naturally fuses around the implant.", icon: <Clock className="w-6 h-6" /> },
                   { title: "Abutment & Impressions", desc: "Attaching the connector piece and taking digital scans for your custom crown.", icon: <Shield className="w-6 h-6" /> },
                   { title: "Final Restoration", desc: "Your permanent, custom-shaded porcelain crown is securely attached.", icon: <Star className="w-6 h-6" /> }
                 ].map((step, idx) => (
                   <motion.div 
                     key={idx}
                     initial={{ opacity: 0, y: 40 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6 }}
                     className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-12 pl-24 md:pl-0 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                   >
                     {/* Box */}
                     <div className={`w-full md:w-[45%] ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                        <div className="bg-white p-8 rounded-[2rem] border border-black/10 shadow-sm hover:shadow-xl transition-shadow duration-300">
                          <h4 className="text-2xl font-bold mb-2 text-lume-black">{step.title}</h4>
                          <p className="text-lume-black/60">{step.desc}</p>
                        </div>
                     </div>
                     
                     {/* Circle Node */}
                     <div className="absolute left-0 md:left-1/2 top-6 md:top-auto md:-translate-x-1/2 w-16 h-16 rounded-full bg-[#cc4e17] border-4 border-white flex items-center justify-center text-white shadow-lg z-10">
                       {step.icon}
                     </div>

                     {/* Spacer */}
                     <div className="hidden md:block md:w-[45%]"></div>
                   </motion.div>
                 ))}
               </div>
            </div>

            {/* Success Statistics */}
            <div className="mb-32 bg-[#161616] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden">
               {/* Decorative Gradient Background */}
               <div className="absolute inset-0 bg-gradient-to-br from-[#cc4e17]/20 to-transparent"></div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                 {[
                   { number: "5000+", label: "Implants Placed" },
                   { number: "98%", label: "Success Rate" },
                   { number: "15+", label: "Years Experience" }
                 ].map((stat, idx) => (
                   <div key={idx} className="text-center">
                      <h3 className="text-5xl md:text-7xl font-display font-bold text-[#cc4e17] mb-4">{stat.number}</h3>
                      <p className="text-xl text-white/80 font-medium">{stat.label}</p>
                   </div>
                 ))}
               </div>
            </div>

            {/* Testimonials */}
            <div className="mb-32 text-center">
              <h2 className="text-3xl font-bold mb-12">Patient Stories</h2>
              <div className="max-w-3xl mx-auto bg-[#f5f5f7] p-10 md:p-16 rounded-[3rem] relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex gap-1 bg-white px-6 py-3 rounded-full shadow-md">
                   {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />)}
                </div>
                <p className="text-2xl md:text-3xl font-display font-medium leading-relaxed mb-8">
                  "I suffered for years with uncomfortable dentures. Getting the All-on-4 implants completely changed my life. I can finally eat apples and steaks again without fear. The team here is phenomenal."
                </p>
                <div className="font-bold text-lg uppercase tracking-wider text-lume-black/60">— Michael R.</div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="mb-32">
               <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
               <div className="max-w-3xl mx-auto">
                 <AccordionItem 
                   question="Are dental implants painful?" 
                   answer="The procedure is performed under local anesthesia, so you will not feel pain during the surgery. Post-operative discomfort is typically minimal and easily managed with over-the-counter pain relievers. Most patients return to work the next day."
                 />
                 <AccordionItem 
                   question="How long do implants last?" 
                   answer="With proper oral hygiene and regular dental checkups, the titanium implant post can last a lifetime. The porcelain crown attached to it may need replacement after 10-15 years due to normal wear and tear."
                 />
                 <AccordionItem 
                   question="Am I a good candidate for implants?" 
                   answer="Ideal candidates have healthy gums and sufficient jawbone density to support the implant. However, even if you have bone loss, procedures like bone grafting can rebuild the area to make implants possible."
                 />
                 <AccordionItem 
                   question="What is the difference between an implant and a bridge?" 
                   answer="A bridge requires shaving down healthy adjacent teeth to support the false tooth. An implant stands alone as an artificial root, preserving your natural teeth and preventing jawbone deterioration."
                 />
               </div>
            </div>

            {/* Final CTA */}
            <div className="text-center bg-gradient-to-b from-[#f5f5f7] to-white rounded-[3rem] py-20 px-8 border border-black/5">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to Restore Your Smile?</h2>
              <p className="text-xl text-lume-black/60 mb-10 max-w-2xl mx-auto">
                Schedule a consultation today for a 3D scan and a personalized implant treatment plan.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-[#cc4e17] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(204,78,23,0.3)]">
                  Schedule Consultation
                </button>
                <button className="bg-white border-2 border-[#cc4e17] text-[#cc4e17] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#cc4e17]/5 transition-colors">
                  Call Now
                </button>
              </div>
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

export default ImplantsProsthetics;
