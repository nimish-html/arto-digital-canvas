import React from 'react';
import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-white dark:bg-gray-900 z-50 flex flex-col items-center justify-center"
    >
      <div className="flex items-center mb-4">
        <Palette size={40} className="text-indigo-600 dark:text-indigo-400 mr-3" />
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Arto</h1>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="spinner mb-4"></div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-300"
        >
          Loading your creative canvas...
        </motion.p>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute bottom-6 text-gray-500 dark:text-gray-400 text-sm"
      >
        Made with ❤️ using React, Fabric.js and Framer Motion
      </motion.div>
    </motion.div>
  );
};

export default LoadingOverlay;