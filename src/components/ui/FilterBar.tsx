import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { List, Grid, SlidersHorizontal, ChevronDown, X } from 'lucide-react';
import { Button } from './button';
import { Input } from './input';
import { popularTags } from '../../data/mock';

interface FilterBarProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  selectedTags: string[];
  setSelectedTags: (tags: string[]) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  viewMode,
  setViewMode,
  selectedTags,
  setSelectedTags,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption
}) => {
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setSelectedTags([]);
    setSearchQuery('');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Input
            type="text"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-64"
          />
          
          <div className="hidden md:flex items-center">
            <Button 
              variant={sortOption === 'latest' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortOption('latest')}
              className="text-xs"
            >
              Latest
            </Button>
            <Button 
              variant={sortOption === 'popular' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortOption('popular')}
              className="text-xs"
            >
              Popular
            </Button>
            <Button 
              variant={sortOption === 'trending' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSortOption('trending')}
              className="text-xs"
            >
              Trending
            </Button>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className={`flex items-center ${isFilterExpanded ? 'text-indigo-600' : ''}`}
          >
            <SlidersHorizontal size={16} className="mr-1" />
            Filters
            <ChevronDown size={14} className={`ml-1 transition-transform ${isFilterExpanded ? 'rotate-180' : ''}`} />
          </Button>
          
          <div className="border-l h-6 mx-1 border-gray-200 dark:border-gray-700"></div>
          
          <div className="hidden sm:flex items-center bg-gray-100 dark:bg-gray-700 rounded-md">
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
      
      {isFilterExpanded && (
        <motion.div 
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="text-sm font-medium">Popular Tags:</span>
            {popularTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`text-xs px-3 py-1 rounded-full transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
          
          <div className="md:hidden flex items-center gap-2 mb-3">
            <span className="text-sm font-medium">Sort by:</span>
            <select 
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="text-sm rounded-md border-gray-300 dark:border-gray-700 bg-transparent"
            >
              <option value="latest">Latest</option>
              <option value="popular">Popular</option>
              <option value="trending">Trending</option>
            </select>
          </div>
          
          {(selectedTags.length > 0 || searchQuery) && (
            <div className="flex justify-end">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-xs flex items-center text-red-500 hover:text-red-700"
              >
                <X size={14} className="mr-1" />
                Clear Filters
              </Button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default FilterBar;