import React, { useEffect, useRef, useState } from 'react';
import { fabric } from 'fabric';
import { motion } from 'framer-motion';
import { DrawingMode, SymmetryMode } from '../types';

interface CanvasProps {
  drawingMode: DrawingMode;
  color: string;
  brushWidth: number;
  symmetryMode: SymmetryMode;
  fillShape: boolean;
  onCanvasChange: (canUndo: boolean, canRedo: boolean) => void;
}

const Canvas: React.FC<CanvasProps> = ({ 
  drawingMode, 
  color, 
  brushWidth, 
  symmetryMode, 
  fillShape,
  onCanvasChange 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const historyRef = useRef<fabric.Object[][]>([]);
  const historyIndexRef = useRef<number>(-1);
  const [isDrawing, setIsDrawing] = useState(false);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  const [vertices, setVertices] = useState<fabric.Point[]>([]);
  const [tempPolygon, setTempPolygon] = useState<fabric.Polygon | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: drawingMode === 'pencil' || 
                     drawingMode === 'marker' ||
                     drawingMode === 'watercolor' ||
                     drawingMode === 'neon' ||
                     drawingMode === 'pixel' ||
                     drawingMode === 'eraser',
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: '#ffffff',
    });

    fabricCanvasRef.current = canvas;

    // Save initial state
    saveCanvasState();

    // Setup resize handler
    const handleResize = () => {
      if (!fabricCanvasRef.current) return;
      
      const container = canvasRef.current?.parentElement;
      if (!container) return;
      
      const newWidth = container.clientWidth;
      const newHeight = window.innerHeight * 0.7;
      
      setCanvasSize({ width: newWidth, height: newHeight });
      fabricCanvasRef.current.setDimensions({ width: newWidth, height: newHeight });
      fabricCanvasRef.current.renderAll();
    };

    // Initial size
    handleResize();
    window.addEventListener('resize', handleResize);

    // Handle canvas events to track history
    canvas.on('object:added', saveCanvasState);
    canvas.on('object:modified', saveCanvasState);
    canvas.on('object:removed', saveCanvasState);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Update canvas size
  useEffect(() => {
    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.setDimensions({ width: canvasSize.width, height: canvasSize.height });
      fabricCanvasRef.current.renderAll();
    }
  }, [canvasSize]);

  // Draw horizontal guidelines for symmetry
  useEffect(() => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    
    // Remove existing guides
    canvas.getObjects().forEach(obj => {
      if (obj.data && obj.data.isGuide) {
        canvas.remove(obj);
      }
    });
    
    // Add new guides based on symmetry mode
    if (symmetryMode !== 'none') {
      const centerX = canvas.width! / 2;
      const centerY = canvas.height! / 2;
      
      if (symmetryMode === 'horizontal' || symmetryMode === 'quad') {
        const line = new fabric.Line([0, centerY, canvas.width!, centerY], {
          stroke: '#3B82F6',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          strokeWidth: 1,
          data: { isGuide: true }
        });
        canvas.add(line);
        canvas.bringToFront(line);
      }
      
      if (symmetryMode === 'vertical' || symmetryMode === 'quad') {
        const line = new fabric.Line([centerX, 0, centerX, canvas.height!], {
          stroke: '#3B82F6',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          strokeWidth: 1,
          data: { isGuide: true }
        });
        canvas.add(line);
        canvas.bringToFront(line);
      }
    }
    
    canvas.renderAll();
  }, [symmetryMode, canvasSize]);

  // Update drawing mode
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    
    // Disable drawing mode by default
    canvas.isDrawingMode = false;
    
    // Enable object selection only in select mode
    canvas.selection = drawingMode === 'select';
    canvas.getObjects().forEach(obj => {
      if (!obj.data || !obj.data.isGuide) {
        obj.selectable = drawingMode === 'select';
        obj.evented = drawingMode === 'select';
      }
    });

    // Configure specific drawing modes
    if (drawingMode === 'pencil' || 
        drawingMode === 'marker' ||
        drawingMode === 'watercolor' ||
        drawingMode === 'neon' ||
        drawingMode === 'pixel' ||
        drawingMode === 'eraser') {
      
      canvas.isDrawingMode = true;
      const pencil = canvas.freeDrawingBrush;
      
      // Configure brush based on drawing mode
      if (drawingMode === 'pencil') {
        pencil.color = color;
        pencil.width = brushWidth;
        if (pencil instanceof fabric.PencilBrush) {
          pencil.decimate = 8;
        }
      } else if (drawingMode === 'marker') {
        pencil.color = color;
        pencil.width = brushWidth * 1.5;
        if (pencil instanceof fabric.PencilBrush) {
          pencil.decimate = 4;
        }
      } else if (drawingMode === 'watercolor') {
        pencil.color = color;
        pencil.width = brushWidth * 2;
        pencil.shadow = null;
        
        try {
          // Not all versions of fabric.js support this property
          pencil.opacity = 0.3;
        } catch (e) {
          console.warn('Opacity setting not supported, using transparent color instead');
          pencil.color = fabric.util.colorTransparency ? 
            fabric.util.colorTransparency(color, 0.3) : 
            color + '4D'; // 30% opacity in hex
        }
        
        if (pencil instanceof fabric.PencilBrush) {
          pencil.decimate = 2;
          pencil.strokeLineCap = 'round';
          pencil.strokeLineJoin = 'round';
        }
      } else if (drawingMode === 'neon') {
        pencil.color = color;
        pencil.width = brushWidth;
        if (pencil instanceof fabric.PencilBrush) {
          pencil.shadow = new fabric.Shadow({
            color: color,
            blur: brushWidth * 2
          });
          pencil.decimate = 8;
        }
      } else if (drawingMode === 'pixel') {
        pencil.color = color;
        pencil.width = Math.max(5, Math.floor(brushWidth / 5) * 5); // Snap to 5px increments
        if (pencil instanceof fabric.PencilBrush) {
          pencil.decimate = 15; // Higher value for more pixelated effect
        }
      } else if (drawingMode === 'eraser') {
        pencil.color = '#ffffff'; // Canvas background color
        pencil.width = brushWidth * 2;
        if (pencil instanceof fabric.PencilBrush) {
          // Optional: Use the globalCompositeOperation for eraser effect
          canvas.contextTop.globalCompositeOperation = 'destination-out';
        }
      }
      
      // Setup symmetry for brush drawing
      if (symmetryMode !== 'none') {
        const originalMouseMove = pencil.onMouseMove;
        
        pencil.onMouseMove = function(pointer, options) {
          // Call original brush method first
          originalMouseMove.call(this, pointer, options);
          
          if (!canvas || !options) return;
          
          const centerX = canvas.width! / 2;
          const centerY = canvas.height! / 2;
          const symmetryPointers = [];
          
          // Create symmetry points based on mode
          if (symmetryMode === 'horizontal' || symmetryMode === 'quad') {
            const horizontalMirrorPoint = { x: pointer.x, y: 2 * centerY - pointer.y };
            symmetryPointers.push(horizontalMirrorPoint);
          }
          
          if (symmetryMode === 'vertical' || symmetryMode === 'quad') {
            const verticalMirrorPoint = { x: 2 * centerX - pointer.x, y: pointer.y };
            symmetryPointers.push(verticalMirrorPoint);
          }
          
          if (symmetryMode === 'quad') {
            const diagonalMirrorPoint = { x: 2 * centerX - pointer.x, y: 2 * centerY - pointer.y };
            symmetryPointers.push(diagonalMirrorPoint);
          }
          
          // Draw all symmetry points
          symmetryPointers.forEach(p => {
            this._addPoint(p);
          });
        };
      }
    } else {
      // Reset composition mode when not in eraser mode
      if (canvas.contextTop) {
        canvas.contextTop.globalCompositeOperation = 'source-over';
      }
      
      // Reset polygon drawing state when switching modes
      if (drawingMode !== 'polygon') {
        setVertices([]);
        if (tempPolygon) {
          canvas.remove(tempPolygon);
          setTempPolygon(null);
        }
      }
    }

    canvas.renderAll();
  }, [drawingMode, color, brushWidth, symmetryMode]);

  // Handle mouse interactions for shapes
  useEffect(() => {
    if (!fabricCanvasRef.current || 
        drawingMode === 'pencil' || 
        drawingMode === 'marker' || 
        drawingMode === 'watercolor' || 
        drawingMode === 'neon' || 
        drawingMode === 'pixel' || 
        drawingMode === 'eraser' || 
        drawingMode === 'select' || 
        drawingMode === 'polygon') return;

    const canvas = fabricCanvasRef.current;
    let startPoint: { x: number; y: number } | null = null;
    let activeShape: fabric.Object | null = null;

    const handleMouseDown = (options: fabric.IEvent<MouseEvent>) => {
      if (!canvas || !options.pointer) return;
      
      setIsDrawing(true);
      startPoint = options.pointer;

      // Different shapes based on drawingMode
      if (drawingMode === 'line') {
        activeShape = new fabric.Line(
          [startPoint.x, startPoint.y, startPoint.x, startPoint.y], 
          {
            stroke: color,
            strokeWidth: brushWidth,
            selectable: false,
            evented: false,
          }
        );
      } else if (drawingMode === 'rectangle') {
        activeShape = new fabric.Rect({
          left: startPoint.x,
          top: startPoint.y,
          width: 0,
          height: 0,
          fill: fillShape ? color : 'transparent',
          stroke: color,
          strokeWidth: brushWidth,
          selectable: false,
          evented: false,
        });
      } else if (drawingMode === 'circle') {
        activeShape = new fabric.Circle({
          left: startPoint.x,
          top: startPoint.y,
          radius: 0,
          fill: fillShape ? color : 'transparent',
          stroke: color,
          strokeWidth: brushWidth,
          selectable: false,
          evented: false,
        });
      }

      if (activeShape) {
        canvas.add(activeShape);
        canvas.renderAll();
      }
    };

    const handleMouseMove = (options: fabric.IEvent<MouseEvent>) => {
      if (!isDrawing || !startPoint || !activeShape || !options.pointer) return;

      const currentPoint = options.pointer;

      if (drawingMode === 'line' && activeShape instanceof fabric.Line) {
        activeShape.set({
          x2: currentPoint.x,
          y2: currentPoint.y,
        });
      } else if (drawingMode === 'rectangle' && activeShape instanceof fabric.Rect) {
        const width = currentPoint.x - startPoint.x;
        const height = currentPoint.y - startPoint.y;
        
        if (width > 0) {
          activeShape.set('width', width);
        } else {
          activeShape.set({
            left: currentPoint.x,
            width: Math.abs(width),
          });
        }
        
        if (height > 0) {
          activeShape.set('height', height);
        } else {
          activeShape.set({
            top: currentPoint.y,
            height: Math.abs(height),
          });
        }
      } else if (drawingMode === 'circle' && activeShape instanceof fabric.Circle) {
        const radius = Math.sqrt(
          Math.pow(currentPoint.x - startPoint.x, 2) + 
          Math.pow(currentPoint.y - startPoint.y, 2)
        ) / 2;
        
        const centerX = (startPoint.x + currentPoint.x) / 2;
        const centerY = (startPoint.y + currentPoint.y) / 2;
        
        activeShape.set({
          left: centerX - radius,
          top: centerY - radius,
          radius: radius,
        });
      }

      canvas.renderAll();
    };

    const handleMouseUp = () => {
      setIsDrawing(false);
      startPoint = null;
      
      if (activeShape && symmetryMode !== 'none') {
        applySymmetryToShape(activeShape);
      }
      
      activeShape = null;
      saveCanvasState();
    };

    // Add event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:move', handleMouseMove);
    canvas.on('mouse:up', handleMouseUp);

    return () => {
      // Remove event listeners
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:move', handleMouseMove);
      canvas.off('mouse:up', handleMouseUp);
    };
  }, [drawingMode, color, brushWidth, isDrawing, symmetryMode, fillShape]);
  
  // Handle polygon drawing
  useEffect(() => {
    if (!fabricCanvasRef.current || drawingMode !== 'polygon') return;
    
    const canvas = fabricCanvasRef.current;
    
    const handleMouseDown = (options: fabric.IEvent<MouseEvent>) => {
      if (!options.pointer) return;
      
      const newVertex = new fabric.Point(options.pointer.x, options.pointer.y);
      const updatedVertices = [...vertices, newVertex];
      setVertices(updatedVertices);
      
      // Remove the old preview
      if (tempPolygon) {
        canvas.remove(tempPolygon);
      }
      
      // Create a new polygon with the updated vertices
      if (updatedVertices.length >= 3) {
        const polygonPoints = updatedVertices.map(v => ({x: v.x, y: v.y}));
        const polygon = new fabric.Polygon(polygonPoints, {
          fill: fillShape ? color : 'transparent',
          stroke: color,
          strokeWidth: brushWidth,
          selectable: false,
          evented: false,
        });
        
        setTempPolygon(polygon);
        canvas.add(polygon);
      }
      
      // Add a point marker
      const pointMarker = new fabric.Circle({
        left: newVertex.x - 3,
        top: newVertex.y - 3,
        radius: 3,
        fill: '#ff4081',
        stroke: '#fff',
        strokeWidth: 1,
        selectable: false,
        evented: false,
        data: { isPolygonVertex: true }
      });
      
      canvas.add(pointMarker);
      canvas.renderAll();
    };
    
    const handleDblClick = () => {
      if (vertices.length < 3) return;
      
      // Remove preview polygon
      if (tempPolygon) {
        canvas.remove(tempPolygon);
      }
      
      // Remove all vertex markers
      canvas.getObjects().forEach(obj => {
        if (obj.data && obj.data.isPolygonVertex) {
          canvas.remove(obj);
        }
      });
      
      // Create final polygon
      const polygonPoints = vertices.map(v => ({x: v.x, y: v.y}));
      const finalPolygon = new fabric.Polygon(polygonPoints, {
        fill: fillShape ? color : 'transparent',
        stroke: color,
        strokeWidth: brushWidth,
      });
      
      canvas.add(finalPolygon);
      
      // Apply symmetry if needed
      if (symmetryMode !== 'none') {
        applySymmetryToShape(finalPolygon);
      }
      
      // Reset polygon drawing state
      setVertices([]);
      setTempPolygon(null);
      saveCanvasState();
      
      canvas.renderAll();
    };
    
    // Add event listeners
    canvas.on('mouse:down', handleMouseDown);
    canvas.on('mouse:dblclick', handleDblClick);
    
    return () => {
      // Remove event listeners
      canvas.off('mouse:down', handleMouseDown);
      canvas.off('mouse:dblclick', handleDblClick);
    };
  }, [drawingMode, vertices, tempPolygon, color, brushWidth, fillShape, symmetryMode]);
  
  // Apply symmetry to a given shape
  const applySymmetryToShape = (shape: fabric.Object) => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const centerX = canvas.width! / 2;
    const centerY = canvas.height! / 2;
    
    // Create mirrored copies based on symmetry mode
    if (symmetryMode === 'horizontal' || symmetryMode === 'quad') {
      shape.clone((cloned: fabric.Object) => {
        cloned.set({
          flipY: true,
          top: 2 * centerY - (cloned.top || 0) - (cloned.getScaledHeight() || 0)
        });
        canvas.add(cloned);
      });
    }
    
    if (symmetryMode === 'vertical' || symmetryMode === 'quad') {
      shape.clone((cloned: fabric.Object) => {
        cloned.set({
          flipX: true,
          left: 2 * centerX - (cloned.left || 0) - (cloned.getScaledWidth() || 0)
        });
        canvas.add(cloned);
      });
    }
    
    if (symmetryMode === 'quad') {
      shape.clone((cloned: fabric.Object) => {
        cloned.set({
          flipX: true,
          flipY: true,
          left: 2 * centerX - (cloned.left || 0) - (cloned.getScaledWidth() || 0),
          top: 2 * centerY - (cloned.top || 0) - (cloned.getScaledHeight() || 0)
        });
        canvas.add(cloned);
      });
    }
    
    canvas.renderAll();
  };

  // Save current canvas state to history
  const saveCanvasState = () => {
    if (!fabricCanvasRef.current) return;

    // Clone all objects on the canvas
    const json = fabricCanvasRef.current.toJSON();
    const canvasState = JSON.stringify(json);
    
    // If we're not at the end of the history, remove any future states
    if (historyIndexRef.current < historyRef.current.length - 1) {
      historyRef.current = historyRef.current.slice(0, historyIndexRef.current + 1);
    }
    
    // Add new state to history
    historyRef.current.push(JSON.parse(canvasState).objects);
    historyIndexRef.current = historyRef.current.length - 1;
    
    // Update parent component with undo/redo availability
    onCanvasChange(historyIndexRef.current > 0, historyIndexRef.current < historyRef.current.length - 1);
  };

  // Public methods exposed to parent component
  useEffect(() => {
    if (!fabricCanvasRef.current) return;

    // Expose canvas methods to parent component via ref
    const canvas = fabricCanvasRef.current;

    // Define public methods
    window.clearCanvas = () => {
      canvas.clear();
      saveCanvasState();
      
      // Re-add guides if symmetry is active
      if (symmetryMode !== 'none') {
        const centerX = canvas.width! / 2;
        const centerY = canvas.height! / 2;
        
        if (symmetryMode === 'horizontal' || symmetryMode === 'quad') {
          const line = new fabric.Line([0, centerY, canvas.width!, centerY], {
            stroke: '#3B82F6',
            strokeDashArray: [5, 5],
            selectable: false,
            evented: false,
            strokeWidth: 1,
            data: { isGuide: true }
          });
          canvas.add(line);
        }
        
        if (symmetryMode === 'vertical' || symmetryMode === 'quad') {
          const line = new fabric.Line([centerX, 0, centerX, canvas.height!], {
            stroke: '#3B82F6',
            strokeDashArray: [5, 5],
            selectable: false,
            evented: false,
            strokeWidth: 1,
            data: { isGuide: true }
          });
          canvas.add(line);
        }
      }
    };

    window.downloadCanvas = () => {
      if (!canvas) return;
      
      // Temporarily hide guides for the export
      const guides: fabric.Object[] = [];
      canvas.getObjects().forEach(obj => {
        if (obj.data && obj.data.isGuide) {
          obj.visible = false;
          guides.push(obj);
        }
      });
      
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      
      // Show guides again
      guides.forEach(guide => {
        guide.visible = true;
      });
      canvas.renderAll();
      
      const link = document.createElement('a');
      link.download = 'digital-artwork.png';
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    window.undoCanvas = () => {
      if (historyIndexRef.current <= 0) return;
      
      historyIndexRef.current--;
      loadCanvasState();
    };

    window.redoCanvas = () => {
      if (historyIndexRef.current >= historyRef.current.length - 1) return;
      
      historyIndexRef.current++;
      loadCanvasState();
    };

    window.getCanvasDataURL = () => {
      // Temporarily hide guides for the export
      const guides: fabric.Object[] = [];
      canvas.getObjects().forEach(obj => {
        if (obj.data && obj.data.isGuide) {
          obj.visible = false;
          guides.push(obj);
        }
      });
      
      const dataURL = canvas.toDataURL({
        format: 'png',
        quality: 1,
      });
      
      // Show guides again
      guides.forEach(guide => {
        guide.visible = true;
      });
      canvas.renderAll();
      
      return dataURL;
    };

    window.exportCanvas = (format: 'png' | 'jpg') => {
      if (!canvas) return;
      
      // Temporarily hide guides for the export
      const guides: fabric.Object[] = [];
      canvas.getObjects().forEach(obj => {
        if (obj.data && obj.data.isGuide) {
          obj.visible = false;
          guides.push(obj);
        }
      });
      
      const dataURL = canvas.toDataURL({
        format: format,
        quality: 1,
      });
      
      // Show guides again
      guides.forEach(guide => {
        guide.visible = true;
      });
      canvas.renderAll();
      
      const link = document.createElement('a');
      link.download = `digital-artwork.${format}`;
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }, [symmetryMode]);

  // Load canvas state from history
  const loadCanvasState = () => {
    if (!fabricCanvasRef.current) return;
    
    const canvas = fabricCanvasRef.current;
    const objects = historyRef.current[historyIndexRef.current];
    
    canvas.clear();
    
    if (objects) {
      // Recreate objects from the saved state
      canvas.loadFromJSON({ objects, version: '5.3.0' }, () => {
        canvas.renderAll();
        
        // Update undo/redo buttons state
        onCanvasChange(historyIndexRef.current > 0, historyIndexRef.current < historyRef.current.length - 1);
      });
    }
    
    // Re-add guides if symmetry is active
    if (symmetryMode !== 'none') {
      const centerX = canvas.width! / 2;
      const centerY = canvas.height! / 2;
      
      if (symmetryMode === 'horizontal' || symmetryMode === 'quad') {
        const line = new fabric.Line([0, centerY, canvas.width!, centerY], {
          stroke: '#3B82F6',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          strokeWidth: 1,
          data: { isGuide: true }
        });
        canvas.add(line);
      }
      
      if (symmetryMode === 'vertical' || symmetryMode === 'quad') {
        const line = new fabric.Line([centerX, 0, centerX, canvas.height!], {
          stroke: '#3B82F6',
          strokeDashArray: [5, 5],
          selectable: false,
          evented: false,
          strokeWidth: 1,
          data: { isGuide: true }
        });
        canvas.add(line);
      }
    }
  };

  return (
    <motion.div 
      className="relative bg-white dark:bg-gray-800 shadow-lg p-0 w-full h-full overflow-hidden rounded-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-gradient-to-b from-gray-100 to-white dark:from-gray-750 dark:to-gray-800 h-8 w-full flex items-center px-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 mx-auto">
          arto-canvas.png
        </div>
      </div>
      <canvas ref={canvasRef} className="w-full h-full" />
      {drawingMode === 'polygon' && (
        <div className="absolute bottom-4 left-4 right-4 bg-indigo-100 text-indigo-800 p-2 rounded-md text-sm text-center">
          Click to add points. Double-click to complete the polygon.
        </div>
      )}
    </motion.div>
  );
};

export default Canvas;