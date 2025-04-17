import { useEffect } from "react";
import { renderCanvas } from "./ui/canvas";

export const CursorAnimation = () => {
  useEffect(() => {
    renderCanvas();
    
    // Make sure the canvas stays at the full viewport size
    const resizeCanvas = () => {
      const canvas = document.getElementById("canvas");
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };
    
    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      className="pointer-events-none fixed inset-0 z-0 w-full h-full"
      id="canvas"
    ></canvas>
  );
};

export default CursorAnimation;