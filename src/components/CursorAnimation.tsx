import { useEffect } from "react";
// @ts-ignore - Suppress TS error for JS module without declaration file
import { renderCanvas, resizeCanvas, cleanupCanvas } from "../utils/cursorEffectScript.js";

export const CursorAnimation = () => {
  useEffect(() => {
    renderCanvas();
    
    // Initial resize
    resizeCanvas();
    
    // Add resize listener
    window.addEventListener("resize", resizeCanvas);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cleanupCanvas();
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