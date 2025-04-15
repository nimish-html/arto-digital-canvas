import { Artwork, User } from '../types';

// Mock user data
export const currentUser: User = {
  id: 'user123',
  name: 'Alex Johnson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
  joinDate: '2023-08-15',
  bio: 'Digital artist passionate about exploring new techniques and styles. I love creating vibrant, colorful artworks that tell a story.',
  totalArtworks: 28,
  totalLikes: 143,
  following: 87,
  followers: 112,
  website: 'https://alexjohnson.design',
  social: {
    twitter: '@alexj_art',
    instagram: '@alexj.creates',
    dribbble: 'alexjohnson'
  }
};

// Mock showcase artworks
export const showcaseArtworks: Artwork[] = [
  {
    id: 'art001',
    title: 'Abstract Mindscape',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop',
    createdAt: '2025-04-15T14:30:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 87,
    views: 342,
    tags: ['abstract', 'colorful', 'digital']
  },
  {
    id: 'art002',
    title: 'Coastal Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=2045&auto=format&fit=crop',
    createdAt: '2025-04-12T09:45:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 62,
    views: 215,
    tags: ['landscape', 'ocean', 'digital']
  },
  {
    id: 'art003',
    title: 'Digital Flowers',
    imageUrl: 'https://images.unsplash.com/photo-1579783928621-7a13d66a62b1?q=80&w=2006&auto=format&fit=crop',
    createdAt: '2025-04-10T18:20:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 124,
    views: 432,
    tags: ['floral', 'illustration', 'digital']
  },
  {
    id: 'art004',
    title: 'Geometric Harmony',
    imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop',
    createdAt: '2025-04-08T11:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 76,
    views: 290,
    tags: ['geometric', 'abstract', 'digital']
  },
  {
    id: 'art005',
    title: 'Neon City',
    imageUrl: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?q=80&w=2070&auto=format&fit=crop',
    createdAt: '2025-04-07T20:30:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 98,
    views: 367,
    tags: ['cityscape', 'neon', 'digital']
  },
  {
    id: 'art006',
    title: 'Fluid Expressions',
    imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1979&auto=format&fit=crop',
    createdAt: '2025-04-05T15:40:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 54,
    views: 198,
    tags: ['fluid', 'abstract', 'digital']
  },
  {
    id: 'art007',
    title: 'Serene Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1617391258031-f8d80b22fb37?q=80&w=2070&auto=format&fit=crop',
    createdAt: '2025-04-03T10:20:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 71,
    views: 245,
    tags: ['landscape', 'nature', 'digital']
  },
  {
    id: 'art008',
    title: 'Stellar Visions',
    imageUrl: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1974&auto=format&fit=crop',
    createdAt: '2025-04-01T12:30:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 115,
    views: 390,
    tags: ['space', 'cosmic', 'digital']
  }
];

// Mock user's artwork collection
export const userArtworks: Artwork[] = [
  {
    id: 'user001',
    title: 'Fluid Expressions',
    imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=1979&auto=format&fit=crop',
    createdAt: '2025-04-05T15:40:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 54,
    views: 198,
    tags: ['fluid', 'abstract', 'digital'],
    description: 'An exploration of fluid dynamics and color interactions. Created using watercolor brushes and symmetry tools.'
  },
  {
    id: 'user002',
    title: 'Chromatic Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1974&auto=format&fit=crop',
    createdAt: '2025-03-28T14:15:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 78,
    views: 253,
    tags: ['abstract', 'colorful', 'digital'],
    description: 'A vibrant exploration of color theory and movement.'
  },
  {
    id: 'user003',
    title: 'Digital Sunset',
    imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop',
    createdAt: '2025-03-15T18:30:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 92,
    views: 310,
    tags: ['landscape', 'sunset', 'digital'],
    description: 'Inspired by a beautiful sunset I witnessed last summer. Created using gradient tools and custom brushes.'
  },
  {
    id: 'user004',
    title: 'Geometric Portrait',
    imageUrl: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop',
    createdAt: '2025-03-10T09:45:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 65,
    views: 212,
    tags: ['portrait', 'geometric', 'digital'],
    description: 'An experiment with geometric shapes to create a unique portrait style.'
  },
  {
    id: 'user005',
    title: 'Neon Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?q=80&w=2070&auto=format&fit=crop',
    createdAt: '2025-02-28T22:10:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 104,
    views: 367,
    tags: ['neon', 'abstract', 'digital'],
    description: 'Playing with neon effects and light techniques to create a futuristic atmosphere.'
  },
  {
    id: 'user006',
    title: 'Ocean Depths',
    imageUrl: 'https://images.unsplash.com/photo-1533713692156-f70938dc0d54?q=80&w=1974&auto=format&fit=crop',
    createdAt: '2025-02-15T16:20:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 87,
    views: 298,
    tags: ['underwater', 'blue', 'digital'],
    description: 'Inspired by ocean depths and marine life. Used watercolor brushes with blue tones.'
  }
];

// Popular tags for filtering
export const popularTags = [
  'abstract', 'landscape', 'portrait', 'geometric', 'fluid', 
  'neon', 'nature', 'space', 'colorful', 'minimal'
];