import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const DarkModeToggle: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      className="fixed top-14 right-5 z-[9999] bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onClick={toggleDarkMode}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <motion.div
        initial={false}
        animate={{ rotate: isDarkMode ? 180 : 0 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="relative w-6 h-6"
      >
        {isDarkMode ? (
          <Moon className="absolute inset-0 text-indigo-300" />
        ) : (
          <Sun className="absolute inset-0 text-yellow-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default DarkModeToggle;