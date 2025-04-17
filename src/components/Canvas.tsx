import React, { useState, useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { 
  Undo2, 
  Redo2, 
  Eye, 
  Plus,
  Maximize,
  Minimize,
  X,
  Share2,
  Download,
  Plus as PlusIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { ButtonGroup } from './ui/button-group';

interface CanvasProps {
  onFullscreenChange?: (isFullscreen: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onFullscreenChange }) => {
  // Canvas state
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [activeColor, setActiveColor] = useState<string>('#ef4444'); // Red as shown in screenshots
  const [brushSize, setBrushSize] = useState<number>(10);
  const [brushOpacity, setBrushOpacity] = useState<number>(100);
  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);
  
  // UI state
  const [showColorPalette, setShowColorPalette] = useState<boolean>(false);
  const [showBrushSettings, setShowBrushSettings] = useState<boolean>(false);
  const [showLayersPanel, setShowLayersPanel] = useState<boolean>(false);
  const [activeTool, setActiveTool] = useState<string>('brush');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [canvasPosition, setCanvasPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  
  // Reset position when changing modes
  useEffect(() => {
    if (isFullscreen || isMinimized) {
      setCanvasPosition({ x: 0, y: 0 });
    }
    
    // Notify parent component about fullscreen change
    if (onFullscreenChange) {
      onFullscreenChange(isFullscreen);
    }
    
    // Force an immediate resize when fullscreen mode changes
    if (isFullscreen) {
      setTimeout(() => {
        updateCanvasSize();
      }, 50);
    }
  }, [isFullscreen, isMinimized, onFullscreenChange]);
  
  // History for undo/redo
  const historyRef = useRef<string[]>([]);
  const currentStateIndexRef = useRef<number>(-1);

  // Available colors (based on the screenshot)
  const colorPalette = [
    // Row 1 - Grayscale
    '#000000', '#333333', '#666666', '#999999', '#cccccc', '#ffffff', '#ffffff',
    // Row 2 - Light colors
    '#f8a5a5', '#f8e3a3', '#b6e6bd', '#a8e6e6', '#a4c4f4', '#d2b8f8', '#f8d8c0',
    // Row 3 - Medium colors
    '#ef4444', '#f59e0b', '#22c55e', '#06b6d4', '#3b82f6', '#8b5cf6', '#f97316',
    // Row 4 - Dark colors
    '#b91c1c', '#d97706', '#15803d', '#0e7490', '#1d4ed8', '#7e22ce', '#c2410c'
  ];
  
  // Tools from the screenshot
  const tools = [
    { id: 'brush', icon: '🖌️', tooltip: 'Brush' },
    { id: 'line', icon: '➖', tooltip: 'Line' },
    { id: 'arrow', icon: '➡️', tooltip: 'Arrow' },
    { id: 'shape', icon: '◻️', tooltip: 'Shape' },
    { id: 'text', icon: 'T', tooltip: 'Text' },
    { id: 'eraser', icon: '🧽', tooltip: 'Eraser' }
  ];

  // Define updateCanvasSize using useCallback
  const updateCanvasSize = useCallback(() => {
    if (!fabricCanvasRef.current || !canvasContainerRef.current) return;
    
    const container = canvasContainerRef.current;
    // Ensure we get the most up-to-date dimensions
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    
    // Check if dimensions are valid before setting
    if (newWidth > 0 && newHeight > 0) {
      fabricCanvasRef.current.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvasRef.current.renderAll();
      
      console.log(`Canvas resized to ${newWidth}x${newHeight}`);
    } else {
      console.warn("Attempted to resize canvas with zero dimensions.");
    }
  }, []); // Empty dependency array

  // Initialize canvas and basic resize handling
  useEffect(() => {
    if (!canvasRef.current || !canvasContainerRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: true,
      backgroundColor: '#ffffff', // Change from '#f8a5a5' to white
      stopContextMenu: true,
      fireRightClick: true,
    });

    // Prevent fabric's mouse events from bubbling up to the container
    canvas.on('mouse:down', function(options) {
      if (options.e) {
        options.e.stopPropagation();
      }
    });
    canvas.on('mouse:move', function(options) {
      if (options.e) {
        options.e.stopPropagation();
      }
    });
    canvas.on('mouse:up', function(options) {
      if (options.e) {
        options.e.stopPropagation();
      }
    });

    fabricCanvasRef.current = canvas;

    // Call initial updateCanvasSize here
    updateCanvasSize(); 

    // Handle window resize (still useful for actual browser window changes)
    const handleResize = () => {
      updateCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    // Setup brush
    const brush = new fabric.PencilBrush(canvas);
    brush.color = activeColor;
    brush.width = brushSize;
    canvas.freeDrawingBrush = brush;

    // Save initial state
    const saveCanvasState = () => {
      if (!fabricCanvasRef.current) return;
      
      // If we're not at the end of the history, remove everything after current index
      if (currentStateIndexRef.current < historyRef.current.length - 1) {
        historyRef.current = historyRef.current.slice(0, currentStateIndexRef.current + 1);
      }
      
      // Save current state
      const json = JSON.stringify(fabricCanvasRef.current.toJSON());
      historyRef.current.push(json);
      currentStateIndexRef.current = historyRef.current.length - 1;
      
      // Update undo/redo availability
      setCanUndo(currentStateIndexRef.current > 0);
      setCanRedo(currentStateIndexRef.current < historyRef.current.length - 1);
    };

    // Setup event listeners
    canvas.on('object:added', saveCanvasState);
    canvas.on('object:modified', saveCanvasState);
    canvas.on('object:removed', saveCanvasState);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [activeColor, brushSize, updateCanvasSize]);
  
  // Update canvas size when fullscreen or minimized state changes
  useEffect(() => {
    const resizeTimer = setTimeout(() => {
      updateCanvasSize();
    }, 100);
    
    return () => clearTimeout(resizeTimer);
  }, [isFullscreen, isMinimized, updateCanvasSize]);

  // Update brush when color or size changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
      // @ts-ignore
      canvas.freeDrawingBrush.opacity = brushOpacity / 100;
      canvas.renderAll();
    }
  }, [activeColor, brushSize, brushOpacity]);
  
  // Handle tool changes
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    // Set drawing mode based on active tool
    if (activeTool === 'brush') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = activeColor;
      canvas.freeDrawingBrush.width = brushSize;
      // @ts-ignore
      canvas.freeDrawingBrush.opacity = brushOpacity / 100;
    } else if (activeTool === 'eraser') {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush = new fabric.PencilBrush(canvas);
      canvas.freeDrawingBrush.color = '#ffffff'; // Same as background
      canvas.freeDrawingBrush.width = brushSize * 2;
    } else {
      // For other tools like line, shape, etc.
      canvas.isDrawingMode = false;
    }
    
    canvas.renderAll();
  }, [activeTool, activeColor, brushSize, brushOpacity]);

  // Undo function
  const undo = () => {
    if (!fabricCanvasRef.current || currentStateIndexRef.current <= 0) return;
    
    currentStateIndexRef.current--;
    const json = historyRef.current[currentStateIndexRef.current];
    fabricCanvasRef.current.loadFromJSON(json, () => {
      fabricCanvasRef.current?.renderAll();
      setCanUndo(currentStateIndexRef.current > 0);
      setCanRedo(currentStateIndexRef.current < historyRef.current.length - 1);
    });
  };

  // Redo function
  const redo = () => {
    if (!fabricCanvasRef.current || currentStateIndexRef.current >= historyRef.current.length - 1) return;
    
    currentStateIndexRef.current++;
    const json = historyRef.current[currentStateIndexRef.current];
    fabricCanvasRef.current.loadFromJSON(json, () => {
      fabricCanvasRef.current?.renderAll();
      setCanUndo(currentStateIndexRef.current > 0);
      setCanRedo(currentStateIndexRef.current < historyRef.current.length - 1);
    });
  };

  // Handle drag start
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFullscreen || isMinimized) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - canvasPosition.x,
      y: e.clientY - canvasPosition.y
    };
  };
  
  // Handle drag move
  const handleDragMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || isFullscreen || isMinimized) return;
    
    const newX = e.clientX - dragStartRef.current.x;
    const newY = e.clientY - dragStartRef.current.y;
    
    // Limit drag range to prevent the canvas from going too far off-screen
    const containerWidth = canvasContainerRef.current?.clientWidth || 0;
    const containerHeight = canvasContainerRef.current?.clientHeight || 0;
    const maxX = window.innerWidth / 2;
    const maxY = window.innerHeight / 2;
    
    setCanvasPosition({
      x: Math.max(-maxX + containerWidth/2, Math.min(newX, maxX - containerWidth/2)),
      y: Math.max(-maxY + containerHeight/2, Math.min(newY, maxY - containerHeight/2))
    });
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Toggle fullscreen and notify parent component
  const toggleFullscreen = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else if (isFullscreen) {
      setIsFullscreen(false);
    } else {
      setIsFullscreen(true);
    }
    
    // Force a canvas resize after state update
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        updateCanvasSize();
      });
    });
  };
  
  // Handle download
  const downloadCanvas = () => {
    if (!fabricCanvasRef.current) return;
    
    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1
    });
    
    const link = document.createElement('a');
    link.download = 'arto-canvas-artwork.png';
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Handle share
  const shareCanvas = () => {
    // Check if the Web Share API is supported by the browser
    if (navigator.share) {
      // Get canvas data URL
      if (!fabricCanvasRef.current) return;
      
      const dataURL = fabricCanvasRef.current.toDataURL({
        format: 'png',
        quality: 1
      });
      
      // Convert data URL to Blob
      fetch(dataURL)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'arto-canvas-artwork.png', { type: 'image/png' });
          navigator.share({
            title: 'My Artwork from Arto',
            text: 'Check out this artwork I created with Arto!',
            files: [file]
          }).catch(error => {
            console.log('Sharing failed', error);
            alert('Sharing failed. Try downloading and sharing manually.');
          });
        });
    } else {
      // Fallback for browsers that don't support the Web Share API
      alert('Web Share API not supported in your browser. Try downloading and sharing manually.');
    }
  };
  
  // Handle add to showcase
  const addToShowcase = () => {
    // This would typically save to a database, but for this demo we'll just show an alert
    alert('Artwork added to showcase! (This is a demo feature that would save to a database in a real app)');
  };

  return (
    <div className={`min-h-screen w-full bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden ${isFullscreen ? 'p-0' : 'pt-24'}`}>
      {/* Background elements for visual interest - hide in fullscreen mode */}
      {!isFullscreen && (
        <>
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
          <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-400 rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-purple-400 rounded-full filter blur-3xl opacity-10"></div>
        </>
      )}
      
      <div className={`max-w-5xl mx-auto relative pb-20 ${isFullscreen ? 'max-w-none w-full h-full p-0 m-0' : ''}`}>
        {/* Canvas container with resizable modes */}
        <AnimatePresence>
          <motion.div 
            ref={canvasContainerRef}
            data-testid="canvas-container"
            onAnimationComplete={updateCanvasSize}
            className={`relative z-30 overflow-hidden ${
              isFullscreen 
                ? 'fixed inset-0 w-screen h-screen' 
                : isMinimized
                  ? 'fixed bottom-4 right-4 w-80 h-40'
                  : 'bg-gradient-to-r from-indigo-50/50 to-white border-[3px] border-indigo-200 shadow-[0_0_15px_rgba(109,91,220,0.15)] [mask-image:radial-gradient(800rem_96rem_at_center,white,transparent)] dark:from-gray-800/50 dark:to-gray-800 dark:border-indigo-700 dark:shadow-[0_0_15px_rgba(109,91,220,0.07)]'
            }`}
            style={{ 
              cursor: !isFullscreen && !isMinimized && isDragging ? 'grabbing' : (!isFullscreen && !isMinimized ? 'grab' : 'default')
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.9,
              borderRadius: 0, // No border radius for sharp edges
              width: isFullscreen ? '100vw' : isMinimized ? '320px' : '100%',
              height: isFullscreen ? '100vh' : isMinimized ? '180px' : '70vh',
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              borderRadius: 0, // Ensure no border radius in any state for sharp corners
              width: isFullscreen ? '100vw' : isMinimized ? '320px' : '100%',
              height: isFullscreen ? '100vh' : isMinimized ? '180px' : '70vh',
              x: canvasPosition.x,
              y: canvasPosition.y,
              top: isFullscreen ? 0 : undefined,
              left: isFullscreen ? 0 : undefined,
              right: isFullscreen ? 0 : undefined,
              bottom: isFullscreen ? 0 : undefined,
            }}
            transition={{ 
              type: "spring",
              stiffness: 260,
              damping: 20
            }}
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            {/* Plus icons at corners - like the hero section */}
            {!isFullscreen && !isMinimized && (
              <>
                <Plus
                  strokeWidth={4} 
                  className="text-purple-dark absolute -left-6 -top-6 h-12 w-12 z-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-purple-dark absolute -bottom-6 -left-6 h-12 w-12 z-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-purple-dark absolute -right-6 -top-6 h-12 w-12 z-10"
                />
                <Plus
                  strokeWidth={4}
                  className="text-purple-dark absolute -bottom-6 -right-6 h-12 w-12 z-10"
                />
              </>
            )}
            
            {/* Floating control buttons, directly on canvas instead of in a header */}
            <div className="absolute top-3 right-3 z-50 flex space-x-2">
              {!isMinimized && (
                <>
                  <button 
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${canUndo ? 'bg-black/30 text-white' : 'bg-black/10 text-white/50'}`}
                    onClick={undo}
                    disabled={!canUndo}
                  >
                    <Undo2 size={18} />
                  </button>
                  <button 
                    className={`w-10 h-10 flex items-center justify-center rounded-full ${canRedo ? 'bg-black/30 text-white' : 'bg-black/10 text-white/50'}`}
                    onClick={redo}
                    disabled={!canRedo}
                  >
                    <Redo2 size={18} />
                  </button>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white"
                    onClick={() => setShowLayersPanel(!showLayersPanel)}
                  >
                    <Eye size={18} />
                  </button>
                </>
              )}
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/30 text-white"
                onClick={toggleFullscreen}
              >
                {isMinimized ? <Maximize size={18} /> : isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
            </div>
            
            {/* Actual canvas element */}
            <canvas 
              ref={canvasRef}
              className="absolute top-0 left-0 w-full h-full" 
            />
            
            {/* Left toolbar - only show when not minimized */}
            {!isMinimized && (
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-40 flex flex-col bg-black/20 backdrop-blur-sm rounded-r-lg p-1 space-y-3">
                {/* Color indicator */}
                <button 
                  onClick={() => setShowColorPalette(!showColorPalette)} 
                  className="w-12 h-12 rounded-full border-2 border-white" 
                  style={{ backgroundColor: activeColor }}
                />
                
                {/* Tools */}
                {tools.map((tool) => (
                  <button 
                    key={tool.id}
                    onClick={() => setActiveTool(tool.id)}
                    className={`w-12 h-12 flex items-center justify-center text-xl rounded-lg ${activeTool === tool.id ? 'bg-black/30 text-white' : 'text-white hover:bg-black/20'}`}
                    title={tool.tooltip}
                  >
                    {tool.icon}
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
        
        {/* Action Buttons - Now using ButtonGroup instead of individual buttons */}
        {!isMinimized && !isFullscreen && (
          <div className="flex justify-end mt-9.4">
            <ButtonGroup separated={true} className="mt-4">
              <Button 
                onClick={shareCanvas} 
                className="bg-purple-dark hover:bg-purple-800 text-white font-medium"
              >
                <Share2 size={18} className="mr-2" />
                Share
              </Button>
              <Button 
                onClick={addToShowcase} 
                className="bg-purple-dark hover:bg-purple-800 text-white font-medium"
              >
                <PlusIcon size={18} className="mr-2" />
                Add to Showcase
              </Button>
              <Button 
                onClick={downloadCanvas} 
                className="bg-purple-dark hover:bg-purple-800 text-white font-medium"
              >
                <Download size={18} className="mr-2" />
                Download
              </Button>
            </ButtonGroup>
          </div>
        )}
      </div>
      
      {/* Color palette popup */}
      {showColorPalette && !isMinimized && (
        <div className="fixed left-16 top-1/4 z-50 bg-black/80 backdrop-blur-md rounded-xl p-4 shadow-xl">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white text-sm font-medium">Palette</div>
            <button 
              className="text-white hover:text-gray-300"
              onClick={() => setShowColorPalette(false)}
            >
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 w-48">
            {colorPalette.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  setActiveColor(color);
                  setShowColorPalette(false);
                }}
                className={`w-6 h-6 rounded-full transition-transform ${activeColor === color ? 'ring-2 ring-white scale-110' : ''}`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Brush settings popup */}
      {showBrushSettings && !isMinimized && (
        <div className="fixed right-4 top-20 z-50 bg-black/80 backdrop-blur-md rounded-xl p-4 shadow-xl w-64">
          <div className="flex justify-between items-center mb-2">
            <div className="text-white text-sm font-medium">Brush Settings</div>
            <button 
              className="text-white hover:text-gray-300"
              onClick={() => setShowBrushSettings(false)}
            >
              <X size={16} />
            </button>
          </div>
          
          <div className="mb-4">
            <div className="text-white text-sm mb-1">Size</div>
            <div className="flex items-center">
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-full accent-blue-500"
              />
              <div className="w-16 h-16 ml-2 bg-transparent rounded-md border border-white/30 flex items-center justify-center">
                <div 
                  className="rounded-full bg-white" 
                  style={{ width: `${brushSize}px`, height: `${brushSize}px` }}
                />
              </div>
            </div>
          </div>
          
          <div>
            <div className="text-white text-sm mb-1">Opacity</div>
            <input
              type="range"
              min="1"
              max="100"
              value={brushOpacity}
              onChange={(e) => setBrushOpacity(parseInt(e.target.value))}
              className="w-full accent-blue-500"
            />
          </div>
        </div>
      )}
      
      {/* Layers panel */}
      {showLayersPanel && !isMinimized && (
        <div className="fixed right-4 top-20 z-50 bg-black/80 backdrop-blur-md rounded-xl p-4 shadow-xl w-64">
          <div className="flex justify-between items-center mb-4">
            <div className="text-white text-sm font-medium">Layers</div>
            <div className="flex items-center">
              <button className="w-6 h-6 flex items-center justify-center bg-white/10 rounded-full text-white mr-2">
                <Plus size={14} />
              </button>
              <button 
                className="text-white hover:text-gray-300"
                onClick={() => setShowLayersPanel(false)}
              >
                <X size={16} />
              </button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-white/10 rounded-md">
              <div className="flex items-center">
                <button className="mr-2 text-white">
                  <Eye size={14} />
                </button>
                <div className="w-10 h-10 bg-transparent border border-white/30 rounded-md"></div>
              </div>
              <div className="text-white text-xs">Layer 1</div>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-red-500/30 rounded-md">
              <div className="flex items-center">
                <button className="mr-2 text-white">
                  <Eye size={14} />
                </button>
                <div className="w-10 h-10 bg-red-300 rounded-md"></div>
              </div>
              <div className="text-white text-xs">Background</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas;