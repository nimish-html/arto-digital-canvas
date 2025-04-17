import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MediaItem } from '../../types';
import { ShowMoreButton } from './show-more-button';

interface ShowcaseGalleryProps {
  items: MediaItem[];
  title: string;
  description?: string;
}

const ShowcaseGallery: React.FC<ShowcaseGalleryProps> = ({ 
  items, 
  title, 
  description 
}) => {
  // Initial number of items to display
  const [visibleItems, setVisibleItems] = useState<number>(12);
  
  const displayedItems = items.slice(0, visibleItems);
  const hasMoreItems = visibleItems < items.length;
  const padCount = (4 - (displayedItems.length % 4)) % 4;
  const fillerItems: MediaItem[] = Array.from({ length: padCount }).map((_, i) => displayedItems[i % displayedItems.length]);
  
  // Load more items
  const showMoreItems = () => {
    setVisibleItems(prev => Math.min(prev + 12, items.length));
  };
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 text-center">
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent 
                   bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600
                   dark:from-white dark:via-indigo-200 dark:to-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
      >
        {displayedItems.map((item, index) => (
          <motion.div
            key={item.id}
            className="relative overflow-hidden rounded-xl aspect-square"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                  delay: index * 0.03
                }
              }
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            {item.type === 'video' ? (
              <video 
                className="w-full h-full object-cover"
                src={item.url}
                muted 
                loop 
                playsInline
                autoPlay 
              />
            ) : (
              <img 
                src={item.url} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
        {fillerItems.map((item, idx) => (
          <motion.div
            key={`filler-${idx}`}
            className="relative overflow-hidden rounded-xl aspect-square"
            variants={{
              hidden: { y: 50, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
                transition: { type: 'spring', stiffness: 350, damping: 25, delay: (displayedItems.length + idx) * 0.03 }
              }
            }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          >
            <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <h3 className="text-white text-lg font-semibold">{item.title}</h3>
              <p className="text-white/80 text-sm">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Show More Button */}
      {hasMoreItems && (
        <ShowMoreButton
          onClick={showMoreItems}
          className="text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 mt-6"
        />
      )}
    </div>
  );
};

export default ShowcaseGallery;