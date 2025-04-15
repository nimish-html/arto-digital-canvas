import React from 'react';

interface BrushSizeControlProps {
  brushWidth: number;
  onChange: (width: number) => void;
}

const BrushSizeControl: React.FC<BrushSizeControlProps> = ({ brushWidth, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm font-medium">Size:</div>
      <input
        type="range"
        min="1"
        max="30"
        value={brushWidth}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <div className="w-8 text-center">{brushWidth}px</div>
    </div>
  );
};

export default BrushSizeControl;