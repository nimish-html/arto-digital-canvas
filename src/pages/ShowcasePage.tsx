import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import PageNavbar from '../components/ui/PageNavbar';
import { MediaItem } from '../types';
import ShowcaseGallery from '../components/ui/ShowcaseGallery';
import ArtworkModal, { ArtworkData } from '../components/ui/ArtworkModal';

// Curated MS Paint style and digital art platform artworks
const artworkImages = [
  {
    id: 'art1',
    url: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format&fit=crop',
    title: 'Colorful Geometry',
    creator: 'David Park',
    description: 'Digital painting with vibrant colors',
    likes: 243,
    impressions: 1872,
    createdAt: '2024-12-15'
  },
  {
    id: 'art2',
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    title: 'Digital Sunset',
    creator: 'Alex Johnson',
    description: 'MS Paint inspired landscape',
    likes: 189,
    impressions: 1254,
    createdAt: '2025-01-05'
  },
  {
    id: 'art3',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
    title: 'Gradient Waves',
    creator: 'Elena Diaz',
    description: 'Smooth gradient art reminiscent of MS Paint',
    likes: 312,
    impressions: 2145,
    createdAt: '2025-02-18'
  },
  {
    id: 'art4',
    url: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop',
    title: 'Colorful Splash',
    creator: 'Michael Brown',
    description: 'Digital paint splatter technique',
    likes: 156,
    impressions: 987,
    createdAt: '2025-03-10'
  },
  {
    id: 'art6',
    url: 'https://images.unsplash.com/photo-1533713692156-f70938dc0d54?q=80&w=1974&auto=format&fit=crop',
    title: 'Ocean Depths',
    creator: 'Emma Thompson',
    description: 'Digital painting with blue tones',
    likes: 278,
    impressions: 1532,
    createdAt: '2025-01-22'
  },
  {
    id: 'art7',
    url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',
    title: 'Abstract Squares',
    creator: 'Sara Lee',
    description: 'MS Paint style geometric composition',
    likes: 195,
    impressions: 1087,
    createdAt: '2025-02-05'
  },
  {
    id: 'art8',
    url: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2070&auto=format&fit=crop',
    title: 'Neon Dreams',
    creator: 'James Wilson',
    description: 'Digital painting with neon effects',
    likes: 342,
    impressions: 2356,
    createdAt: '2024-12-28'
  },
  {
    id: 'art9',
    url: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=800&auto=format&fit=crop',
    title: 'Digital Sky',
    creator: 'Alex Johnson',
    description: 'MS Paint style sky scene'
  },
  {
    id: 'art10',
    url: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800&auto=format&fit=crop',
    title: 'Pastel Composition',
    creator: 'Michael Brown',
    description: 'Digital painting with pastel colors'
  },
  {
    id: 'art12',
    url: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format&fit=crop',
    title: 'Geometric Study',
    creator: 'Olivia Martinez',
    description: 'Inspired by digital painting fundamentals'
  },
  {
    id: 'art13',
    url: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
    title: 'Geometric Poster',
    creator: 'Emma Thompson',
    description: 'MS Paint inspired digital poster'
  },
  {
    id: 'art15',
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    title: 'Evening Horizon',
    creator: 'Chris Lee',
    description: 'Digital landscape with evening colors'
  },
  // Additional artworks for demonstrating "Show more" functionality
  {
    id: 'art16',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1974&auto=format&fit=crop',
    title: 'Chromatic Dreams',
    creator: 'Alex Johnson',
    description: 'Vibrant exploration of color theory'
  },
  {
    id: 'art17',
    url: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1979&auto=format&fit=crop',
    title: 'Fluid Expressions',
    creator: 'Maya Chen',
    description: 'Abstract fluid art created digitally'
  },
  {
    id: 'art18',
    url: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=800&auto=format&fit=crop',
    title: 'Simple House',
    creator: 'Emma Thompson',
    description: 'Minimalist digital drawing'
  },
  {
    id: 'art19',
    url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    title: 'Block Colors',
    creator: 'David Park',
    description: 'Study of block color composition'
  },
  {
    id: 'art20',
    url: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=800&auto=format&fit=crop',
    title: 'Flat Squares',
    creator: 'James Wilson',
    description: 'Geometric exploration in digital space'
  },
  {
    id: 'art21',
    url: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&auto=format&fit=crop',
    title: 'Digital Circles',
    creator: 'Sara Lee',
    description: 'Circular compositions in digital art'
  },
  {
    id: 'art22',
    url: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop',
    title: 'Squiggly Lines',
    creator: 'Michael Brown',
    description: 'Expressive line work in digital format'
  },
  {
    id: 'art23',
    url: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=800&auto=format&fit=crop',
    title: 'Basic Pattern',
    creator: 'Alex Johnson',
    description: 'Simple repeating patterns'
  },
  {
    id: 'art24',
    url: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800&auto=format&fit=crop',
    title: 'Cute Face',
    creator: 'Maya Chen',
    description: 'Digital character design'
  }
];

const ShowcasePage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState<ArtworkData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Load all data at once
  useEffect(() => {
    const timer = setTimeout(() => {
      const items: MediaItem[] = artworkImages.map((image): MediaItem => ({
        id: image.id,
        type: 'image',
        title: image.title,
        desc: `By ${image.creator} • ${image.description}`,
        url: image.url,
        metadata: image, // Store the original artwork data for modal
      }));
      
      setGalleryItems(items);
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle opening the modal when an artwork is clicked
  const handleArtworkClick = (item: MediaItem) => {
    const artworkData = item.metadata as ArtworkData;
    setSelectedArtwork(artworkData);
    setIsModalOpen(true);
  };
  
  // Handle closing the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col">
      <PageNavbar />
      
      <main className="flex-1 mt-20">
        <ShowcaseGallery
          items={galleryItems}
          title="Digital Art Showcase"
          description="Explore our curated collection from our top and rising artists"
          onItemClick={handleArtworkClick}
        />
        
        {/* Artwork Modal */}
        <ArtworkModal
          artwork={selectedArtwork}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </main>
      
      <Footer />
    </div>
  );
};

export default ShowcasePage;