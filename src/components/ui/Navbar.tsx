import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './button';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/90 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700 px-4 py-3"
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Brand */}
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
        >
          <div className="relative w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm drop-shadow-[0_5px_18px_rgba(0,0,0,0.25)]">
            <motion.div 
              className="absolute w-10 h-10 bg-white rounded-full"
              animate={
                isLogoHovered 
                ? {
                    y: [0, -4, 0],
                    transition: {
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                : {
                    y: [0, -3, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }
                  }
              }
            >
              {/* Eyes */}
              <motion.div 
                className="absolute w-2 h-2 bg-black rounded-full"
                animate={
                  isLogoHovered 
                  ? {
                      scale: 1.5,
                      y: -1
                    }
                  : {
                      scaleY: [1, 0.2, 1],
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.2,
                        times: [0, 0.5, 1],
                        repeatDelay: 2.8,
                        repeat: Infinity
                      }
                    }
                }
                style={{ left: '25%', top: '40%' }}
              />
              <motion.div 
                className="absolute w-2 h-2 bg-black rounded-full"
                animate={
                  isLogoHovered 
                  ? {
                      scale: 1.5,
                      y: -1
                    }
                  : {
                      scaleY: [1, 0.2, 1],
                      scale: 1,
                      y: 0,
                      transition: {
                        duration: 0.2,
                        times: [0, 0.5, 1],
                        repeatDelay: 2.8,
                        repeat: Infinity
                      }
                    }
                }
                style={{ right: '25%', top: '40%' }}
              />
              
              {/* Cheeks */}
              <motion.div 
                className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                animate={{
                  opacity: isLogoHovered ? 0.8 : 0.6
                }}
                style={{ left: '15%', top: '55%' }}
              />
              <motion.div 
                className="absolute w-2 h-1.5 bg-pink-300 rounded-full"
                animate={{
                  opacity: isLogoHovered ? 0.8 : 0.6
                }}
                style={{ right: '15%', top: '55%' }}
              />
              
              {/* Mouth */}
              <motion.div 
                className="absolute w-4 h-2 border-b-2 border-black rounded-full"
                animate={
                  isLogoHovered 
                  ? {
                      scaleY: 1.5,
                      y: -1
                    }
                  : {
                      scaleY: 1,
                      y: 0
                    }
                }
                style={{ left: '30%', top: '60%' }}
              />
              
              {/* Sparkles (only visible on hover) */}
              <AnimatePresence>
                {isLogoHovered && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      className="absolute -top-1 -right-1 w-2 h-2 text-yellow-300"
                    >
                      ✨
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 }}
                      className="absolute -top-2 left-0 w-2 h-2 text-yellow-300"
                    >
                      ✨
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.div>
            
            {/* Chin/bottom part */}
            <motion.div
              className="absolute -bottom-1 left-1/2 w-4 h-4 -translate-x-1/2"
              animate={
                isLogoHovered 
                ? {
                    y: [0, -4, 0],
                    transition: {
                      duration: 0.3,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }
                  }
                : {
                    y: [0, 2, 0],
                    transition: {
                      duration: 1,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }
                  }
              }
            >
              <div className="w-full h-full bg-white rotate-45 transform origin-center" />
            </motion.div>
          </div>
          <img
            src="/Screenshot_2025-04-17_at_6.14.12_PM-removebg-preview.png"
            alt="Arto logo"
            className="h-9"
          />
        </Link>
        
        {/* Auth Buttons with Theme Toggle */}
        <div className="flex items-center space-x-3">
          {/* Dark Mode Toggle */}
          <motion.button
            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-gray-800' : 'bg-white/80 border border-gray-200 shadow'}` }
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
              className="relative w-5 h-5"
            >
              {isDarkMode ? (
                <Moon className="absolute inset-0 text-indigo-300" size={20} />
              ) : (
                <Sun className="absolute inset-0 text-yellow-500" size={20} />
              )}
            </motion.div>
          </motion.button>
          
          <Link to="/canvas">
            <Button 
              variant="outline" 
              className="font-medium text-indigo-800 dark:text-indigo-300 border-indigo-700 dark:border-indigo-800 hover:text-purple-dark dark:hover:text-purple-medium transition-colors"
            >
              Log In
            </Button>
          </Link>
          <Link to="/canvas">
            <Button 
              variant="outline" 
              className="font-medium text-indigo-800 dark:text-indigo-300 border-indigo-700 dark:border-indigo-800 hover:text-purple-dark dark:hover:text-purple-medium transition-colors"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;