import React, { Suspense, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, OrbitControls, Resize, Center } from '@react-three/drei';

const TeethModel = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const groupRef = useRef();

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Target rotation based on normalized mouse position (-1 to 1)
    const targetX = (state.pointer.y * Math.PI) / 6; 
    const targetY = (state.pointer.x * Math.PI) / 6;
    
    // Smooth interpolation (lerp) for buttery tracking
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
};

const Hero = () => {
  const heroRef = useRef();

  return (
    <section ref={heroRef} className="relative w-full h-[calc(100vh-100px)] min-h-[750px] flex flex-col justify-between pt-8 pb-8">

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 items-center flex-1 h-full">

        {/* Left Section - Typography */}
        <div className="flex flex-col justify-center h-full max-w-[500px]">
          <p className="text-white/60 text-[1.1rem] leading-snug font-medium mb-12 max-w-[320px]">
            From preventive care<br />
            to complex restorations,<br />
            a comprehensive approach<br />
            to your dental health.
          </p>
          <h1 className="text-[6.5rem] leading-[0.95] font-display tracking-[-0.03em]">
            <span className="text-white/70">Modern</span><br />
            <span className="text-white/50">Care for</span><br />
            <span className="text-white/90">a Perfect</span><br />
            <span className="text-white">Smile</span>
          </h1>
        </div>

        {/* Center Section - 3D Tooth Implant */}
        <div className="h-full flex items-center justify-center relative min-w-[400px]">
          <div className="relative w-[300px] h-[550px] flex items-center justify-center">
            
            {/* The 3D Canvas */}
            <div className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing">
              <Canvas eventSource={heroRef} camera={{ position: [0, 0, 6], fov: 45 }}>
                <ambientLight intensity={0.7} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, 10, -10]} intensity={0.5} />
                <Suspense fallback={null}>
                  <Resize scale={3}>
                    <Center>
                      <TeethModel />
                    </Center>
                  </Resize>
                  <Environment preset="city" />
                </Suspense>
                <OrbitControls makeDefault enableZoom={false} enablePan={false} />
              </Canvas>
            </div>

            {/* Glow effect behind the model mimicking the 3D rim light */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[400px] bg-[#ffaa55] blur-[120px] rounded-full z-0 opacity-50"></div>
          </div>
        </div>

        {/* Right Section - Doctors Gallery */}
        <div className="flex flex-col justify-end h-full pl-8 border-l border-white/10">
          <div className="flex gap-3 relative mt-12">

            {/* Clara Collins */}
            <div className="relative w-[210px] h-[310px] group cursor-pointer overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
                alt="Clara Collins"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* 'Next >' Tab Box overlapping the top-left of the image */}
              <div className="absolute top-0 left-0 bg-[#bd4515] px-5 py-2 flex items-center gap-2 text-white/90 font-medium text-[13px] tracking-wide z-10">
                Next <span className="text-[11px] font-light leading-none mt-[1px]">&gt;</span>
              </div>

              <div className="absolute bottom-0 left-0 bg-[#161616] text-white/90 font-medium text-[13px] px-4 py-2.5 shadow-lg z-10">
                Clara Collins
              </div>
            </div>

            {/* Mason Harper */}
            <div className="relative w-[210px] h-[310px] group cursor-pointer overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
                alt="Mason Harper"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 bg-[#161616] text-white/90 font-medium text-[13px] px-4 py-2.5 shadow-lg">
                Mason Harper
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Info Row */}
      <div className="grid grid-cols-3 w-full text-[13px] text-white/60 font-medium mt-16 pt-8 border-t border-white/10">
        <div>
          Best Dentistry<br />
          2025
        </div>
        <div className="text-center">
          Barcelona, Spain<br />
          17:17:03 GMT+1
        </div>
        <div className="text-right">
          Advanced Dental<br />
          Technologies
        </div>
      </div>
    </section>
  );
};

export default Hero;
