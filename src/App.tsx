import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Toolbar from './components/Toolbar';
import Canvas from './components/Canvas';
import ArtworkPreview from './components/ArtworkPreview';
import { DrawingMode, SymmetryMode } from './types';
import { Palette, Eye, Save, ArrowLeftCircle } from 'lucide-react';
import Home from './pages/Home';
import LoadingOverlay from './components/LoadingOverlay';
import ShowcasePage from './pages/ShowcasePage';
import ProfilePage from './pages/ProfilePage';
import { ThemeProvider } from './context/ThemeContext';
import './css/animations.css';
import AnimeNavBarDemo from './components/ui/AnimeNavBarDemo';
import DarkModeToggle from './components/ui/DarkModeToggle';

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
  const [drawingMode, setDrawingMode] = useState<DrawingMode>('pencil');
  const [color, setColor] = useState<string>('#000000');
  const [brushWidth, setBrushWidth] = useState<number>(5);
  const [symmetryMode, setSymmetryMode] = useState<SymmetryMode>('none');
  const [fillShape, setFillShape] = useState<boolean>(false);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showTips, setShowTips] = useState<boolean>(true);
  const [showMobileWarning, setShowMobileWarning] = useState<boolean>(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Check if mobile
    const checkMobile = () => {
      setShowMobileWarning(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Auto-hide tips after 10 seconds
    const tipTimer = setTimeout(() => {
      setShowTips(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(tipTimer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const handleCanvasChange = (canUndo: boolean, canRedo: boolean) => {
    setCanUndo(canUndo);
    setCanRedo(canRedo);
  };

  const clearCanvas = () => {
    if (window.confirm('Are you sure you want to clear the canvas? This action cannot be undone.')) {
      window.clearCanvas?.();
    }
  };

  const downloadCanvas = () => {
    window.downloadCanvas?.();
  };

  const undo = () => {
    window.undoCanvas?.();
  };

  const redo = () => {
    window.redoCanvas?.();
  };

  const openPreview = () => {
    // Get canvas data URL from our global method
    const dataUrl = window.getCanvasDataURL?.() || '';
    setCanvasDataUrl(dataUrl);
    setIsPreviewOpen(true);
  };

  const handleExport = (format: 'png' | 'jpg') => {
    window.exportCanvas?.(format);
    setIsPreviewOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <LoadingOverlay />}
      </AnimatePresence>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <AnimeNavBarDemo />
        <DarkModeToggle />
        
        <div className="flex-1 p-4 md:p-6 mt-20">
          <AnimatePresence>
            {showMobileWarning && (
              <motion.div 
                className="mb-4 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 p-3 rounded-lg text-sm text-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                For the best drawing experience, please use a larger screen device
                <button 
                  className="ml-2 text-yellow-600 dark:text-yellow-400 underline"
                  onClick={() => setShowMobileWarning(false)}
                >
                  Dismiss
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <Toolbar
            drawingMode={drawingMode}
            setDrawingMode={setDrawingMode}
            color={color}
            setColor={setColor}
            brushWidth={brushWidth}
            setBrushWidth={setBrushWidth}
            symmetryMode={symmetryMode}
            setSymmetryMode={setSymmetryMode}
            fillShape={fillShape}
            setFillShape={setFillShape}
            clearCanvas={clearCanvas}
            downloadCanvas={downloadCanvas}
            undo={undo}
            redo={redo}
            canUndo={canUndo}
            canRedo={canRedo}
          />
          
          <div className="flex-1 flex flex-col items-center relative">
            <Canvas
              drawingMode={drawingMode}
              color={color}
              brushWidth={brushWidth}
              symmetryMode={symmetryMode}
              fillShape={fillShape}
              onCanvasChange={handleCanvasChange}
            />
            
            <AnimatePresence>
              {showTips && (
                <motion.div 
                  className="absolute bottom-4 left-4 right-4 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 text-indigo-800 dark:text-indigo-300 p-3 rounded-md text-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Tips:</p>
                      <ul className="list-disc list-inside mt-1">
                        <li>Try different brush styles from the toolbar</li>
                        <li>Use symmetry mode for creating mandalas</li>
                        <li>Experiment with shapes and fill options</li>
                      </ul>
                    </div>
                    <button 
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
                      onClick={() => setShowTips(false)}
                    >
                      Dismiss
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex justify-between items-center mt-4">
            <motion.a
              href="/"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg flex items-center hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeftCircle size={18} className="mr-1" />
              <span className="hidden sm:inline">Back</span>
            </motion.a>
            
            <div className="flex gap-2">
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="px-3 md:px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600 text-white rounded-lg flex items-center transition-colors"
                onClick={openPreview}
              >
                <Eye size={18} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Preview & Export</span>
                <span className="sm:hidden">Preview</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.95 }}
                transition={{ delay: 0.4 }}
                className="px-3 md:px-4 py-2 bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white rounded-lg flex items-center transition-colors"
                onClick={downloadCanvas}
              >
                <Save size={18} className="mr-1 md:mr-2" />
                <span className="hidden sm:inline">Save</span>
              </motion.button>
            </div>
          </div>
        </div>
        
        <ArtworkPreview 
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          canvasDataUrl={canvasDataUrl}
          onDownload={handleExport}
        />
        
        <motion.footer 
          className="mt-4 md:mt-6 text-center text-sm text-gray-500 dark:text-gray-400 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Created with React, Fabric.js and Framer Motion
        </motion.footer>
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