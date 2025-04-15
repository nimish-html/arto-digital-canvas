import { useEffect } from "react";
import { Link } from "react-router-dom";
import { renderCanvas } from "./ui/canvas";
import { Plus, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  useEffect(() => {
    renderCanvas();
  }, []);

  return (
    <section id="home">
      <div className="animate-fadeIn mt-20 flex flex-col items-center justify-center px-4 text-center md:mt-20">
        <div className="z-10 mb-6 mt-10 sm:justify-center md:mb-4 md:mt-20">
          <div className="relative flex items-center whitespace-nowrap rounded-full border border-indigo-200 bg-indigo-50/70 px-3 py-1 text-xs leading-6 text-indigo-600">
            <svg className="h-5 p-1 text-indigo-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L20 7V17L12 22L4 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg> Introducing Arto
            <Link
              to="/canvas"
              className="hover:text-indigo-800 ml-1 flex items-center font-semibold"
            >
              <div className="absolute inset-0 flex" aria-hidden="true" />
              Explore{" "}
              <span aria-hidden="true">
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mb-10 mt-4 md:mt-6">
          <div className="px-2">
            <div className="relative mx-auto h-full max-w-7xl bg-gradient-to-r from-indigo-50/50 to-white border-2 border-indigo-200 p-6 shadow-[0_0_15px_rgba(109,91,220,0.15)] [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] md:px-12 md:py-20">
              <h1 className="flex select-none flex-col px-3 py-2 text-center text-5xl font-semibold leading-none tracking-tight text-gray-800 md:flex-col md:text-8xl lg:flex-row lg:text-8xl">
                <Plus
                  strokeWidth={3}
                  className="text-purple-dark absolute -left-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={3}
                  className="text-purple-dark absolute -bottom-5 -left-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={3}
                  className="text-purple-dark absolute -right-5 -top-5 h-10 w-10"
                />
                <Plus
                  strokeWidth={3}
                  className="text-purple-dark absolute -bottom-5 -right-5 h-10 w-10"
                />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Your complete platform for Digital Art.</span>
              </h1>
            </div>
          </div>

          <h1 className="mt-8 text-2xl md:text-2xl">
            Welcome to our creative playground! Create amazing{" "}
            <span className="text-purple-dark font-bold">digital art</span>
          </h1>

          <p className="md:text-md mx-auto mb-16 mt-2 max-w-2xl px-6 text-sm text-gray-600 sm:px-6 md:max-w-4xl md:px-20 lg:text-lg">
            Craft enchanting visuals with our powerful drawing tools, create stunning designs,
            and unleash your creativity with our intuitive canvas.
          </p>
          <div className="flex justify-center gap-2">
            <Link to="/canvas">
              <Button variant="default" size="lg" className="bg-purple-dark hover:bg-purple-800">
                Start Drawing
              </Button>
            </Link>
            <a href="https://unsplash.com/photos/npxXWgQ33ZQ" target="_blank" rel="noreferrer">
              <Button variant="outline" size="lg" className="border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                View Gallery
              </Button>
            </a>
          </div>
        </div>
      </div>
      <canvas
        className="pointer-events-none absolute inset-0 z-0 mx-auto"
        id="canvas"
      ></canvas>
    </section>
  );
}

export default Hero;