import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Footer from '../components/Footer';
import ArtworkCard from '../components/ui/ArtworkCard';
import FilterBar from '../components/ui/FilterBar';
import EmptyState from '../components/ui/EmptyState';
import { showcaseArtworks } from '../data/mock';
import { Artwork } from '../types';
import { useNavigate } from 'react-router-dom';
import AnimeNavBarDemo from '../components/ui/AnimeNavBarDemo';
import DarkModeToggle from '../components/ui/DarkModeToggle';

const ShowcasePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('latest');
  const [filteredArtworks, setFilteredArtworks] = useState<Artwork[]>(showcaseArtworks);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Simulate loading state
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Filter and sort artworks
  useEffect(() => {
    let filtered = [...showcaseArtworks];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(artwork => 
        artwork.title.toLowerCase().includes(query) || 
        artwork.userName.toLowerCase().includes(query) ||
        artwork.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter(artwork => 
        selectedTags.some(tag => artwork.tags.includes(tag))
      );
    }
    
    // Sort artworks
    switch (sortOption) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'trending':
        filtered.sort((a, b) => b.views - a.views);
        break;
      default:
        break;
    }
    
    setFilteredArtworks(filtered);
  }, [searchQuery, selectedTags, sortOption]);
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <AnimeNavBarDemo />
      <DarkModeToggle />
      
      <main className="flex-1 container mx-auto px-4 py-8 mt-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              Artwork Showcase <Sparkles size={20} className="ml-2 text-yellow-500" />
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Discover amazing artworks from talented creators around the world
            </p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => navigate('/canvas')}
          >
            Create Artwork
          </motion.button>
        </motion.div>
        
        <FilterBar
          viewMode={viewMode}
          setViewMode={setViewMode}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-md h-80 animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-xl"></div>
                <div className="p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-8 w-8"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="flex space-x-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredArtworks.length > 0 ? (
          <div className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' 
              : 'flex flex-col space-y-4'
          }`}>
            {filteredArtworks.map(artwork => (
              <ArtworkCard 
                key={artwork.id} 
                artwork={artwork} 
                variant={viewMode} 
              />
            ))}
          </div>
        ) : (
          <EmptyState 
            type="search" 
            title="No artworks found" 
            description="Try adjusting your filters or search query to find more artworks."
            actionText="Clear Filters"
            onAction={() => { setSelectedTags([]); setSearchQuery(''); }}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ShowcasePage;