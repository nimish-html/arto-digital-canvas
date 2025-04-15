import { useEffect } from "react";
import { renderCanvas } from "./ui/canvas";

export const CursorAnimation = () => {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <canvas
      className="pointer-events-none absolute inset-0 z-0 mx-auto"
      id="canvas"
    ></canvas>
  );
};

export default CursorAnimation;