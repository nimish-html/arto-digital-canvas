import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import PageNavbar from '../components/ui/PageNavbar';
import InteractiveBentoGallery from '../components/ui/InteractiveBentoGallery';
import { showcaseArtworks, sampleVideoUrls } from '../data/mock';
import { Artwork, MediaItem } from '../types';

// Map artwork to gallery item 
const mapArtworkToGalleryItem = (artwork: Artwork, index: number): MediaItem => {
  let span;
  
  // Create different span sizes for a visually interesting bento grid
  switch (index % 7) {
    case 0:
      span = "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-1 row-span-1";
      break;
    case 1:
      span = "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-1 row-span-1";
      break;
    case 2:
      span = "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-1 row-span-1";
      break;
    case 3:
      span = "md:col-span-1 md:row-span-2 sm:col-span-2 sm:row-span-1 row-span-1";
      break;
    case 4:
      span = "md:col-span-2 md:row-span-1 sm:col-span-2 sm:row-span-1 row-span-1";
      break;
    case 5:
      span = "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2 row-span-1";
      break;
    case 6:
      span = "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 row-span-1";
      break;
    default:
      span = "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-1 row-span-1";
  }
  
  return {
    id: artwork.id,
    type: "image", // All our mock data are images for now
    title: artwork.title,
    desc: `By ${artwork.userName} • ${artwork.likes} likes • ${artwork.views} views`,
    url: artwork.imageUrl,
    span
  };
};

const ShowcasePage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Load initial data
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialItems = showcaseArtworks.slice(0, 12).map((artwork, index) => {
        // Mix in some video items for variety
        if (index % 8 === 2) {
          return {
            id: `video-${artwork.id}`,
            type: "video",
            title: artwork.title,
            desc: `By ${artwork.userName} • Video showcase`,
            url: sampleVideoUrls[index % sampleVideoUrls.length],
            span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2 row-span-1"
          };
        }
        return mapArtworkToGalleryItem(artwork, index);
      });
      
      setGalleryItems(initialItems);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Load more items on scroll
  const loadMoreItems = useCallback(() => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    // Simulate loading more data
    setTimeout(() => {
      // Calculate the start index for the next batch
      const startIndex = (page * 12) % showcaseArtworks.length;
      
      // Get the next batch of artwork data
      const nextBatch = showcaseArtworks.slice(startIndex, startIndex + 12);
      
      // If we've wrapped around and there aren't enough items, get some from the beginning
      const itemsNeeded = 12 - nextBatch.length;
      const additionalItems = itemsNeeded > 0 ? showcaseArtworks.slice(0, itemsNeeded) : [];
      
      // Combine the next batch with any additional items needed
      const artworksToAdd = [...nextBatch, ...additionalItems];
      
      // Generate more items by mapping artwork data to gallery items
      const moreItems = artworksToAdd.map((artwork, index) => {
        const adjustedIndex = startIndex + index;
        
        // Mix in a video occasionally
        if (adjustedIndex % 10 === 3) {
          return {
            id: `video-${artwork.id}-${page}`,
            type: "video",
            title: `${artwork.title} (Edition ${page})`,
            desc: `By ${artwork.userName} • Video showcase`,
            url: sampleVideoUrls[(page + index) % sampleVideoUrls.length],
            span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2 row-span-1"
          };
        }
        
        return {
          ...mapArtworkToGalleryItem(artwork, adjustedIndex),
          id: `${artwork.id}-${page}-${index}`,
          title: `${artwork.title} (Edition ${page})`,
        };
      });
      
      setGalleryItems(prev => [...prev, ...moreItems]);
      setPage(prev => prev + 1);
      
      // After page 6, we'll say there's no more data (since we have 60 original artworks)
      if (page >= 6) {
        setHasMore(false);
      }
      
      setIsLoading(false);
    }, 1000);
  }, [page, isLoading]);
  
  if (isLoading && page === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
        <PageNavbar />
        
        <main className="flex-1 container mx-auto px-4 py-8 mt-20">
          <div className="flex justify-center items-center h-full">
            <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          </div>
        </main>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <PageNavbar />
      
      <main className="flex-1 mt-20">
        <InteractiveBentoGallery
          mediaItems={galleryItems}
          title="Digital Art Showcase"
          description="Explore our vibrant collection of digital artworks"
          onLoadMore={loadMoreItems}
          hasMore={hasMore}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ShowcasePage;