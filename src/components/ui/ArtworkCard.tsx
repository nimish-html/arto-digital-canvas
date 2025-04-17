import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Eye, Share2, MoreHorizontal } from 'lucide-react';
import { Artwork } from '../../types';
import { formatDistanceToNow } from '../../utils/dateUtils';

interface ArtworkCardProps {
  artwork: Artwork;
  variant?: 'grid' | 'list';
  showActions?: boolean;
  showCreator?: boolean;
}

const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  variant = 'grid',
  showActions = true,
  showCreator = true
}) => {
  const timeAgo = formatDistanceToNow(new Date(artwork.createdAt));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={`group overflow-hidden bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all ${
        variant === 'grid' ? 'max-w-sm' : 'w-full flex'
      }`}
    >
      <div className={`relative ${variant === 'list' ? 'w-72 h-40 flex-shrink-0' : 'w-full aspect-square'}`}>
        <Link to={`/artwork/${artwork.id}`}>
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
      
      <div className={`p-4 ${variant === 'list' ? 'flex-1' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          {showCreator && (
            <Link to={`/profile/${artwork.userId}`} className="flex items-center">
              <img 
                src={artwork.userAvatar} 
                alt={artwork.userName}
                className="w-8 h-8 rounded-full mr-2 border border-gray-200"
              />
              <span className="text-sm font-medium">{artwork.userName}</span>
            </Link>
          )}
          <span className="text-xs text-gray-500">{timeAgo}</span>
        </div>
        
        <Link to={`/artwork/${artwork.id}`}>
          <h3 className="text-lg font-semibold mb-1 hover:text-indigo-600 transition-colors">{artwork.title}</h3>
        </Link>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {artwork.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-xs bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
        
        {showActions && (
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <button className="flex items-center text-gray-500 hover:text-red-500 transition-colors">
                <Heart size={16} className="mr-1" />
                <span className="text-xs">{artwork.likes}</span>
              </button>
              <div className="flex items-center text-gray-500">
                <Eye size={16} className="mr-1" />
                <span className="text-xs">{artwork.views}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                <Share2 size={16} />
              </button>
              <button className="p-1 text-gray-500 hover:text-indigo-600 transition-colors">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ArtworkCard;