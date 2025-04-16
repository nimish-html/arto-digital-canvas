import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  ThumbsUp, 
  Image, 
  Users, 
  Link as LinkIcon, 
  Twitter, 
  Instagram, 
  Grid, 
  List, 
  Calendar,
  Edit,
  Plus,
  BarChart
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
import CursorAnimation from '../components/CursorAnimation';
import ContributionsGraph from '../components/ui/ContributionsGraph';
import { generateContributionData } from '../utils/generateContributionData';
import ErrorBoundary from '../components/ui/ErrorBoundary';

const ProfilePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [activeTab, setActiveTab] = useState<'artworks' | 'collections' | 'likes'>('artworks');
  const [contributionData, setContributionData] = useState<any>({});
  const navigate = useNavigate();
  
  // Generate mock contributions data when component mounts
  useEffect(() => {
    try {
      setContributionData(generateContributionData());
    } catch (error) {
      console.error("Error generating contribution data:", error);
      setContributionData({});
    }
  }, []);
  
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 relative overflow-hidden flex flex-col">
      <CursorAnimation />
      
      <AnimeNavBarDemo />
      <DarkModeToggle />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md overflow-hidden mb-8 border border-indigo-100 dark:border-gray-700"
        >
          {/* Profile Info */}
          <div className="px-6 py-6 md:px-8 md:py-8 relative">
            <div className="flex flex-col md:flex-row md:items-center">
              {/* Avatar */}
              <div className="mb-4 md:mb-0 md:mr-6 flex-shrink-0">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-24 h-24 rounded-full border-4 border-white dark:border-gray-800 shadow-lg object-cover"
                  />
                </motion.div>
              </div>
              
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                      {currentUser.name}
                    </h1>
                    <div className="flex items-center mt-1 text-gray-500 dark:text-gray-400 text-sm">
                      <Calendar size={14} className="mr-1" />
                      Joined {formatReadableDate(currentUser.joinDate)}
                    </div>
                  </div>
                  
                  <div className="flex mt-4 md:mt-0 space-x-2">
                    <Button variant="outline" className="flex items-center border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600">
                      <Edit size={16} className="mr-1 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-indigo-600 dark:text-indigo-400">Edit Profile</span>
                    </Button>
                    <Button variant="outline" className="flex items-center border border-indigo-200 dark:border-indigo-800 hover:border-indigo-400 dark:hover:border-indigo-600">
                      <Share2 size={16} className="mr-1 text-indigo-600 dark:text-indigo-400" />
                      <span className="text-indigo-600 dark:text-indigo-400">Share</span>
                    </Button>
                  </div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-gray-600 dark:text-gray-300"
                >
                  {currentUser.bio}
                </motion.p>
                
                {/* Social Links */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-gray-400"
                >
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
                </motion.div>
              </div>
            </div>
            
            {/* Stats */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-indigo-100 dark:border-gray-700"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser.totalArtworks}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Image size={12} className="mr-1" />
                  Artworks
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser.totalLikes}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <ThumbsUp size={12} className="mr-1" />
                  Likes
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser.followers}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Users size={12} className="mr-1" />
                  Followers
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{currentUser.following}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                  <Users size={12} className="mr-1" />
                  Following
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Contribution Graph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-md p-4 md:p-6 mb-8 border border-indigo-100 dark:border-gray-700"
        >
          <div className="flex items-center mb-2">
            <BarChart className="mr-2 h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">102 Contributions in 2025</h2>
          </div>
          
          <ErrorBoundary
            fallback={
              <div className="p-4 text-center">
                <p className="text-amber-600 dark:text-amber-400">Unable to load contribution graph</p>
              </div>
            }
          >
            <ContributionsGraph data={contributionData} />
          </ErrorBoundary>
          
          <div className="mt-4 pt-4 border-t border-indigo-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
            <p>
              Track your digital art creation activity. Each box represents a day — the darker the color, the more artworks created.
            </p>
            <p className="mt-1 text-xs">
              Pro Tip: Create art regularly to maintain your streaks and improve your skills!
            </p>
          </div>
        </motion.div>
        
        {/* Content Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-indigo-100 dark:border-gray-700">
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'artworks' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('artworks')}
            >
              Artworks
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'collections' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('collections')}
            >
              Collections
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm border-b-2 transition-colors ${
                activeTab === 'likes' 
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400' 
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
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
            {activeTab === 'artworks' && 'Your Artworks'}
            {activeTab === 'collections' && 'Your Collections'}
            {activeTab === 'likes' && 'Artworks You Like'}
          </h2>
          
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 px-3 py-1.5 rounded-full"
              onClick={() => navigate('/canvas')}
            >
              <Plus size={16} className="mr-1" />
              Create New
            </motion.button>
            
            <div className="flex items-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-md shadow-sm border border-indigo-100 dark:border-gray-700">
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
                {displayedArtworks.map((artwork, index) => (
                  <motion.div
                    key={artwork.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.05,
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  >
                    <ArtworkCard 
                      artwork={artwork} 
                      variant={viewMode} 
                    />
                  </motion.div>
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
      
      {/* Decorative elements */}
      <div className="pointer-events-none fixed w-[500px] h-[500px] -bottom-64 -left-64 bg-indigo-600/10 rounded-full blur-3xl z-0" />
      <div className="pointer-events-none fixed w-[400px] h-[400px] -top-32 -right-32 bg-purple-600/10 rounded-full blur-3xl z-0" />
      
      <Footer />
    </div>
  );
};

export default ProfilePage;