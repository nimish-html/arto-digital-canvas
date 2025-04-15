import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Twitter, Instagram, Share2, Check, Copy } from 'lucide-react';

interface ArtworkPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  canvasDataUrl: string;
  onDownload: (format: 'png' | 'jpg') => void;
}

const ArtworkPreview: React.FC<ArtworkPreviewProps> = ({
  isOpen,
  onClose,
  canvasDataUrl,
  onDownload,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'export'>('preview');
  const [copied, setCopied] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // Close on escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Reset states when dialog opens/closes
  useEffect(() => {
    if (isOpen) {
      setIsImageLoaded(false);
    } else {
      setActiveTab('preview');
      setCopied(false);
    }
  }, [isOpen]);

  // Mock function for social sharing
  const handleShare = (platform: string) => {
    alert(`Sharing to ${platform} is not implemented in this demo.`);
  };

  // Copy image to clipboard
  const copyToClipboard = async () => {
    try {
      if (canvasDataUrl) {
        const blob = await fetch(canvasDataUrl).then(r => r.blob());
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('Failed to copy image: ', err);
      alert('Unable to copy image to clipboard. This feature may not be supported in your browser.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 20 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b dark:border-gray-700 pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Your Artwork</h2>
              <button 
                className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                onClick={onClose}
              >
                <X size={24} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b dark:border-gray-700 mb-4">
              <button
                className={`px-4 py-2 transition-colors ${
                  activeTab === 'preview'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('preview')}
              >
                Preview
              </button>
              <button
                className={`px-4 py-2 transition-colors ${
                  activeTab === 'export'
                    ? 'border-b-2 border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
                onClick={() => setActiveTab('export')}
              >
                Export & Share
              </button>
            </div>

            {/* Preview tab */}
            {activeTab === 'preview' && (
              <div className="flex flex-col items-center justify-center">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-inner relative min-h-[200px] flex items-center justify-center w-full">
                  {!isImageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="spinner"></div>
                    </div>
                  )}
                  <motion.img 
                    src={canvasDataUrl} 
                    alt="Your artwork" 
                    className={`max-h-[60vh] object-contain rounded shadow ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isImageLoaded ? 1 : 0 }}
                    onLoad={() => setIsImageLoaded(true)}
                  />
                </div>
                
                <motion.div 
                  className="mt-4 flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: isImageLoaded ? 1 : 0, y: isImageLoaded ? 0 : 10 }}
                  transition={{ delay: 0.3 }}
                >
                  <button
                    className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                    onClick={copyToClipboard}
                  >
                    {copied ? (
                      <>
                        <Check size={18} className="mr-2 text-green-600 dark:text-green-400" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} className="mr-2" />
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                </motion.div>
              </div>
            )}

            {/* Export tab */}
            {activeTab === 'export' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Download</h3>
                  <div className="flex flex-col space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center px-4 py-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                      onClick={() => onDownload('png')}
                    >
                      <Download size={18} className="mr-2" />
                      Download as PNG
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center px-4 py-3 bg-indigo-600 dark:bg-indigo-700 text-white rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 transition"
                      onClick={() => onDownload('jpg')}
                    >
                      <Download size={18} className="mr-2" />
                      Download as JPG
                    </motion.button>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="text-sm font-medium mb-1 text-gray-600 dark:text-gray-300">Quality Comparison</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                      PNG offers lossless quality but larger file size. JPG is more compressed but may lose some details.
                    </p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 dark:text-gray-100">Share</h3>
                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#1DA1F2] text-white rounded hover:bg-opacity-90 transition"
                      onClick={() => handleShare('Twitter')}
                    >
                      <Twitter size={18} className="mr-2" />
                      Twitter
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-gradient-to-r from-[#405DE6] to-[#E1306C] text-white rounded hover:bg-opacity-90 transition"
                      onClick={() => handleShare('Instagram')}
                    >
                      <Instagram size={18} className="mr-2" />
                      Instagram
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-4 py-2 bg-[#E60023] text-white rounded hover:bg-opacity-90 transition"
                      onClick={() => handleShare('Pinterest')}
                    >
                      <Share2 size={18} className="mr-2" />
                      Pinterest
                    </motion.button>
                  </div>
                  
                  <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h4 className="text-sm font-medium mb-2 dark:text-gray-200">Share with Friends</h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300 mb-3">
                      Want others to see your masterpiece? You can share it directly to social media or copy the image to your clipboard!
                    </p>
                    <button
                      className={`flex items-center px-3 py-2 rounded transition w-full justify-center ${
                        copied 
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400' 
                          : 'bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-500'
                      }`}
                      onClick={copyToClipboard}
                    >
                      {copied ? (
                        <>
                          <Check size={16} className="mr-2" />
                          Copied to clipboard!
                        </>
                      ) : (
                        <>
                          <Copy size={16} className="mr-2" />
                          Copy image to clipboard
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ArtworkPreview;