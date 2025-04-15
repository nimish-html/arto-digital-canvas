import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Pencil, 
  MousePointer, 
  Circle, 
  Square, 
  Hexagon,
  Minus, 
  Trash2, 
  Download, 
  Undo, 
  Redo, 
  Palette, 
  Droplet, 
  Wand2, 
  Grid, 
  Eraser,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import ToolButton from './ToolButton';
import ColorPicker from './ColorPicker';
import BrushSizeControl from './BrushSizeControl';
import SymmetryControls from './SymmetryControls';
import { DrawingMode, SymmetryMode } from '../types';

interface ToolbarProps {
  drawingMode: DrawingMode;
  setDrawingMode: (mode: DrawingMode) => void;
  color: string;
  setColor: (color: string) => void;
  brushWidth: number;
  setBrushWidth: (width: number) => void;
  symmetryMode: SymmetryMode;
  setSymmetryMode: (mode: SymmetryMode) => void;
  fillShape: boolean;
  setFillShape: (fill: boolean) => void;
  clearCanvas: () => void;
  downloadCanvas: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

const Toolbar: React.FC<ToolbarProps> = ({
  drawingMode,
  setDrawingMode,
  color,
  setColor,
  brushWidth,
  setBrushWidth,
  symmetryMode,
  setSymmetryMode,
  fillShape,
  setFillShape,
  clearCanvas,
  downloadCanvas,
  undo,
  redo,
  canUndo,
  canRedo,
}) => {
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [activeBrushCategory, setActiveBrushCategory] = useState<'draw' | 'shape' | 'effects' | 'advanced'>('draw');
  const [showAdvancedOptions, setShowAdvancedOptions] = useState<boolean>(false);
  const [toolbarCollapsed, setToolbarCollapsed] = useState<boolean>(false);

  // Toolbar animation variants
  const toolbarVariants = {
    expanded: { height: 'auto', opacity: 1 },
    collapsed: { height: '60px', opacity: 1 }
  };

  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-4 overflow-hidden"
      layout
    >
      <div className="flex justify-between items-center mb-2">
        {/* Brush Category Tabs */}
        <div className="flex justify-center tool-category-tabs">
          <button
            className={`px-2 md:px-4 py-1 rounded-t-lg transition-colors mx-1 text-sm ${
              activeBrushCategory === 'draw' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveBrushCategory('draw')}
          >
            Brushes
          </button>
          <button
            className={`px-2 md:px-4 py-1 rounded-t-lg transition-colors mx-1 text-sm ${
              activeBrushCategory === 'shape' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveBrushCategory('shape')}
          >
            Shapes
          </button>
          <button
            className={`px-2 md:px-4 py-1 rounded-t-lg transition-colors mx-1 text-sm ${
              activeBrushCategory === 'effects' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveBrushCategory('effects')}
          >
            Effects
          </button>
          <button
            className={`px-2 md:px-4 py-1 rounded-t-lg transition-colors mx-1 text-sm ${
              activeBrushCategory === 'advanced' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
            onClick={() => setActiveBrushCategory('advanced')}
          >
            Advanced
          </button>
        </div>
        
        {/* Collapse button for mobile */}
        <button 
          className="md:hidden text-gray-500 dark:text-gray-400"
          onClick={() => setToolbarCollapsed(!toolbarCollapsed)}
        >
          {toolbarCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
        </button>
      </div>
      
      <motion.div
        variants={toolbarVariants}
        initial="expanded"
        animate={toolbarCollapsed ? "collapsed" : "expanded"}
        className={`flex flex-wrap items-center gap-2 toolbar-container ${toolbarCollapsed ? "hidden md:flex" : ""}`}
      >
        {/* Drawing Tools */}
        <div className="flex flex-wrap justify-center md:justify-start space-x-1 mr-2 md:mr-4">
          {activeBrushCategory === 'draw' && (
            <>
              <ToolButton
                icon={MousePointer}
                label="Select"
                active={drawingMode === 'select'}
                onClick={() => setDrawingMode('select')}
              />
              <ToolButton
                icon={Pencil}
                label="Pencil"
                active={drawingMode === 'pencil'}
                onClick={() => setDrawingMode('pencil')}
              />
              <ToolButton
                icon={Palette}
                label="Marker"
                active={drawingMode === 'marker'}
                onClick={() => setDrawingMode('marker')}
              />
              <ToolButton
                icon={Eraser}
                label="Eraser"
                active={drawingMode === 'eraser'}
                onClick={() => setDrawingMode('eraser')}
              />
            </>
          )}

          {activeBrushCategory === 'shape' && (
            <>
              <ToolButton
                icon={Minus}
                label="Line"
                active={drawingMode === 'line'}
                onClick={() => setDrawingMode('line')}
              />
              <ToolButton
                icon={Square}
                label="Rectangle"
                active={drawingMode === 'rectangle'}
                onClick={() => setDrawingMode('rectangle')}
              />
              <ToolButton
                icon={Circle}
                label="Circle"
                active={drawingMode === 'circle'}
                onClick={() => setDrawingMode('circle')}
              />
              <ToolButton
                icon={Hexagon}
                label="Polygon"
                active={drawingMode === 'polygon'}
                onClick={() => setDrawingMode('polygon')}
              />
              <div className="flex items-center ml-2">
                <label className="inline-flex items-center cursor-pointer">
                  <span className="text-xs text-gray-700 dark:text-gray-300 mr-2">Fill</span>
                  <div 
                    className="relative cursor-pointer"
                    onClick={() => setFillShape(!fillShape)}
                  >
                    {fillShape ? (
                      <ToggleRight className="text-indigo-600 dark:text-indigo-400" size={20} />
                    ) : (
                      <ToggleLeft className="text-gray-400 dark:text-gray-500" size={20} />
                    )}
                  </div>
                </label>
              </div>
            </>
          )}

          {activeBrushCategory === 'effects' && (
            <>
              <ToolButton
                icon={Droplet}
                label="Watercolor"
                active={drawingMode === 'watercolor'}
                onClick={() => setDrawingMode('watercolor')}
              />
              <ToolButton
                icon={Wand2}
                label="Neon"
                active={drawingMode === 'neon'}
                onClick={() => setDrawingMode('neon')}
              />
              <ToolButton
                icon={Grid}
                label="Pixel"
                active={drawingMode === 'pixel'}
                onClick={() => setDrawingMode('pixel')}
              />
            </>
          )}
          
          {activeBrushCategory === 'advanced' && (
            <div className="flex items-center">
              <SymmetryControls
                symmetryMode={symmetryMode}
                onSymmetryChange={setSymmetryMode}
              />
            </div>
          )}
        </div>

        {activeBrushCategory !== 'advanced' && (
          <>
            <div className="relative mx-2 md:mx-4 color-picker-container">
              <div
                className="w-8 h-8 rounded-md cursor-pointer border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: color }}
                onClick={() => setIsColorPickerOpen(!isColorPickerOpen)}
              />
              <ColorPicker 
                color={color} 
                onChange={setColor} 
                isOpen={isColorPickerOpen} 
              />
            </div>

            <div className="mx-2 md:mx-4 flex-grow md:flex-grow-0">
              <BrushSizeControl brushWidth={brushWidth} onChange={setBrushWidth} />
            </div>
          </>
        )}

        <div className="flex flex-wrap justify-center md:justify-end space-x-1 mt-2 md:mt-0 md:ml-auto">
          <ToolButton
            icon={Undo}
            label="Undo"
            onClick={undo}
            disabled={!canUndo}
          />
          <ToolButton
            icon={Redo}
            label="Redo"
            onClick={redo}
            disabled={!canRedo}
          />
          <ToolButton
            icon={Trash2}
            label="Clear"
            onClick={clearCanvas}
          />
          <ToolButton
            icon={Download}
            label="Save"
            onClick={downloadCanvas}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Toolbar;