import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette } from 'lucide-react';

const LoadingOverlay: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [message, setMessage] = useState<string>("Initializing your creative canvas...");
  
  // Simulate loading progress
  useEffect(() => {
    const messages = [
      "Preparing your digital canvas...",
      "Loading artistic tools...",
      "Setting up color palettes...",
      "Calibrating brushes...",
      "Almost ready to create!"
    ];
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        
        // Update loading message based on progress
        if (newProgress > 85) {
          setMessage("Ready to create magic!");
        } else if (newProgress > 65) {
          setMessage(messages[4]);
        } else if (newProgress > 50) {
          setMessage(messages[3]);
        } else if (newProgress > 30) {
          setMessage(messages[2]);
        } else if (newProgress > 10) {
          setMessage(messages[1]);
        }
        
        return newProgress;
      });
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 z-50 flex flex-col items-center justify-center"
    >
      <div className="flex flex-col items-center">
        {/* Animated Mascot */}
        <motion.div 
          className="relative w-24 h-24 mb-6"
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0] 
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Background glow effect */}
          <motion.div 
            className="absolute inset-1 bg-indigo-400 dark:bg-indigo-600 rounded-full filter blur-xl opacity-60"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Main mascot body */}
          <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center shadow-xl">
            {/* Eyes */}
            <motion.div 
              className="absolute w-4 h-4 bg-black rounded-full"
              animate={{
                scaleY: [1, 0.2, 1],
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut"
                }
              }}
              style={{ left: '25%', top: '40%' }}
            />
            <motion.div 
              className="absolute w-4 h-4 bg-black rounded-full"
              animate={{
                scaleY: [1, 0.2, 1],
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2.5,
                  ease: "easeInOut"
                }
              }}
              style={{ right: '25%', top: '40%' }}
            />
            
            {/* Cheeks */}
            <div 
              className="absolute w-3.5 h-2.5 bg-pink-300 rounded-full opacity-60"
              style={{ left: '15%', top: '55%' }}
            />
            <div 
              className="absolute w-3.5 h-2.5 bg-pink-300 rounded-full opacity-60"
              style={{ right: '15%', top: '55%' }}
            />
            
            {/* Mouth */}
            <motion.div 
              className="absolute w-8 h-3 border-b-2 border-black rounded-full"
              animate={{
                scaleY: [1, 1.5, 1],
                y: [0, -1, 0],
                transition: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              style={{ left: '30%', top: '60%' }}
            />
            
            {/* Sparkles */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                repeatDelay: 1,
                ease: "easeInOut" 
              }}
              className="absolute -top-2 -right-2 w-5 h-5 text-yellow-300"
            >
              ✨
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 0.5,
                delay: 0.7,
                ease: "easeInOut" 
              }}
              className="absolute -top-1 -left-1 w-5 h-5 text-yellow-300"
            >
              ✨
            </motion.div>
          </div>
          
          {/* Chin/bottom part */}
          <motion.div
            className="absolute -bottom-2 left-1/2 w-6 h-6 -translate-x-1/2"
            animate={{
              y: [0, 2, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          >
            <div className="w-full h-full bg-white rotate-45 transform origin-center" />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src="/Screenshot_2025-04-17_at_6.14.12_PM-removebg-preview.png"
            alt="Arto logo"
            className="h-9"
          />
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-300 mb-6 text-center max-w-xs"
        >
          {message}
        </motion.p>
        
        {/* Progress bar */}
        <motion.div 
          className="w-64 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mb-2"
          initial={{ width: 0 }}
          animate={{ width: 256 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        
        <motion.p 
          className="text-xs text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Loading... {Math.round(progress)}%
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute bottom-6 text-gray-500 dark:text-gray-400 text-sm"
        >
          Get ready to unleash your creativity!
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LoadingOverlay;