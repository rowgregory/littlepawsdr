import React, { useEffect, useRef, useCallback } from 'react';
import * as THREE from 'three';

interface ParticleData {
  startTime: number;
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  rotationSpeed: {
    x: number;
    y: number;
    z: number;
  };
  gravity: number;
  life: number;
  fadeSpeed: number;
}

interface ConfettiPopProps {
  trigger?: number;
  particleCount?: number;
  duration?: number;
}

const ConfettiPop: React.FC<ConfettiPopProps> = ({ trigger = 0, particleCount = 100, duration = 3000 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<THREE.Mesh[]>([]);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const createConfettiBurst = useCallback(() => {
    if (!sceneRef.current) return;

    const scene = sceneRef.current;

    // Clear existing particles
    particlesRef.current.forEach((particle) => {
      scene.remove(particle);
      if (particle.geometry) particle.geometry.dispose();
      if (particle.material instanceof THREE.Material) {
        particle.material.dispose();
      }
    });
    particlesRef.current = [];

    // Confetti colors
    const colors: number[] = [0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf9ca24, 0xf0932b, 0xeb4d4b, 0x6c5ce7, 0xa29bfe, 0xfd79a8, 0x00b894];

    // Create burst particles
    const particles: THREE.Mesh[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Create different shapes
      const shapeType = Math.random();
      let geometry: THREE.BufferGeometry;

      if (shapeType < 0.4) {
        geometry = new THREE.PlaneGeometry(0.15, 0.1);
      } else if (shapeType < 0.7) {
        geometry = new THREE.CircleGeometry(0.08, 8);
      } else {
        geometry = new THREE.ConeGeometry(0.06, 0.12, 3);
      }

      const material = new THREE.MeshBasicMaterial({
        color: colors[Math.floor(Math.random() * colors.length)],
        side: THREE.DoubleSide,
        transparent: true,
      });

      const particle = new THREE.Mesh(geometry, material);

      // Start from center and burst outward
      particle.position.set(0, 0, 0);

      // Random burst direction
      const angle = Math.random() * Math.PI * 2;
      const elevation = (Math.random() - 0.5) * Math.PI * 0.5;
      const speed = Math.random() * 0.3 + 0.1;

      const particleData: ParticleData = {
        startTime: Date.now(),
        velocity: {
          x: Math.cos(angle) * Math.cos(elevation) * speed,
          y: Math.sin(elevation) * speed + Math.random() * 0.1,
          z: Math.sin(angle) * Math.cos(elevation) * speed,
        },
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
          z: (Math.random() - 0.5) * 0.2,
        },
        gravity: -0.008,
        life: 1.0,
        fadeSpeed: 1 / (duration * 0.06),
      };

      particle.userData = particleData;
      scene.add(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Start animation
    const animate = (): void => {
      const aliveParticles: THREE.Mesh[] = [];

      particles.forEach((particle) => {
        const userData = particle.userData as ParticleData;

        // Update physics
        userData.velocity.y += userData.gravity;

        particle.position.x += userData.velocity.x;
        particle.position.y += userData.velocity.y;
        particle.position.z += userData.velocity.z;

        // Update rotation
        particle.rotation.x += userData.rotationSpeed.x;
        particle.rotation.y += userData.rotationSpeed.y;
        particle.rotation.z += userData.rotationSpeed.z;

        // Update life/opacity
        userData.life -= userData.fadeSpeed;
        if (particle.material instanceof THREE.MeshBasicMaterial) {
          particle.material.opacity = Math.max(0, userData.life);
        }

        // Keep particle if still alive
        if (userData.life > 0 && particle.position.y > -10) {
          aliveParticles.push(particle);
        } else {
          // Remove dead particle
          scene.remove(particle);
          particle.geometry.dispose();
          if (particle.material instanceof THREE.Material) {
            particle.material.dispose();
          }
        }
      });

      // Continue animation if particles are alive
      if (aliveParticles.length > 0) {
        animationIdRef.current = requestAnimationFrame(animate);
        if (rendererRef.current && sceneRef.current && cameraRef.current) {
          rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
      }
    };

    animate();
  }, [particleCount, duration]);

  useEffect(() => {
    const mountElement = mountRef.current;
    if (!mountElement) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountElement.appendChild(renderer.domElement);

    // Store refs
    sceneRef.current = scene;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    // Camera position
    camera.position.z = 5;

    // Handle window resize
    const handleResize = (): void => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }

      window.removeEventListener('resize', handleResize);

      if (mountElement && renderer.domElement && mountElement.contains(renderer.domElement)) {
        mountElement.removeChild(renderer.domElement);
      }

      // Dispose of Three.js objects
      particlesRef.current.forEach((particle) => {
        if (particle.geometry) particle.geometry.dispose();
        if (particle.material instanceof THREE.Material) {
          particle.material.dispose();
        }
        scene.remove(particle);
      });

      renderer.dispose();
    };
  }, []);

  // Trigger confetti burst when trigger prop changes
  useEffect(() => {
    if (trigger > 0) {
      createConfettiBurst();
    }
  }, [trigger, createConfettiBurst]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default ConfettiPop;
