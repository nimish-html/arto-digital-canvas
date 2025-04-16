import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  loading: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  loading,
  children
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          loadMore();
        }
      },
      {
        rootMargin: '0px 0px 300px 0px',
        threshold: 0.1
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [hasMore, loading, loadMore]);

  return (
    <div className="w-full">
      {children}
      
      <div ref={observerRef} className="w-full h-24 flex items-center justify-center">
        {loading && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="w-10 h-10 border-4 border-indigo-100 dark:border-indigo-900 border-t-indigo-600 dark:border-t-indigo-400 rounded-full animate-spin mb-2"></div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Loading more amazing artworks...</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;