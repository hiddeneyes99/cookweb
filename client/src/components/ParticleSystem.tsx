import { useEffect, useRef } from 'react';

export default function ParticleSystem() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      const size = Math.random() * 4 + 1;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = Math.random() * window.innerHeight + 'px';
      particle.style.opacity = (Math.random() * 0.5 + 0.2).toString();
      
      container.appendChild(particle);
      
      // Animate particle
      const duration = Math.random() * 10000 + 5000;
      const animation = particle.animate([
        { 
          transform: 'translate(0, 0)', 
          opacity: particle.style.opacity 
        },
        { 
          transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px)`, 
          opacity: '0' 
        }
      ], {
        duration: duration,
        easing: 'ease-out',
        fill: 'forwards'
      });

      animation.addEventListener('finish', () => {
        if (particle.parentNode) {
          particle.remove();
        }
      });
    };
    
    // Reduce particles for better mobile performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 20;
    const intervalDelay = isMobile ? 2000 : 1000;
    
    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
      setTimeout(createParticle, Math.random() * 2000);
    }
    
    // Create particles periodically
    const interval = setInterval(createParticle, intervalDelay);
    
    return () => {
      clearInterval(interval);
      // Clean up particles
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 pointer-events-none z-0" 
      data-testid="particle-system"
    />
  );
}
