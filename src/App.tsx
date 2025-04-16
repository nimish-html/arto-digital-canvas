import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { DrawingMode, SymmetryMode } from './types';
import Home from './pages/Home';
import LoadingOverlay from './components/LoadingOverlay';
import ShowcasePage from './pages/ShowcasePage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import './css/animations.css';
import PageNavbar from './components/ui/PageNavbar';
import DarkModeToggle from './components/ui/DarkModeToggle';
import Canvas from './components/Canvas';

declare global {
  interface Window {
    clearCanvas: () => void;
    downloadCanvas: () => void;
    undoCanvas: () => void;
    redoCanvas: () => void;
    getCanvasDataURL: () => string;
    exportCanvas: (format: 'png' | 'jpg') => void;
  }
}

const CanvasPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCanvasFullscreen, setIsCanvasFullscreen] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex">
        {/* Main Content - Just the Canvas now */}
        <div className="flex-1 flex flex-col">
          {/* Only show navbar when not in fullscreen */}
          {!isCanvasFullscreen && <PageNavbar />}
          
          <Canvas 
            onFullscreenChange={setIsCanvasFullscreen}
          />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/canvas" element={<CanvasPage />} />
          <Route path="/showcase" element={<ShowcasePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;