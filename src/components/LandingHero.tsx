import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { fabric } from 'fabric';

const LandingHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Create an animated preview on canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 500,
      backgroundColor: '#ffffff',
      isDrawingMode: false,
    });

    // Add decorative elements
    const addDecorations = () => {
      // Add a colorful grid background
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 7; j++) {
          const rect = new fabric.Rect({
            left: i * 80,
            top: j * 80,
            width: 70,
            height: 70,
            fill: 'rgba(0,0,0,0)',
            stroke: `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`,
            strokeWidth: 2,
            rx: 10,
            ry: 10,
          });
          canvas.add(rect);
        }
      }

      // Add some sample shapes
      const circle = new fabric.Circle({
        radius: 60,
        fill: 'rgba(103, 58, 183, 0.5)',
        left: 200,
        top: 150,
      });

      const rect = new fabric.Rect({
        width: 120,
        height: 120,
        left: 500,
        top: 200,
        fill: 'rgba(233, 30, 99, 0.5)',
        angle: 15,
      });

      const triangle = new fabric.Triangle({
        width: 100,
        height: 100,
        left: 350,
        top: 300,
        fill: 'rgba(0, 188, 212, 0.5)',
      });

      const line = new fabric.Line([100, 400, 700, 400], {
        stroke: 'rgba(76, 175, 80, 0.7)',
        strokeWidth: 8,
      });

      // Add elements to canvas
      canvas.add(circle, rect, triangle, line);

      // Add a simple drawing
      const path = new fabric.Path('M 100 100 Q 150 50, 200 100 T 300 100 Q 350 150, 300 200 T 200 200 Q 150 250, 100 200 T 0 200 Q -50 150, 0 100 T 100 100 z');
      path.set({
        left: 400,
        top: 100,
        fill: 'rgba(255, 193, 7, 0.5)',
        stroke: 'rgba(255, 152, 0, 0.8)',
        strokeWidth: 3,
      });
      canvas.add(path);

      // Add text label
      const text = new fabric.Text('Digital Art Canvas', {
        left: 120,
        top: 50,
        fontFamily: 'Arial',
        fontSize: 30,
        fontWeight: 'bold',
        fill: 'rgba(33, 33, 33, 0.8)',
      });
      canvas.add(text);

      canvas.renderAll();
    };

    addDecorations();

    // Animate elements
    let angle = 0;
    const animate = () => {
      angle += 0.5;
      canvas.getObjects().forEach((obj, index) => {
        if (obj.type === 'circle' || obj.type === 'rect' || obj.type === 'triangle') {
          obj.animate(
            'top', 
            obj.top + Math.sin(angle * (Math.PI / 180) + index) * 0.5,
            {
              duration: 100,
              onChange: canvas.renderAll.bind(canvas),
              easing: fabric.util.ease.easeInOutQuad,
            }
          );
        }
      });

      fabric.util.requestAnimFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      canvas.dispose();
    };
  }, []);

  return (
    <motion.div
      className="mx-auto relative overflow-hidden rounded-xl shadow-2xl"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.5 }}
      style={{ maxWidth: '800px' }}
    >
      <div className="relative">
        <canvas ref={canvasRef} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 15%, rgba(255,255,255,0) 85%, rgba(255,255,255,0.9) 100%)'
        }}></div>
      </div>
      <div className="absolute bottom-5 right-5 z-10 bg-white bg-opacity-80 px-4 py-2 rounded-lg text-sm text-gray-500">
        Interactive preview
      </div>
    </motion.div>
  );
};

export default LandingHero;