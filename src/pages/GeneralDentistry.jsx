import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, ScrollControls, Scroll, useScroll, Resize, Center, Text } from '@react-three/drei';
import Navbar from '../components/Navbar';

// The 3D Object reacting to Scroll
const ScrollingScene = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const groupRef = useRef();
  const wrapperRef = useRef(); // Wrapper for translation & scale
  
  // Refs for 3D Text elements
  const text1Ref = useRef();
  const text2Ref = useRef();
  const text3Ref = useRef();
  const text4Ref = useRef();
  
  const scroll = useScroll(); // Use the scroll hook provided by ScrollControls

  useFrame((state, delta) => {
    if (!groupRef.current || !wrapperRef.current) return;
    
    // scroll.offset goes from 0 to 1 as the user scrolls down the page
    const offset = scroll.offset;

    // --- TEETH ANIMATION ---
    const targetRotY = offset * Math.PI * 4; // 2 full spins
    const targetRotX = offset * Math.PI * 0.5; // Tilt downwards slightly
    
    // Scale up slightly as you scroll
    const targetScale = 1 + offset * 0.5;

    // Move left on page 2, right on page 3, center on page 4
    let targetPosX = 0;
    if (offset > 0.15 && offset < 0.5) targetPosX = 3; // Move right when text is on left
    else if (offset >= 0.5 && offset < 0.85) targetPosX = -3; // Move left when text is on right

    // Lerp teeth rotation on inner group
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.05);
    
    // Lerp translation & scale on outer wrapper so <Center> doesn't override it
    wrapperRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.05);
    wrapperRef.current.position.x = THREE.MathUtils.lerp(wrapperRef.current.position.x, targetPosX, 0.05);


    // --- 3D TEXT ANIMATIONS ---
    const animateGroupOpacity = (ref, targetOpacity) => {
      if (!ref.current) return;
      ref.current.children.forEach(child => {
        if (child.material) {
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, targetOpacity, 0.1);
        }
      });
    };

    // Text 1: General Dentistry (Intro)
    if (text1Ref.current) {
      const opacity = offset < 0.15 ? 1 : 0;
      animateGroupOpacity(text1Ref, opacity);
      const targetZ = offset < 0.15 ? 1.5 : 5; 
      text1Ref.current.position.z = THREE.MathUtils.lerp(text1Ref.current.position.z, targetZ, 0.1);
    }

    // Text 2: Professional Cleanings (Page 2)
    if (text2Ref.current) {
      const isActive = offset > 0.15 && offset < 0.5;
      animateGroupOpacity(text2Ref, isActive ? 1 : 0);
      const targetZ = isActive ? 0 : -5; 
      text2Ref.current.position.z = THREE.MathUtils.lerp(text2Ref.current.position.z, targetZ, 0.1);
    }

    // Text 3: Restorative Fillings (Page 3)
    if (text3Ref.current) {
      const isActive = offset > 0.5 && offset < 0.85;
      animateGroupOpacity(text3Ref, isActive ? 1 : 0);
      const targetZ = isActive ? 0 : -5;
      text3Ref.current.position.z = THREE.MathUtils.lerp(text3Ref.current.position.z, targetZ, 0.1);
    }

    // Text 4: CTA Header (Page 4)
    if (text4Ref.current) {
      const isActive = offset > 0.85;
      animateGroupOpacity(text4Ref, isActive ? 1 : 0);
      const targetZ = isActive ? 1 : -5;
      text4Ref.current.position.z = THREE.MathUtils.lerp(text4Ref.current.position.z, targetZ, 0.1);
    }
  });

  return (
    <group>
      {/* Teeth Model wrapped to allow translation */}
      <group ref={wrapperRef}>
        <Resize scale={3}>
          <Center>
            <group ref={groupRef} position={[0, -0.5, 0]}>
              <primitive object={scene} />
            </group>
          </Center>
        </Resize>
      </group>

      {/* --- NATIVE 3D TEXT ELEMENTS --- */}
      
      {/* Intro Text */}
      <group ref={text1Ref} position={[0, 0, 1.5]}>
        <Text position={[-0.7, 0, 0]} fontSize={0.65} fontWeight="bold" color="white" anchorX="right" anchorY="bottom" material-transparent={true}>
          General
        </Text>
        <Text position={[0.7, 0, 0]} fontSize={0.65} fontWeight="bold" color="white" anchorX="left" anchorY="bottom" material-transparent={true}>
          Dentistry
        </Text>
        <Text position={[0, -1.2, 0]} fontSize={0.16} color="white" anchorX="center" anchorY="top" maxWidth={4} textAlign="center" material-transparent={true}>
          The foundation of a perfect smile starts here. Scroll down to explore our core services.
        </Text>
      </group>

      {/* Page 2 Text (Left Side) */}
      <group ref={text2Ref} position={[-2.5, 0, -5]}>
        <Text fontSize={0.65} fontWeight="bold" color="white" anchorX="center" anchorY="bottom" material-transparent={true} textAlign="center" lineHeight={1.1}>
          {"Professional\nCleanings"}
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="top" maxWidth={3.5} textAlign="center" material-transparent={true}>
          Using state-of-the-art ultrasonic tools, we remove plaque and tartar buildup that daily brushing misses, leaving your teeth brilliantly clean.
        </Text>
      </group>

      {/* Page 3 Text (Right Side) */}
      <group ref={text3Ref} position={[2.5, 0, -5]}>
        <Text fontSize={0.65} fontWeight="bold" color="white" anchorX="center" anchorY="bottom" material-transparent={true} textAlign="center" lineHeight={1.1}>
          {"Restorative\nFillings"}
        </Text>
        <Text position={[0, -0.3, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="top" maxWidth={3.5} textAlign="center" material-transparent={true}>
          We use premium, tooth-colored composite resins to repair decay invisibly. The result is a seamless restoration that blends perfectly.
        </Text>
      </group>

      {/* Final CTA Header */}
      <group ref={text4Ref} position={[0, 1, -5]}>
        <Text fontSize={0.7} fontWeight="bold" color="white" anchorX="center" anchorY="bottom" material-transparent={true}>
          Ready for a checkup?
        </Text>
      </group>

    </group>
  );
};

const GeneralDentistry = () => {
  return (
    <div className="w-full min-h-screen font-sans selection:bg-white/30 selection:text-white text-white overflow-hidden bg-denta-orange" 
         style={{ background: 'linear-gradient(135deg, #cc4e17 0%, #b23f10 100%)' }}>
      
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 max-w-[1800px] left-1/2 -translate-x-1/2">
        <Navbar />
      </div>

      <div className="w-full h-screen relative">
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <directionalLight position={[-10, 10, -10]} intensity={0.5} />
          
          <Suspense fallback={null}>
            <Environment preset="city" />
            
            {/* ScrollControls sets up the scrollable height. pages={4} makes the page 4x window height */}
            <ScrollControls pages={4} damping={0.2}>
              
              {/* The fully native 3D Scene */}
              <ScrollingScene />

              {/* Hybrid HTML overlay just for the highly-interactive final button */}
              <Scroll html style={{ width: '100%', height: '100%' }}>
                <div className="w-screen h-[400vh] relative pointer-events-none">
                  {/* Placed at the very bottom of the 400vh scrolling container */}
                  <div className="absolute bottom-[20vh] left-0 w-full flex justify-center pointer-events-auto">
                    <button className="px-12 py-4 bg-white text-[#cc4e17] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-[0_20px_40px_rgba(0,0,0,0.2)]">
                      Book an Appointment
                    </button>
                  </div>
                </div>
              </Scroll>

            </ScrollControls>
          </Suspense>
        </Canvas>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[500px] bg-[#ffaa55] blur-[150px] rounded-full z-0 opacity-30 pointer-events-none"></div>
      </div>
    </div>
  );
};

export default GeneralDentistry;
