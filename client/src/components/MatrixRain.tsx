import { useEffect, useRef } from 'react';

export default function MatrixRain() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createMatrixChar = () => {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = Math.random() > 0.5 ? '1' : '0';
      char.style.left = Math.random() * 100 + '%';
      char.style.animationDuration = (Math.random() * 2 + 1) + 's';
      char.style.fontSize = (Math.random() * 10 + 14) + 'px';
      container.appendChild(char);
      
      setTimeout(() => {
        if (char.parentNode) {
          char.remove();
        }
      }, 2000);
    };

    // Reduce frequency for better mobile performance
    const interval = setInterval(createMatrixChar, 250);

    return () => {
      clearInterval(interval);
      // Clean up any remaining characters
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" data-testid="matrix-rain" />;
}
