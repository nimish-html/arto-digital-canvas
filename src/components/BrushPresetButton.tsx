import React from 'react';
import { motion } from 'framer-motion';
import { BrushStyle } from '../types';

interface BrushPresetButtonProps {
  preset: BrushStyle;
  active: boolean;
  onClick: () => void;
}

const BrushPresetButton: React.FC<BrushPresetButtonProps> = ({ preset, active, onClick }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      className={`relative flex items-center justify-center p-2 rounded-lg transition-colors ${
        active ? 'bg-indigo-100 border-2 border-indigo-300' : 'border-2 border-transparent hover:bg-gray-100'
      }`}
      onClick={onClick}
      title={preset.name}
    >
      <div 
        className="w-6 h-6 rounded-full" 
        style={{ 
          backgroundColor: preset.color,
          boxShadow: preset.shadowBlur ? `0 0 ${preset.shadowBlur}px ${preset.shadowColor || preset.color}` : 'none',
          opacity: preset.opacity || 1
        }}
      />
      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-medium">
        {preset.name}
      </div>
    </motion.button>
  );
};

export default BrushPresetButton;