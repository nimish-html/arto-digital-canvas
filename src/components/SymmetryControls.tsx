import React from 'react';
import { motion } from 'framer-motion';
import { Split, Maximize2, AlignVerticalJustifyCenter, AlignHorizontalJustifyCenter } from 'lucide-react';
import { SymmetryMode } from '../types';

interface SymmetryControlsProps {
  symmetryMode: SymmetryMode;
  onSymmetryChange: (mode: SymmetryMode) => void;
}

const SymmetryControls: React.FC<SymmetryControlsProps> = ({ 
  symmetryMode, 
  onSymmetryChange 
}) => {
  return (
    <div className="flex items-center space-x-2 bg-indigo-50 p-2 rounded-md">
      <span className="text-sm font-medium text-indigo-700 hidden md:inline">Symmetry:</span>
      <div className="flex">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 text-xs rounded-l-md flex flex-col items-center ${
            symmetryMode === 'none' ? 'bg-indigo-200 text-indigo-800' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onSymmetryChange('none')}
          title="No symmetry"
          data-tooltip="No symmetry"
        >
          <Maximize2 size={14} />
          <span className="mt-1 hidden md:inline">None</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 text-xs flex flex-col items-center ${
            symmetryMode === 'horizontal' ? 'bg-indigo-200 text-indigo-800' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onSymmetryChange('horizontal')}
          title="Horizontal symmetry"
          data-tooltip="Horizontal mirror"
        >
          <AlignHorizontalJustifyCenter size={14} />
          <span className="mt-1 hidden md:inline">Horizontal</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 text-xs flex flex-col items-center ${
            symmetryMode === 'vertical' ? 'bg-indigo-200 text-indigo-800' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onSymmetryChange('vertical')}
          title="Vertical symmetry"
          data-tooltip="Vertical mirror"
        >
          <AlignVerticalJustifyCenter size={14} />
          <span className="mt-1 hidden md:inline">Vertical</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2 text-xs rounded-r-md flex flex-col items-center ${
            symmetryMode === 'quad' ? 'bg-indigo-200 text-indigo-800' : 'bg-white hover:bg-gray-100'
          }`}
          onClick={() => onSymmetryChange('quad')}
          title="Quadrant symmetry"
          data-tooltip="Four-way mirror"
        >
          <Split size={14} />
          <span className="mt-1 hidden md:inline">Quad</span>
        </motion.button>
      </div>
    </div>
  );
};

export default SymmetryControls;