import { useState, useEffect } from 'react';

export const useMouse = () => {
  const [mousePosition, setMousePosition] = useState({ x: -1000, y: -1000 });

  useEffect(() => {
    // Throttling or passive listener can help performance
    // Using passive to ensure scroll isn't blocked, though for mousemove it's less critical
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };
    
    const handleMouseLeave = () => {
      setMousePosition({ x: -1000, y: -1000 }); // Move offscreen
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return mousePosition;
};
