"use client";

import { cn } from "../../lib/utils";
import { ScrollArea } from "./scroll-area";
import { motion } from "framer-motion";
import {
  ChevronsUpDown,
  Pencil,
  Palette,
  Square,
  Circle,
  Hexagon,
  Minus,
  Eraser,
  MousePointer,
  Wand2,
  Droplet,
  Grid,
  Save,
  Download,
  Undo,
  Redo,
  Trash2,
  Eye,
  Settings,
  LogOut,
  SplitSquareVertical,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback } from "./avatar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";
import { Separator } from "./separator";
import { DrawingMode, SymmetryMode } from "../../types";
import { HexColorPicker } from "react-colorful";

const sidebarVariants = {
  open: {
    width: "16rem",
  },
  closed: {
    width: "3.05rem",
  },
};

const contentVariants = {
  open: { display: "block", opacity: 1 },
  closed: { display: "block", opacity: 1 },
};

const variants = {
  open: {
    x: 0,
    opacity: 1,
    transition: {
      x: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    x: -20,
    opacity: 0,
    transition: {
      x: { stiffness: 100 },
    },
  },
};

const transitionProps = {
  type: "tween",
  ease: "easeOut",
  duration: 0.2,
  staggerChildren: 0.1,
};

const staggerVariants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.02 },
  },
};

// Define section types for the accordion
type SectionType = 'basic' | 'shapes' | 'effects' | 'symmetry' | 'color' | 'size' | null;

interface SidebarSectionProps {
  title: string;
  icon?: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const SidebarSection: React.FC<SidebarSectionProps> = ({ 
  title, 
  icon,
  isOpen, 
  onToggle, 
  isCollapsed, 
  children 
}) => {
  return (
    <div className="mb-1">
      <div 
        className="flex items-center justify-between px-2 py-1.5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        onClick={onToggle}
      >
        <div className="flex items-center">
          {isOpen ? 
            <ChevronDown className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" /> : 
            <ChevronRight className="h-3.5 w-3.5 mr-1.5 text-gray-500 dark:text-gray-400" />
          }
          {!isCollapsed && (
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-300">{title}</span>
          )}
        </div>
      </div>
      
      {isOpen && (
        <motion.div 
          className="mt-1 pl-2"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
};

interface CanvasSidebarProps {
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
  openPreview: () => void;
}

export function CanvasSidebar({
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
  openPreview
}: CanvasSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('basic');
  const location = useLocation();
  
  // Function to toggle a section - closes other sections when one is opened
  const toggleSection = (section: SectionType) => {
    if (activeSection === section) {
      setActiveSection(null);
    } else {
      setActiveSection(section);
    }
  };
  
  // Define the drawing tools
  const drawingTools = [
    { 
      name: 'Select', 
      icon: MousePointer, 
      mode: 'select' as DrawingMode,
      category: 'basic'
    },
    { 
      name: 'Pencil', 
      icon: Pencil, 
      mode: 'pencil' as DrawingMode,
      category: 'basic'
    },
    { 
      name: 'Marker', 
      icon: Palette, 
      mode: 'marker' as DrawingMode,
      category: 'basic'
    },
    { 
      name: 'Eraser', 
      icon: Eraser, 
      mode: 'eraser' as DrawingMode,
      category: 'basic'
    },
    { 
      name: 'Line', 
      icon: Minus, 
      mode: 'line' as DrawingMode,
      category: 'shape'
    },
    { 
      name: 'Rectangle', 
      icon: Square, 
      mode: 'rectangle' as DrawingMode,
      category: 'shape'
    },
    { 
      name: 'Circle', 
      icon: Circle, 
      mode: 'circle' as DrawingMode,
      category: 'shape'
    },
    { 
      name: 'Polygon', 
      icon: Hexagon, 
      mode: 'polygon' as DrawingMode,
      category: 'shape'
    },
    { 
      name: 'Watercolor', 
      icon: Droplet, 
      mode: 'watercolor' as DrawingMode,
      category: 'effect'
    },
    { 
      name: 'Neon', 
      icon: Wand2, 
      mode: 'neon' as DrawingMode,
      category: 'effect'
    },
    { 
      name: 'Pixel', 
      icon: Grid, 
      mode: 'pixel' as DrawingMode,
      category: 'effect'
    }
  ];

  // Define the symmetry options
  const symmetryOptions = [
    { name: 'None', mode: 'none' as SymmetryMode },
    { name: 'Horizontal', mode: 'horizontal' as SymmetryMode },
    { name: 'Vertical', mode: 'vertical' as SymmetryMode },
    { name: 'Quad', mode: 'quad' as SymmetryMode }
  ];

  return (
    <motion.div
      className={cn(
        "sidebar fixed left-0 z-40 h-full shrink-0 border-r fixed bg-white dark:bg-gray-800"
      )}
      initial={isCollapsed ? "closed" : "open"}
      animate={isCollapsed ? "closed" : "open"}
      variants={sidebarVariants}
      transition={transitionProps}
      onClick={() => setIsCollapsed(!isCollapsed)} // Toggle on click
    >
      <motion.div
        className={`relative z-40 flex text-muted-foreground h-full shrink-0 flex-col bg-white dark:bg-gray-800 transition-all`}
        variants={contentVariants}
      >
        <motion.ul variants={staggerVariants} className="flex h-full flex-col">
          <div className="flex grow flex-col items-center">
            <div className="flex h-[54px] w-full shrink-0 border-b p-2">
              <div className="mt-[1.5px] flex w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex w-fit items-center gap-2 px-2" 
                >
                  <Avatar className='rounded size-8'>
                    <AvatarFallback className="bg-indigo-600 text-white">A</AvatarFallback>
                  </Avatar>
                  <motion.li
                    variants={variants}
                    className="flex w-fit items-center gap-2"
                  >
                    {!isCollapsed && (
                      <>
                        <p className="text-sm font-medium">
                          Arto Canvas
                        </p>
                        <ChevronsUpDown className="h-4 w-4 text-muted-foreground/50" />
                      </>
                    )}
                  </motion.li>
                </Button>
              </div>
            </div>

            <div className="flex h-full w-full flex-col">
              <div className="flex grow flex-col">
                <ScrollArea className="h-16 grow p-2">
                  <div className={cn("flex w-full flex-col")}>
                    {/* Basic Drawing Tools Section */}
                    <SidebarSection 
                      title="Drawing Tools" 
                      isOpen={activeSection === 'basic'} 
                      onToggle={() => toggleSection('basic')}
                      isCollapsed={isCollapsed}
                    >
                      {drawingTools
                        .filter(tool => tool.category === 'basic')
                        .map((tool) => (
                          <div
                            key={tool.name}
                            className={cn(
                              "flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 mb-1 transition hover:bg-gray-100 dark:hover:bg-gray-700",
                              drawingMode === tool.mode && "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawingMode(tool.mode);
                            }}
                          >
                            <tool.icon className="h-4 w-4" />
                            <motion.li variants={variants}>
                              {!isCollapsed && (
                                <p className="ml-2 text-sm font-medium">{tool.name}</p>
                              )}
                            </motion.li>
                          </div>
                        ))}
                    </SidebarSection>

                    {/* Shapes Section */}
                    <SidebarSection 
                      title="Shapes" 
                      isOpen={activeSection === 'shapes'} 
                      onToggle={() => toggleSection('shapes')}
                      isCollapsed={isCollapsed}
                    >
                      {drawingTools
                        .filter(tool => tool.category === 'shape')
                        .map((tool) => (
                          <div
                            key={tool.name}
                            className={cn(
                              "flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 mb-1 transition hover:bg-gray-100 dark:hover:bg-gray-700",
                              drawingMode === tool.mode && "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawingMode(tool.mode);
                            }}
                          >
                            <tool.icon className="h-4 w-4" />
                            <motion.li variants={variants}>
                              {!isCollapsed && (
                                <p className="ml-2 text-sm font-medium">{tool.name}</p>
                              )}
                            </motion.li>
                          </div>
                        ))}
                      
                      {/* Fill Shape Toggle */}
                      {!isCollapsed && (
                        <div className="flex items-center justify-between mt-2 px-2 mb-1">
                          <span className="text-sm">Fill Shapes</span>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setFillShape(!fillShape);
                            }}
                            className={`relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                              fillShape ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                            }`}
                          >
                            <span 
                              className={`inline-block h-3 w-3 translate-x-0.5 rounded-full bg-white transition-transform ${
                                fillShape ? 'translate-x-4' : ''
                              }`}
                            />
                          </button>
                        </div>
                      )}
                    </SidebarSection>

                    {/* Effects Section */}
                    <SidebarSection 
                      title="Effects" 
                      isOpen={activeSection === 'effects'} 
                      onToggle={() => toggleSection('effects')}
                      isCollapsed={isCollapsed}
                    >
                      {drawingTools
                        .filter(tool => tool.category === 'effect')
                        .map((tool) => (
                          <div
                            key={tool.name}
                            className={cn(
                              "flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 mb-1 transition hover:bg-gray-100 dark:hover:bg-gray-700",
                              drawingMode === tool.mode && "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                            )}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDrawingMode(tool.mode);
                            }}
                          >
                            <tool.icon className="h-4 w-4" />
                            <motion.li variants={variants}>
                              {!isCollapsed && (
                                <p className="ml-2 text-sm font-medium">{tool.name}</p>
                              )}
                            </motion.li>
                          </div>
                        ))}
                    </SidebarSection>

                    {/* Symmetry Section */}
                    <SidebarSection 
                      title="Symmetry" 
                      isOpen={activeSection === 'symmetry'} 
                      onToggle={() => toggleSection('symmetry')}
                      isCollapsed={isCollapsed}
                    >
                      {symmetryOptions.map((option) => (
                        <div
                          key={option.name}
                          className={cn(
                            "flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 mb-1 transition hover:bg-gray-100 dark:hover:bg-gray-700",
                            symmetryMode === option.mode && "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300"
                          )}
                          onClick={() => setSymmetryMode(option.mode)}
                        >
                          <SplitSquareVertical className="h-4 w-4" />
                          <motion.li variants={variants}>
                            {!isCollapsed && (
                              <p className="ml-2 text-sm font-medium">{option.name}</p>
                            )}
                          </motion.li>
                        </div>
                      ))}
                    </SidebarSection>

                    {/* Color Picker Section */}
                    {!isCollapsed && (
                      <SidebarSection 
                        title="Color" 
                        isOpen={activeSection === 'color'} 
                        onToggle={() => toggleSection('color')}
                        isCollapsed={isCollapsed}
                      >
                        <div className="px-2 flex flex-col gap-2 mb-2">
                          <div 
                            className="w-full h-6 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                            style={{ backgroundColor: color }}
                            onClick={(e) => e.stopPropagation()}
                          ></div>
                          <HexColorPicker 
                            color={color} 
                            onChange={setColor}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full"
                          />
                        </div>
                      </SidebarSection>
                    )}

                    {/* Brush Size Section */}
                    {!isCollapsed && (
                      <SidebarSection 
                        title="Brush Size" 
                        isOpen={activeSection === 'size'} 
                        onToggle={() => toggleSection('size')}
                        isCollapsed={isCollapsed}
                      >
                        <div className="px-2 mb-2">
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                            {brushWidth}px
                          </div>
                          <input
                            type="range"
                            min="1"
                            max="30"
                            value={brushWidth}
                            onChange={(e) => setBrushWidth(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      </SidebarSection>
                    )}
                  </div>
                </ScrollArea>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col p-2 gap-1 mt-auto border-t">
                <div
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canUndo) undo();
                  }}
                >
                  <Undo className={`h-4 w-4 ${!canUndo ? 'opacity-50' : ''}`} />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className={`ml-2 text-sm font-medium ${!canUndo ? 'opacity-50' : ''}`}>Undo</p>
                    )}
                  </motion.li>
                </div>

                <div
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (canRedo) redo();
                  }}
                >
                  <Redo className={`h-4 w-4 ${!canRedo ? 'opacity-50' : ''}`} />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className={`ml-2 text-sm font-medium ${!canRedo ? 'opacity-50' : ''}`}>Redo</p>
                    )}
                  </motion.li>
                </div>

                <div
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearCanvas();
                  }}
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium text-red-500">Clear Canvas</p>
                    )}
                  </motion.li>
                </div>

                <div
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    openPreview();
                  }}
                >
                  <Eye className="h-4 w-4 text-indigo-600" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium text-indigo-600">Preview</p>
                    )}
                  </motion.li>
                </div>

                <div
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    downloadCanvas();
                  }}
                >
                  <Save className="h-4 w-4 text-green-600" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium text-green-600">Save</p>
                    )}
                  </motion.li>
                </div>

                <Link
                  to="/"
                  className="flex h-8 w-full cursor-pointer flex-row items-center rounded-md px-2 py-1.5 mt-2 transition hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={(e) => e.stopPropagation()}
                >
                  <LogOut className="h-4 w-4" />
                  <motion.li variants={variants}>
                    {!isCollapsed && (
                      <p className="ml-2 text-sm font-medium">Back to Home</p>
                    )}
                  </motion.li>
                </Link>
              </div>
            </div>
          </div>
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}