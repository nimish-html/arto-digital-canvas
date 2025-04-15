import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ToolButtonProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ 
  icon: Icon, 
  label, 
  active = false, 
  disabled = false,
  onClick 
}) => {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.05 }}
      whileTap={disabled ? {} : { scale: 0.95 }}
      className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors tooltip ${
        active 
          ? 'bg-indigo-100 text-indigo-600' 
          : disabled 
            ? 'opacity-40 cursor-not-allowed' 
            : 'hover:bg-gray-100'
      }`}
      onClick={disabled ? undefined : onClick}
      data-tooltip={label}
      disabled={disabled}
    >
      <Icon size={20} />
      <span className="text-xs mt-1 hidden md:block">{label}</span>
    </motion.button>
  );
};

export default ToolButton;