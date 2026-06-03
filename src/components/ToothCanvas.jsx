import React, { Suspense, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment, Float, Resize, Center } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TeethModel = () => {
  const { scene } = useGLTF('/teeth-hero.glb');
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    
    // Mouse-based interaction
    const mouseTargetX = (mouse.current.y * Math.PI) / 6; 
    const mouseTargetY = (mouse.current.x * Math.PI) / 6;
    
    // Scroll-based vibration (shakes rapidly as you scroll)
    const vibrateX = Math.sin(window.scrollY * 0.2) * 0.08; 
    const vibrateY = Math.cos(window.scrollY * 0.25) * 0.08;
    
    // Base offset for mobile back-angle
    const isMobile = window.innerWidth < 768;
    const baseRotationY = isMobile ? -Math.PI / 3.5 : 0; 
    
    const finalTargetX = mouseTargetX + vibrateX;
    const finalTargetY = mouseTargetY + vibrateY + baseRotationY; 
    
    // Smoothly lerp towards the combined targets
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, finalTargetX, 0.1);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, finalTargetY, 0.1);
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
};

const AnimatedGroup = ({ canvasWrapperRef }) => {
  const groupRef = useRef();

  useEffect(() => {
    if (!groupRef.current || !canvasWrapperRef.current) return;

    // Initial state (Hero)
    groupRef.current.scale.set(1.5, 1.5, 1.5);
    groupRef.current.position.set(0, 0, 0);

    let ctx = gsap.context(() => {
      const matchMedia = gsap.matchMedia();

      matchMedia.add("(min-width: 768px)", () => {
        // --- 1. ENTERING SERVICES (Hero to Services) ---
        // General Dentistry (Center)
        gsap.to(groupRef.current.position, {
          x: 0,
          y: -0.5,
          z: 0,
          scrollTrigger: {
            trigger: "#services",
            start: "top bottom",
            end: "top top",
            scrub: 1
          }
        });
        gsap.to(groupRef.current.scale, {
          x: 1.8, y: 1.8, z: 1.8,
          scrollTrigger: {
            trigger: "#services",
            start: "top bottom",
            end: "top top",
            scrub: 1
          }
        });

        // --- 2. INSIDE SERVICES (Pinned 400vh Scrub) ---
        const servicesTl = gsap.timeline({
          scrollTrigger: {
            trigger: "#services",
            start: "top top",
            end: "+=400%",
            scrub: 1
          }
        });

        // Panel 1 -> 2 (Cosmetic Dentistry): Tooth rotates slowly
        servicesTl.to(groupRef.current.rotation, {
          y: Math.PI * 2, // 360 degree slow rotation
          ease: "none",
          duration: 1
        });

        // Panel 2 -> 3 (Implants): Tooth zooms in
        servicesTl.to(groupRef.current.scale, {
          x: 3.5, y: 3.5, z: 3.5,
          ease: "power2.inOut",
          duration: 1
        });

        // Panel 3 -> 4 (Restorative): Tooth moves closer on Z axis
        servicesTl.to(groupRef.current.position, {
          z: 2.5,
          y: -1, // slight shift down as it gets closer
          ease: "power2.inOut",
          duration: 1
        });

        // --- 3. SERVICES TO ABOUT ---
        gsap.to(groupRef.current.position, {
          x: -2.5,
          z: 0,
          y: 0,
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
        gsap.to(groupRef.current.scale, {
          x: 1.8, y: 1.8, z: 1.8,
          scrollTrigger: {
            trigger: "#about",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Doctors -> Upper right, less dominant, blurred slightly
        gsap.to(groupRef.current.position, {
          x: 2,
          y: 1.5,
          z: -1,
          scrollTrigger: {
            trigger: "#doctors",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
        const proxyDoctors = { blur: 0, opacity: 1 };
        gsap.to(proxyDoctors, {
          blur: 4,
          opacity: 0.7,
          onUpdate: () => {
            if (canvasWrapperRef.current) {
              canvasWrapperRef.current.style.filter = `blur(${proxyDoctors.blur}px)`;
              canvasWrapperRef.current.style.opacity = proxyDoctors.opacity;
            }
          },
          scrollTrigger: {
            trigger: "#doctors",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // Testimonials -> Far background, low opacity
        gsap.to(groupRef.current.position, {
          x: 0,
          y: 0,
          z: -4,
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
        gsap.to(groupRef.current.scale, {
          x: 2.5, y: 2.5, z: 2.5,
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });
        const proxyTestimonials = { blur: 4, opacity: 0.7 };
        gsap.to(proxyTestimonials, {
          blur: 8,
          opacity: 0.2,
          onUpdate: () => {
            if (canvasWrapperRef.current) {
              canvasWrapperRef.current.style.filter = `blur(${proxyTestimonials.blur}px)`;
              canvasWrapperRef.current.style.opacity = proxyTestimonials.opacity;
            }
          },
          scrollTrigger: {
            trigger: "#testimonials",
            start: "top bottom",
            end: "bottom top",
            scrub: 1
          }
        });

        // CTA -> Move to the right side, largest scale
        gsap.to(groupRef.current.position, {
          x: 3.5, y: 0, z: 1,
          scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        gsap.to(groupRef.current.scale, {
          x: 3.0, y: 3.0, z: 3.0,
          scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom top", scrub: 1 }
        });
        const proxyCTA = { blur: 8, opacity: 0.2 };
        gsap.to(proxyCTA, {
          blur: 0, opacity: 1,
          onUpdate: () => {
            if (canvasWrapperRef.current) {
              canvasWrapperRef.current.style.filter = `blur(${proxyCTA.blur}px)`;
              canvasWrapperRef.current.style.opacity = proxyCTA.opacity;
            }
          },
          scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom top", scrub: 1 }
        });
      });

      // ==========================================
      // MOBILE STORYBOARD
      // ==========================================
      matchMedia.add("(max-width: 767px)", () => {
        // Explicit Rule: Increase size slightly (was 1.65)
        groupRef.current.scale.set(1.8, 1.8, 1.8);
        // Explicit Rule: right: -10%, bottom: 18%.
        // Setting x to 0.7 (approx right side without totally clipping), y to -3 initially for animation.
        groupRef.current.position.set(0.65, -3, 0); 

        // 0.3s Tooth rises from bottom
        gsap.to(groupRef.current.position, {
          y: -0.3, // Move a little downward (lower than 0.2)
          duration: 1.5,
          ease: "power3.out",
          delay: 0.2
        });

        // 1. ENTERING SERVICES (Hero -> Services)
        // Use fromTo with immediateRender: false so GSAP doesn't cache the y: -3 entrance position!
        gsap.fromTo(groupRef.current.position, 
          { x: 0.65, y: -0.3, z: 0 },
          {
            x: 0,
            y: -0.8,
            z: 0,
            scrollTrigger: { trigger: "#services", start: "top bottom", end: "top top", scrub: 1, immediateRender: false }
          }
        );
        gsap.fromTo(groupRef.current.scale,
          { x: 1.8, y: 1.8, z: 1.8 },
          {
            x: 2.3, y: 2.3, z: 2.3,
            scrollTrigger: { trigger: "#services", start: "top bottom", end: "top top", scrub: 1, immediateRender: false }
          }
        );
        gsap.fromTo(groupRef.current.rotation,
          { x: 0, y: 0, z: 0 },
          {
            x: 0,
            y: 20 * (Math.PI / 180),
            z: 0,
            scrollTrigger: { trigger: "#services", start: "top bottom", end: "top top", scrub: 1, immediateRender: false }
          }
        );

        // 3. Services -> About
        gsap.to(groupRef.current.position, {
          x: 0, y: 0, z: -1, // Keep center, push slightly back
          scrollTrigger: { trigger: "#about", start: "top bottom", end: "bottom top", scrub: 0.3 }
        });

        // 4. Doctors
        gsap.to(groupRef.current.position, {
          x: 0, y: 0.5, z: -2,
          scrollTrigger: { trigger: "#doctors", start: "top bottom", end: "bottom top", scrub: 0.3 }
        });

        // 5. Testimonials
        gsap.to(groupRef.current.position, {
          x: 0, y: 0, z: -3,
          scrollTrigger: { trigger: "#testimonials", start: "top bottom", end: "bottom top", scrub: 0.3 }
        });

        // 6. CTA (Max Scale 1.8)
        gsap.to(groupRef.current.position, {
          x: 0, y: 0, z: 0,
          scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom top", scrub: 0.3 }
        });
        gsap.to(groupRef.current.scale, {
          x: 1.8, y: 1.8, z: 1.8,
          scrollTrigger: { trigger: "#cta", start: "top bottom", end: "bottom top", scrub: 0.3 }
        });
        
        // Remove blur effects on mobile for strict 60fps performance
        if (canvasWrapperRef.current) {
          canvasWrapperRef.current.style.filter = 'none';
          canvasWrapperRef.current.style.opacity = 1;
        }
      });
    });

    return () => ctx.revert();
  }, [canvasWrapperRef]);

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef}>
        <Resize scale={1}>
          <Center>
            <TeethModel />
          </Center>
        </Resize>
      </group>
    </Float>
  );
};

const ToothCanvas = () => {
  const canvasWrapperRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  
  return (
    <div 
      ref={canvasWrapperRef}
      className="fixed inset-0 z-0 pointer-events-none will-change-[filter,opacity]"
    >
      <Canvas 
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={isMobile ? 1 : [1, 2]} // Strict performance: cap pixel ratio on mobile
        gl={{ powerPreference: "high-performance", antialias: !isMobile }} // Disable antialias on mobile for speed
      >
        <ambientLight intensity={1.5} />
        {/* Main bright key light from upper right matching gradient */}
        <directionalLight position={[10, 15, 10]} intensity={3.0} color="#ffffff" />
        {/* Soft fill light from left */}
        <directionalLight position={[-10, 10, -10]} intensity={0.8} color="#f5f1eb" />
        {/* Warm rim light from below/behind */}
        <directionalLight position={[0, -10, -5]} intensity={1.5} color="#e85d1c" />
        
        <Suspense fallback={null}>
          <AnimatedGroup canvasWrapperRef={canvasWrapperRef} />
          {/* Studio preset gives much better, cleaner lighting reflections for a glossy tooth */}
          <Environment preset="studio" resolution={isMobile ? 128 : 256} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ToothCanvas;
