import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, User } from 'lucide-react';
import { Button } from './button';

// Define the structure for artwork data
export interface ArtworkData {
  id: string;
  url: string;
  title: string;
  creator: string;
  description: string;
  likes?: number;
  impressions?: number;
  createdAt?: string;
}

interface ArtworkModalProps {
  artwork: ArtworkData | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkModal: React.FC<ArtworkModalProps> = ({ artwork, isOpen, onClose }) => {
  if (!artwork || !isOpen) return null;
  
  // State to track if the artwork is liked
  const [isLiked, setIsLiked] = React.useState(false);
  // State to track if the button is hovered
  const [isButtonHovered, setIsButtonHovered] = React.useState(false);
  
  // Handle like button click
  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };
  
  // Handle backdrop click to close modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking directly on the backdrop
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - clicking this will close the modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30
            }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8"
            onClick={handleBackdropClick}
          >
            <div 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl overflow-hidden w-full max-w-3xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/20 hover:bg-black/30 text-white z-10 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col md:flex-row h-full">
                {/* Image container */}
                <div className="relative w-full md:w-2/3 h-64 md:h-auto bg-gray-100 dark:bg-gray-900">
                  <img 
                    src={artwork.url} 
                    alt={artwork.title} 
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content container */}
                <div className="w-full md:w-1/3 p-6 flex flex-col overflow-y-auto">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {artwork.title}
                  </h2>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mr-2">
                      <User className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      By <span className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">{artwork.creator}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {artwork.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {artwork.likes || 0}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Likes</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                        {artwork.impressions || 0}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Views</span>
                    </div>
                  </div>
                  
                  <div className="mt-auto flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className={`flex items-center space-x-1 flex-1 ${isLiked ? 'border-red-500 text-red-500 hover:bg-transparent' : ''}`}
                      onClick={handleLikeClick}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      <Heart 
                        className={`w-4 h-4 transition-colors ${isLiked || isButtonHovered ? 'text-red-500 fill-red-500' : ''}`} 
                      />
                      <span className={`transition-colors ${isLiked ? 'text-red-500' : isButtonHovered ? 'text-gray-800 dark:text-gray-200' : ''}`}>Like</span>
                    </Button>
                    
                    <Button 
                      variant="default" 
                      size="sm"
                      className="flex-1"
                    >
                      View Artist
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ArtworkModal;
