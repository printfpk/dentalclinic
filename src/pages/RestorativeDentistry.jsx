import React, { Suspense, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Resize, Center, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, ArrowRight, Shield, Clock, Heart, 
  Activity, Star, ChevronDown, Award, Users, AlertTriangle, Zap, Check
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// --- 3D Components ---

// Basic Rotating Tooth for general overviews
const RotatingTooth = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.005;
  });
  return (
    <group ref={ref}>
      <Resize scale={2.5}>
        <Center>
          <primitive object={scene.clone()} />
        </Center>
      </Resize>
    </group>
  );
};

// Filling Animation (Simulated with a spot that fills in)
const FillingTooth = ({ active }) => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const cavityRef = useRef();
  
  useFrame(() => {
    if (!cavityRef.current) return;
    // When active, the cavity "fills" (scales down and turns white)
    const targetScale = active ? 0.01 : 1;
    cavityRef.current.scale.setScalar(THREE.MathUtils.lerp(cavityRef.current.scale.x, targetScale, 0.1));
  });

  return (
    <group>
      <Resize scale={2}>
        <Center>
          <primitive object={scene.clone()} />
          <mesh ref={cavityRef} position={[0.2, 0.5, 0.5]}>
             <sphereGeometry args={[0.3, 16, 16]} />
             <meshStandardMaterial color="#333333" roughness={0.9} />
          </mesh>
        </Center>
      </Resize>
    </group>
  );
};

// Crown Animation (A cap dropping onto the tooth)
const CrownTooth = ({ active }) => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const crownRef = useRef();
  
  useFrame(() => {
    if (!crownRef.current) return;
    const targetY = active ? 0.3 : 1.5;
    crownRef.current.position.y = THREE.MathUtils.lerp(crownRef.current.position.y, targetY, 0.1);
  });

  return (
    <group>
      <Resize scale={1.8}>
        <Center>
          <primitive object={scene.clone()} />
          {/* Simulated Crown */}
          <mesh ref={crownRef} position={[0, 1.5, 0]}>
             <cylinderGeometry args={[0.8, 0.9, 0.6, 32]} />
             <meshStandardMaterial color="#ffffff" metalness={0.1} roughness={0.1} />
          </mesh>
        </Center>
      </Resize>
    </group>
  );
};

// Root Canal Animation (Simulated internal glowing root)
const RootCanalTooth = ({ active }) => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const rootRef = useRef();
  
  // Clone scene and materials safely so transparency doesn't affect other components
  const clonedScene = React.useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.transparent = true;
        child.material.opacity = 0.5;
      }
    });
    return clone;
  }, [scene]);

  const targetWhite = React.useMemo(() => new THREE.Color('#ffffff'), []);
  const targetRed = React.useMemo(() => new THREE.Color('#ff0000'), []);
  
  useFrame(() => {
    if (!rootRef.current) return;
    // Turns from infected red to clean white
    const targetColor = active ? targetWhite : targetRed;
    rootRef.current.material.color.lerp(targetColor, 0.05);
  });

  return (
    <group>
      <Resize scale={1.8}>
        <Center>
          <primitive object={clonedScene} />
          {/* Simulated Root Canal */}
          <mesh ref={rootRef} position={[0, -0.5, 0]}>
             <cylinderGeometry args={[0.1, 0.05, 1.5, 16]} />
             <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={active ? 0 : 0.5} />
          </mesh>
        </Center>
      </Resize>
    </group>
  );
};

// --- UI Components ---

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-black/10 rounded-2xl mb-4 overflow-hidden bg-white transition-all hover:shadow-md">
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

// Treatment Selector Panel
const TreatmentPanel = ({ title, description, isHovered, onHover, onClick, bgClass, children }) => {
  return (
    <div 
      className={`relative h-[400px] overflow-hidden rounded-[2rem] transition-all duration-700 ease-in-out cursor-pointer group ${isHovered ? 'w-full md:w-[60%]' : 'w-full md:w-[20%]'} ${bgClass}`}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="absolute inset-0 z-0 transition-transform duration-700 ease-in-out group-hover:scale-110">
         <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 10]} intensity={1} />
            <directionalLight position={[-10, -10, -10]} intensity={0.5} />
            <Suspense fallback={null}>
               <Environment preset="city" />
               {children}
            </Suspense>
         </Canvas>
      </div>
      
      <div className={`absolute bottom-0 left-0 right-0 p-8 z-10 bg-gradient-to-t from-black/80 to-transparent text-white transition-all duration-500 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
         <h3 className="text-3xl font-bold font-display mb-2 whitespace-nowrap">{title}</h3>
         <div className={`overflow-hidden transition-all duration-500 ${isHovered ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
            <p className="text-white/80 mt-2 mb-4">{description}</p>
            <div className="flex items-center gap-2 text-sm font-semibold text-[#ffaa55]">
               View Details <ArrowRight className="w-4 h-4" />
            </div>
         </div>
      </div>
    </div>
  );
};

const RestorativeDentistry = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [hoveredPanel, setHoveredPanel] = useState(0); // 0: Fillings, 1: Crowns, 2: Root Canals
  const [activeSection, setActiveSection] = useState('overview');

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full min-h-screen font-sans selection:bg-[#cc4e17]/30 selection:text-lume-black text-lume-black bg-white">
      
      {/* Navbar with Dark Gradient Header */}
      <div className="w-full bg-denta-orange relative z-50 pb-20" style={{ background: 'linear-gradient(135deg, #cc4e17 0%, #b23f10 100%)' }}>
        <div className="max-w-[1800px] mx-auto px-4 md:px-8">
          <Navbar />
        </div>
        
        {/* Simple Hero Section */}
        <div className="max-w-[1400px] mx-auto px-8 md:px-24 pt-20 pb-10 text-white flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider mb-6">
                Restorative Dentistry
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[4rem] md:text-[5.5rem] font-display font-bold leading-tight mb-6">
                 Restore Your <br/>Natural Smile
              </motion.h1>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-xl text-white/80 max-w-xl leading-relaxed mb-8">
                 Advanced treatments to repair damaged, decayed, or weakened teeth, preserving your natural structure and returning full function.
              </motion.p>
           </div>
           
           <div className="flex-1 h-[400px] w-full relative rounded-3xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <directionalLight position={[10, 10, 10]} intensity={1} />
                 <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                 <Suspense fallback={null}>
                    <Environment preset="city" />
                    <RotatingTooth />
                 </Suspense>
                 <OrbitControls enableZoom={false} autoRotate />
              </Canvas>
           </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 md:px-24 py-24">
        
        {/* Treatment Selection Experience */}
        <div className="mb-32">
           <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Choose Your Treatment</h2>
              <p className="text-lg text-lume-black/60 max-w-2xl mx-auto">Hover to preview. Click to explore details.</p>
           </div>
           
           <div className="flex flex-col md:flex-row gap-4 w-full h-[1200px] md:h-[400px]">
              <TreatmentPanel 
                title="Tooth Fillings" 
                description="Stop early decay and restore small damage seamlessly." 
                bgClass="bg-[#cc4e17]"
                isHovered={hoveredPanel === 0} 
                onHover={() => setHoveredPanel(0)}
                onClick={() => scrollToSection('fillings')}
              >
                 <FillingTooth active={hoveredPanel === 0} />
              </TreatmentPanel>
              
              <TreatmentPanel 
                title="Dental Crowns" 
                description="Full coverage protection for severely weakened or broken teeth." 
                bgClass="bg-[#cc4e17]"
                isHovered={hoveredPanel === 1} 
                onHover={() => setHoveredPanel(1)}
                onClick={() => scrollToSection('crowns')}
              >
                 <CrownTooth active={hoveredPanel === 1} />
              </TreatmentPanel>

              <TreatmentPanel 
                title="Root Canals" 
                description="Save infected teeth from extraction and eliminate severe pain." 
                bgClass="bg-[#cc4e17]"
                isHovered={hoveredPanel === 2} 
                onHover={() => setHoveredPanel(2)}
                onClick={() => scrollToSection('root-canals')}
              >
                 <RootCanalTooth active={hoveredPanel === 2} />
              </TreatmentPanel>
           </div>
        </div>

        {/* Detailed Sections */}
        
        {/* Fillings */}
        <div id="fillings" className="mb-32 flex flex-col md:flex-row items-center gap-16 pt-16">
           <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Restore Small Damage Before It Grows</h2>
              <p className="text-lg text-lume-black/70 mb-8 leading-relaxed">
                 Dental fillings are the first line of defense against cavities and minor trauma. We use advanced composite resin that bonds perfectly with your tooth, providing a completely invisible and durable repair.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-[#cc4e17] w-5 h-5"/> When Needed</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Cavities</li>
                       <li>• Minor chips & cracks</li>
                       <li>• Early tooth decay</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle className="text-green-600 w-5 h-5"/> Benefits</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Preserves natural tooth</li>
                       <li>• Quick, single-visit treatment</li>
                       <li>• Matches tooth color exactly</li>
                    </ul>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 w-full h-[400px] bg-[#cc4e17] rounded-[3rem] overflow-hidden shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2)]">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <directionalLight position={[10, 10, 10]} intensity={1} />
                 <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                 <Suspense fallback={null}><Environment preset="city" /><FillingTooth active={true} /></Suspense>
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
           </div>
        </div>

        {/* Crowns */}
        <div id="crowns" className="mb-32 flex flex-col md:flex-row-reverse items-center gap-16 pt-16">
           <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Absolute Protection For Weakened Teeth</h2>
              <p className="text-lg text-lume-black/70 mb-8 leading-relaxed">
                 When a tooth is too damaged for a filling, a custom porcelain crown acts as a protective "cap", completely encasing the tooth to restore its original shape, size, strength, and flawless appearance.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-[#cc4e17] w-5 h-5"/> Ideal For</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Severely broken teeth</li>
                       <li>• Failing large fillings</li>
                       <li>• Post root-canal protection</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle className="text-green-600 w-5 h-5"/> Benefits</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Full 360-degree coverage</li>
                       <li>• Prevents further fracturing</li>
                       <li>• Lasts 10-15+ years</li>
                    </ul>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 w-full h-[400px] bg-[#cc4e17] rounded-[3rem] overflow-hidden shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2)]">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <directionalLight position={[10, 10, 10]} intensity={1} />
                 <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                 <Suspense fallback={null}><Environment preset="city" /><CrownTooth active={true} /></Suspense>
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
           </div>
        </div>

        {/* Root Canal */}
        <div id="root-canals" className="mb-32 flex flex-col md:flex-row items-center gap-16 pt-16">
           <div className="flex-1">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Save The Tooth, Eliminate The Pain</h2>
              <p className="text-lg text-lume-black/70 mb-8 leading-relaxed">
                 Despite their reputation, modern root canals are virtually painless and are the only way to save an infected tooth from extraction. We remove the infected pulp, sanitize the interior, and seal it to prevent future issues.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><AlertTriangle className="text-[#cc4e17] w-5 h-5"/> Signs You Need It</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Severe, throbbing toothache</li>
                       <li>• Extreme hot/cold sensitivity</li>
                       <li>• Swelling in the gums</li>
                    </ul>
                 </div>
                 <div>
                    <h4 className="font-bold text-lg mb-4 flex items-center gap-2"><CheckCircle className="text-green-600 w-5 h-5"/> Benefits</h4>
                    <ul className="space-y-3 text-lume-black/70 font-medium">
                       <li>• Instantly removes infection</li>
                       <li>• Saves your natural tooth root</li>
                       <li>• Eliminates severe pain</li>
                    </ul>
                 </div>
              </div>
           </div>
           
           <div className="flex-1 w-full h-[400px] bg-[#cc4e17] rounded-[3rem] overflow-hidden relative shadow-[inset_0_-10px_30px_rgba(0,0,0,0.2)]">
              <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                 <ambientLight intensity={0.5} />
                 <directionalLight position={[10, 10, 10]} intensity={1} />
                 <directionalLight position={[-10, -10, -10]} intensity={0.5} />
                 <Suspense fallback={null}><Environment preset="city" /><RootCanalTooth active={true} /></Suspense>
                 <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
              </Canvas>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full text-sm font-semibold shadow-sm">
                 Showing Cleaned & Sealed Root
              </div>
           </div>
        </div>

        {/* Treatment Comparison Section */}
        <div className="mb-32">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Which Treatment Do You Need?</h2>
           <div className="overflow-x-auto">
             <table className="w-full min-w-[800px] text-left border-collapse">
               <thead>
                 <tr>
                   <th className="p-6 border-b-2 border-black/10 text-xl text-lume-black font-bold">Dental Problem</th>
                   <th className="p-6 border-b-2 border-black/10 text-xl text-center bg-[#f5f5f7] rounded-tl-2xl">Tooth Filling</th>
                   <th className="p-6 border-b-2 border-black/10 text-xl text-center bg-[#f5f5f7]">Dental Crown</th>
                   <th className="p-6 border-b-2 border-black/10 text-xl text-center bg-[#f5f5f7] rounded-tr-2xl">Root Canal</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="hover:bg-[#f5f5f7]/50 transition-colors">
                   <td className="p-6 border-b border-black/5 font-semibold text-lg">Small cavity or minor decay</td>
                   <td className="p-6 border-b border-black/5 text-center"><Check className="w-6 h-6 text-[#cc4e17] mx-auto" /></td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                 </tr>
                 <tr className="hover:bg-[#f5f5f7]/50 transition-colors">
                   <td className="p-6 border-b border-black/5 font-semibold text-lg">Cracked or severely broken tooth</td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                   <td className="p-6 border-b border-black/5 text-center"><Check className="w-6 h-6 text-[#cc4e17] mx-auto" /></td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                 </tr>
                 <tr className="hover:bg-[#f5f5f7]/50 transition-colors">
                   <td className="p-6 border-b border-black/5 font-semibold text-lg">Deep infection reaching the nerve</td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                   <td className="p-6 border-b border-black/5 text-center"><Check className="w-6 h-6 text-lume-black/20 mx-auto" title="Often required after root canal" /></td>
                   <td className="p-6 border-b border-black/5 text-center"><Check className="w-6 h-6 text-[#cc4e17] mx-auto" /></td>
                 </tr>
                 <tr className="hover:bg-[#f5f5f7]/50 transition-colors">
                   <td className="p-6 border-b border-black/5 font-semibold text-lg">Large failing silver filling</td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                   <td className="p-6 border-b border-black/5 text-center"><Check className="w-6 h-6 text-[#cc4e17] mx-auto" /></td>
                   <td className="p-6 border-b border-black/5 text-center text-gray-300">-</td>
                 </tr>
               </tbody>
             </table>
           </div>
        </div>

        {/* Treatment Journey (Horizontal Timeline) */}
        <div className="mb-32 bg-[#161616] rounded-[3rem] p-12 md:p-24 text-white">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-16 text-center">The Restorative Journey</h2>
           
           <div className="flex flex-col md:flex-row justify-between relative max-w-5xl mx-auto">
              {/* Horizontal Line */}
              <div className="hidden md:block absolute top-6 left-0 right-0 h-1 bg-white/20"></div>
              
              {[
                { step: "1", title: "Consultation", desc: "Detailed exam & digital X-rays" },
                { step: "2", title: "Diagnosis", desc: "Pinpointing the exact damage" },
                { step: "3", title: "Treatment", desc: "Painless, precise procedure" },
                { step: "4", title: "Recovery", desc: "Rapid healing with aftercare" },
                { step: "5", title: "Healthy Smile", desc: "Full strength & function restored" }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center max-w-[150px] mx-auto mb-12 md:mb-0">
                   <div className="w-12 h-12 rounded-full bg-[#cc4e17] flex items-center justify-center font-bold text-xl mb-6 shadow-[0_0_20px_rgba(204,78,23,0.5)]">
                     {item.step}
                   </div>
                   <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                   <p className="text-sm text-white/60">{item.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* Technology Section */}
        <div className="mb-32">
           <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Precision Through Modern Dentistry</h2>
              <p className="text-lg text-lume-black/60 max-w-2xl mx-auto">We utilize the latest dental technology to ensure your restorative treatments are faster, safer, and completely pain-free.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Digital X-Rays", icon: <Zap className="w-8 h-8 text-[#cc4e17]"/>, desc: "Ultra-low radiation imaging for instant, crystal clear diagnostics." },
                { title: "Intraoral Scanners", icon: <Activity className="w-8 h-8 text-[#cc4e17]"/>, desc: "No more messy impressions. We take comfortable 3D digital impressions." },
                { title: "CAD/CAM Tech", icon: <Award className="w-8 h-8 text-[#cc4e17]"/>, desc: "Computer-aided design for perfectly fitted, custom-milled crowns." },
                { title: "Advanced Imaging", icon: <Shield className="w-8 h-8 text-[#cc4e17]"/>, desc: "3D CBCT scans for precise root canal mapping and treatment planning." }
              ].map((tech, idx) => (
                <div key={idx} className="bg-[#f5f5f7] p-8 rounded-[2rem] hover:-translate-y-2 transition-transform duration-300">
                   <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-sm">{tech.icon}</div>
                   <h3 className="font-bold text-xl mb-3">{tech.title}</h3>
                   <p className="text-lume-black/70 leading-relaxed">{tech.desc}</p>
                </div>
              ))}
           </div>
        </div>

        {/* FAQs */}
        <div className="mb-32">
           <h2 className="text-4xl md:text-5xl font-display font-bold mb-12 text-center">Frequently Asked Questions</h2>
           <div className="max-w-3xl mx-auto">
             <AccordionItem question="Does getting a filling hurt?" answer="Not at all! We use local anesthesia to completely numb the area before beginning. You won't feel any pain during the procedure, only slight pressure." />
             <AccordionItem question="How long do dental crowns last?" answer="With excellent oral hygiene and regular checkups, a high-quality porcelain crown can last anywhere from 10 to 15 years, and often much longer." />
             <AccordionItem question="Is root canal treatment painful?" answer="This is a common myth! Thanks to modern anesthetics and technology, a root canal is very similar to getting a routine filling and relieves the severe pain caused by the infection." />
             <AccordionItem question="How many visits are required for a crown?" answer="Typically, a crown requires two visits. The first visit is for preparation and taking digital scans, and the second visit (usually 1-2 weeks later) is for the final permanent placement." />
           </div>
        </div>

        {/* Final CTA */}
        <div className="relative rounded-[3rem] overflow-hidden py-24 px-8 text-center border border-black/5 bg-white shadow-2xl">
           {/* Subtle background decoration */}
           <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#cc4e17]/5 rounded-full blur-3xl"></div>
           <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-lume-cyan/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Restore Your Tooth Before The Problem Gets Worse</h2>
              <p className="text-xl text-lume-black/60 mb-10">
                Delaying treatment can lead to more complex and expensive procedures. Let our experts preserve your natural smile today.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-[#161616] text-white px-10 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.15)]">
                  Book Consultation
                </button>
                <button className="bg-white border-2 border-black/10 text-lume-black px-10 py-4 rounded-full font-bold text-lg hover:border-[#cc4e17] hover:text-[#cc4e17] transition-colors">
                  Call Clinic
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
  );
};

export default RestorativeDentistry;
