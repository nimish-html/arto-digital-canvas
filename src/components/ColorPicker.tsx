import React, { useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { motion, AnimatePresence } from 'framer-motion';

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
  isOpen: boolean;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange, isOpen }) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  
  // Close picker when clicking outside
  useEffect(() => {
    if (!isOpen) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        // Close only if clicking outside picker
        if ((e.target as HTMLElement).closest('.color-picker-container') === null) {
          isOpen && document.removeEventListener('mousedown', handleClickOutside);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  // Common color presets
  const colorPresets = [
    '#000000', '#FFFFFF', '#FF0000', '#00FF00', '#0000FF', 
    '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080'
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={pickerRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute z-10 mt-2 bg-white p-3 rounded-lg shadow-lg"
          style={{ width: 'min-content' }}
        >
          <HexColorPicker color={color} onChange={onChange} />
          
          <div className="mt-3 grid grid-cols-5 gap-1">
            {colorPresets.map((preset) => (
              <button
                key={preset}
                className="w-6 h-6 rounded-sm cursor-pointer border border-gray-300 transition-transform hover:scale-110"
                style={{ backgroundColor: preset }}
                onClick={() => onChange(preset)}
                aria-label={`Select color ${preset}`}
              />
            ))}
          </div>
          
          <div className="mt-3 flex items-center">
            <span className="text-xs text-gray-500 mr-2">HEX</span>
            <input
              type="text"
              value={color}
              onChange={(e) => onChange(e.target.value)}
              className="p-1 text-sm border border-gray-300 rounded w-full"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPicker;