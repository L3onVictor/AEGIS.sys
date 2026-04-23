import React, { useEffect, useRef } from 'react';
import { RainEngine } from '../../core/RainEngine';
import { useMouse } from '../../hooks/useMouse';

export const RainBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<RainEngine | null>(null);
  const mouse = useMouse();

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Engine
    engineRef.current = new RainEngine(canvasRef.current);
    engineRef.current.start();

    // Handle Resize
    const handleResize = () => {
      engineRef.current?.resize();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      engineRef.current?.stop();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sync mouse state to the engine without triggering React re-renders in the engine loop
  useEffect(() => {
    if (engineRef.current) {
      engineRef.current.setMousePosition(mouse.x, mouse.y);
    }
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none', // Lets clicks pass through to the UI
        background: 'linear-gradient(to bottom, #050810, #0a1128)' // Deep tech background
      }}
    />
  );
};
