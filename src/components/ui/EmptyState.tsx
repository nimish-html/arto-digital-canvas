import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, SearchX, FileX, AlertCircle } from 'lucide-react';


interface EmptyStateProps {
  type?: 'search' | 'artworks' | 'error';
  icon?: LucideIcon;
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  type,
  icon: Icon,
  title,
  description,
  action
}) => {
  const getIcon = () => {
    switch (type) {
      case 'search':
        return <SearchX size={48} className="text-gray-400" />;
      case 'artworks':
        return <FileX size={48} className="text-gray-400" />;
      case 'error':
        return <AlertCircle size={48} className="text-red-400" />;
      default:
        return <AlertCircle size={48} className="text-gray-400" />;
    }
  };
  
  const getDefaultTitle = () => {
    switch (type) {
      case 'search':
        return 'No Results Found';
      case 'artworks':
        return 'No Artworks Yet';
      case 'error':
        return 'Something Went Wrong';
      default:
        return 'Nothing to Display';
    }
  };
  
  const getDefaultDescription = () => {
    switch (type) {
      case 'search':
        return 'Try adjusting your search or filters to find what you\'re looking for.';
      case 'artworks':
        return 'Start creating your first artwork to see it here.';
      case 'error':
        return 'An error occurred. Please try again later.';
      default:
        return 'There\'s nothing to display here at the moment.';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 dark:bg-gray-800/50 rounded-lg"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        {Icon ? <Icon size={48} className="text-gray-400" /> : getIcon()}
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">
        {title || getDefaultTitle()}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 max-w-md mb-6">
        {description || getDefaultDescription()}
      </p>
      {action}
    </motion.div>
  );
};

export default EmptyState;