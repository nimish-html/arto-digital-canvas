import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  ThumbsUp, 
  Image, 
  Users, 
  MapPin, 
  Link as LinkIcon, 
  Twitter, 
  Instagram, 
  Grid, 
  List, 
  Calendar,
  Edit,
  Settings
} from 'lucide-react';
import Footer from '../components/Footer';
import ArtworkCard from '../components/ui/ArtworkCard';
import EmptyState from '../components/ui/EmptyState';
import { Button } from '../components/ui/button';
import { userArtworks, currentUser } from '../data/mock';
import { formatReadableDate } from '../utils/dateUtils';
import { useNavigate } from 'react-router-dom';
import AnimeNavBarDemo from '../components/ui/AnimeNavBarDemo';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const ProfilePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'artworks' | 'collections' | 'likes'>('artworks');
  const navigate = useNavigate();
  
  // In a real app, you would fetch data based on the selected tab
  const getTabContent = () => {
    switch (activeTab) {
      case 'artworks':
        return userArtworks;
      case 'collections':
        return [];
      case 'likes':
        return [];
      default:
        return userArtworks;
    }
  };
  
  const displayedArtworks = getTabContent();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AnimeNavBarDemo />
      <DarkModeToggle />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-6"
        >
          {/* Cover Photo */}
          <div className="h-48 md:h-64 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-full p-2"
            >
              <Settings size={18} />
            </motion.button>
          </div>
          
          {/* Profile Info */}
          <div className="px-6 py-5 md:px-8 md:py-6 -mt-16 relative">
            <div className="flex flex-col md:flex-row md:items-end">
              {/* Avatar */}
              <div className="mb-4 md:mb-0 md:mr-6">
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name}
                  className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold">{currentUser.name}</h1>
                    <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      Joined {formatReadableDate(currentUser.joinDate)}
                    </div>
                  </div>
                  
                  <div className="flex mt-4 md:mt-0 space-x-2">
                    <Button variant="outline" className="flex items-center">
                      <Edit size={16} className="mr-1" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <Share2 size={16} className="mr-1" />
                      Share
                    </Button>
                  </div>
                </div>
                
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {currentUser.bio}
                </p>
                
                {/* Social Links */}
                <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                  {currentUser.website && (
                    <a 
                      href={currentUser.website}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center hover:text-indigo-600 transition-colors"
                    >
                      <LinkIcon size={14} className="mr-1" />
                      {currentUser.website.replace(/^https?:\/\//, '')}
                    </a>
                  )}
                  
                  {currentUser.social?.twitter && (
                    <a 
                      href={`https://twitter.com/${currentUser.social.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center hover:text-blue-400 transition-colors"
                    >
                      <Twitter size={14} className="mr-1" />
                      {currentUser.social.twitter}
                    </a>
                  )}
                  
                  {currentUser.social?.instagram && (
                    <a 
                      href={`https://instagram.com/${currentUser.social.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer" 
                      className="flex items-center hover:text-pink-600 transition-colors"
                    >
                      <Instagram size={14} className="mr-1" />
                      {currentUser.social.instagram}
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.totalArtworks}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Image size={12} className="mr-1" />
                  Artworks
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.totalLikes}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <ThumbsUp size={12} className="mr-1" />
                  Likes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.followers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Users size={12} className="mr-1" />
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{currentUser.following}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Users size={12} className="mr-1" />
                  Following
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Content Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-gray-200 dark:border-gray-700">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'artworks' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('artworks')}
            >
              Artworks
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'collections' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('collections')}
            >
              Collections
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'likes' 
                  ? 'border-indigo-600 text-indigo-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('likes')}
            >
              Liked
            </button>
          </div>
        </div>
        
        {/* Display Options */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">
            {activeTab === 'artworks' && 'Your Artworks'}
            {activeTab === 'collections' && 'Your Collections'}
            {activeTab === 'likes' && 'Artworks You Like'}
          </h2>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/canvas')}
              className="text-indigo-600"
            >
              Create New
            </Button>
            
            <div className="flex items-center bg-gray-100 dark:bg-gray-700 rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('grid')}
                className={`rounded-l-md ${viewMode === 'grid' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : ''}`}
              >
                <Grid size={16} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode('list')}
                className={`rounded-r-md ${viewMode === 'list' ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300' : ''}`}
              >
                <List size={16} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {displayedArtworks.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                  : 'flex flex-col space-y-4'
              }`}>
                {displayedArtworks.map(artwork => (
                  <ArtworkCard 
                    key={artwork.id} 
                    artwork={artwork} 
                    variant={viewMode} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState 
                type="artworks" 
                title={
                  activeTab === 'artworks' 
                    ? 'No artworks yet' 
                    : activeTab === 'collections' 
                      ? 'No collections yet' 
                      : 'No liked artworks'
                }
                description={
                  activeTab === 'artworks' 
                    ? 'Start creating your first artwork to see it here.' 
                    : activeTab === 'collections' 
                      ? 'Create your first collection by saving artworks you like.' 
                      : 'Like some artworks to see them here.'
                }
                actionText={activeTab === 'artworks' ? 'Create Artwork' : 'Explore Artworks'}
                onAction={() => activeTab === 'artworks' ? navigate('/canvas') : navigate('/showcase')}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;