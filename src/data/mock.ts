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

// Mock showcase artworks - MS Paint style art and simple drawings
export const showcaseArtworks: Artwork[] = [
  // MS Paint style art
  {
    id: 'art001',
    title: 'Geometric Simplicity',
    imageUrl: 'https://images.unsplash.com/photo-1633596683562-4a47eb4983c5?w=800&auto=format&fit=crop',
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
    title: 'Color Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format&fit=crop',
    createdAt: '2025-04-12T09:45:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 62,
    views: 215,
    tags: ['minimal', 'geometric', 'digital']
  },
  {
    id: 'art003',
    title: 'Flat Shapes',
    imageUrl: 'https://images.unsplash.com/photo-1614066882972-c4bd9fca0894?w=800&auto=format&fit=crop',
    createdAt: '2025-04-10T18:20:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 124,
    views: 432,
    tags: ['shapes', 'minimal', 'digital']
  },
  {
    id: 'art004',
    title: 'Basic Geometry',
    imageUrl: 'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?w=800&auto=format&fit=crop',
    createdAt: '2025-04-08T11:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 76,
    views: 290,
    tags: ['geometric', 'simple', 'digital']
  },
  {
    id: 'art005',
    title: 'Primary Colors',
    imageUrl: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format&fit=crop',
    createdAt: '2025-04-07T20:30:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 98,
    views: 367,
    tags: ['colorful', 'blocky', 'digital']
  },
  {
    id: 'art006',
    title: 'Childish Drawing',
    imageUrl: 'https://images.unsplash.com/photo-1617791160505-6f00504e3519?w=800&auto=format&fit=crop',
    createdAt: '2025-04-05T15:40:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 54,
    views: 198,
    tags: ['drawing', 'simple', 'digital']
  },
  {
    id: 'art007',
    title: 'Stick Figures',
    imageUrl: 'https://images.unsplash.com/photo-1595231776515-ddffb1f4eb73?w=800&auto=format&fit=crop',
    createdAt: '2025-04-03T10:20:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 71,
    views: 245,
    tags: ['stick figure', 'sketch', 'digital']
  },
  {
    id: 'art008',
    title: 'Pixel Art',
    imageUrl: 'https://images.unsplash.com/photo-1633525063473-1bf07eb1de57?w=800&auto=format&fit=crop',
    createdAt: '2025-04-01T12:30:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 115,
    views: 390,
    tags: ['pixel', 'retro', 'digital']
  },
  {
    id: 'art009',
    title: 'Simple Lines',
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&auto=format&fit=crop',
    createdAt: '2025-03-28T09:45:00Z',
    userId: 'user901',
    userName: 'Elena Diaz',
    userAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 83,
    views: 312,
    tags: ['lines', 'minimal', 'digital']
  },
  {
    id: 'art010',
    title: 'Bold Strokes',
    imageUrl: 'https://images.unsplash.com/photo-1582201942988-13e60e4556ee?w=800&auto=format&fit=crop',
    createdAt: '2025-03-25T15:30:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 97,
    views: 348,
    tags: ['strokes', 'basic', 'digital']
  },
  {
    id: 'art011',
    title: 'Color Splats',
    imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop',
    createdAt: '2025-03-22T17:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 65,
    views: 211,
    tags: ['splatter', 'colorful', 'digital']
  },
  {
    id: 'art012',
    title: 'Flat Art',
    imageUrl: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&auto=format&fit=crop',
    createdAt: '2025-03-20T11:40:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 118,
    views: 405,
    tags: ['flat', 'simple', 'digital']
  },
  {
    id: 'art013',
    title: 'Digital Scribbles',
    imageUrl: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?w=800&auto=format&fit=crop',
    createdAt: '2025-03-18T14:20:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 89,
    views: 302,
    tags: ['scribble', 'sketch', 'digital']
  },
  {
    id: 'art014',
    title: 'Basic Shapes',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800&auto=format&fit=crop',
    createdAt: '2025-03-16T08:50:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 72,
    views: 258,
    tags: ['shapes', 'basic', 'digital']
  },
  {
    id: 'art015',
    title: 'Cartoon Style',
    imageUrl: 'https://images.unsplash.com/photo-1560850038-f95de6e715b3?w=800&auto=format&fit=crop',
    createdAt: '2025-03-14T19:10:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 104,
    views: 375,
    tags: ['cartoon', 'simple', 'digital']
  },
  {
    id: 'art016',
    title: 'Crude Drawing',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop',
    createdAt: '2025-03-12T10:35:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 91,
    views: 328,
    tags: ['crude', 'drawing', 'digital']
  },
  {
    id: 'art017',
    title: 'MS Paint Masterpiece',
    imageUrl: 'https://images.unsplash.com/photo-1545220270-e8c8bacb810a?w=800&auto=format&fit=crop',
    createdAt: '2025-03-10T16:25:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 79,
    views: 287,
    tags: ['mspaint', 'retro', 'digital']
  },
  {
    id: 'art018',
    title: 'Simple Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800&auto=format&fit=crop',
    createdAt: '2025-03-08T07:55:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 68,
    views: 231,
    tags: ['landscape', 'simple', 'digital']
  },
  {
    id: 'art019',
    title: 'Retro Pixels',
    imageUrl: 'https://images.unsplash.com/photo-1563204337-2b4fa331387c?w=800&auto=format&fit=crop',
    createdAt: '2025-03-06T13:30:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 85,
    views: 315,
    tags: ['pixel', 'retro', 'digital']
  },
  {
    id: 'art020',
    title: 'Basic Doodle',
    imageUrl: 'https://images.unsplash.com/photo-1613156693211-7eeb2107109c?w=800&auto=format&fit=crop',
    createdAt: '2025-03-04T09:15:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 93,
    views: 358,
    tags: ['doodle', 'simple', 'digital']
  },
  {
    id: 'art021',
    title: 'Flat Illustration',
    imageUrl: 'https://images.unsplash.com/photo-1579762593175-20226054cad0?w=800&auto=format&fit=crop',
    createdAt: '2025-03-02T18:40:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 106,
    views: 382,
    tags: ['flat', 'illustration', 'digital']
  },
  {
    id: 'art022',
    title: 'Colorful Blobs',
    imageUrl: 'https://images.unsplash.com/photo-1574169208496-85cca5c343cd?w=800&auto=format&fit=crop',
    createdAt: '2025-02-28T14:20:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 88,
    views: 325,
    tags: ['blob', 'colorful', 'digital']
  },
  {
    id: 'art023',
    title: 'Simple Sun',
    imageUrl: 'https://images.unsplash.com/photo-1584184924103-e310d2dc989b?w=800&auto=format&fit=crop',
    createdAt: '2025-02-26T21:10:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 113,
    views: 397,
    tags: ['sun', 'simple', 'digital']
  },
  {
    id: 'art024',
    title: 'Crayon Style',
    imageUrl: 'https://images.unsplash.com/photo-1579783902595-cee2e87b9e41?w=800&auto=format&fit=crop',
    createdAt: '2025-02-24T11:05:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 75,
    views: 264,
    tags: ['crayon', 'colorful', 'digital']
  },
  {
    id: 'art025',
    title: 'Crude Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1612447392259-67e097a9bfd0?w=800&auto=format&fit=crop',
    createdAt: '2025-02-22T16:50:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 82,
    views: 301,
    tags: ['landscape', 'simple', 'digital']
  },
  {
    id: 'art026',
    title: 'Basic Pattern',
    imageUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop',
    createdAt: '2025-02-20T08:35:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 97,
    views: 345,
    tags: ['pattern', 'simple', 'digital']
  },
  {
    id: 'art027',
    title: 'Squiggly Lines',
    imageUrl: 'https://images.unsplash.com/photo-1581299893039-478d1b5ce775?w=800&auto=format&fit=crop',
    createdAt: '2025-02-18T12:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 71,
    views: 249,
    tags: ['squiggle', 'lines', 'digital']
  },
  {
    id: 'art028',
    title: 'Child-like Drawing',
    imageUrl: 'https://images.unsplash.com/photo-1603203040743-2228be20a94c?w=800&auto=format&fit=crop',
    createdAt: '2025-02-16T19:30:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 89,
    views: 319,
    tags: ['child', 'drawing', 'digital']
  },
  {
    id: 'art029',
    title: 'Basic Icons',
    imageUrl: 'https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?w=800&auto=format&fit=crop',
    createdAt: '2025-02-14T10:40:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 94,
    views: 347,
    tags: ['icons', 'simple', 'digital']
  },
  {
    id: 'art030',
    title: 'Simple House',
    imageUrl: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&auto=format&fit=crop',
    createdAt: '2025-02-12T15:25:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 78,
    views: 286,
    tags: ['house', 'simple', 'digital']
  },
  {
    id: 'art031',
    title: 'Paint Splat',
    imageUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=800&auto=format&fit=crop',
    createdAt: '2025-02-10T22:10:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 117,
    views: 415,
    tags: ['paint', 'splatter', 'digital']
  },
  {
    id: 'art032',
    title: 'Cute Face',
    imageUrl: 'https://images.unsplash.com/photo-1593085512500-5d55148d6f0d?w=800&auto=format&fit=crop',
    createdAt: '2025-02-08T07:55:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 84,
    views: 307,
    tags: ['face', 'cute', 'digital']
  },
  {
    id: 'art033',
    title: 'Block Colors',
    imageUrl: 'https://images.unsplash.com/photo-1603645635960-66172c73f392?w=800&auto=format&fit=crop',
    createdAt: '2025-02-06T13:20:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 95,
    views: 354,
    tags: ['blocks', 'colors', 'digital']
  },
  {
    id: 'art034',
    title: 'Silly Face',
    imageUrl: 'https://images.unsplash.com/photo-1602330041000-4b8394a25a5a?w=800&auto=format&fit=crop',
    createdAt: '2025-02-04T09:40:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 76,
    views: 273,
    tags: ['face', 'silly', 'digital']
  },
  {
    id: 'art035',
    title: 'Rainbow Swirl',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
    createdAt: '2025-02-02T20:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 88,
    views: 321,
    tags: ['rainbow', 'swirl', 'digital']
  },
  {
    id: 'art036',
    title: 'Flat Icons',
    imageUrl: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800&auto=format&fit=crop',
    createdAt: '2025-01-30T11:35:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 103,
    views: 374,
    tags: ['icons', 'flat', 'digital']
  },
  {
    id: 'art037',
    title: 'Simple Circles',
    imageUrl: 'https://images.unsplash.com/photo-1605106702734-205df224ecce?w=800&auto=format&fit=crop',
    createdAt: '2025-01-28T17:50:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 92,
    views: 337,
    tags: ['circles', 'simple', 'digital']
  },
  {
    id: 'art038',
    title: 'Bold Lines',
    imageUrl: 'https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&auto=format&fit=crop',
    createdAt: '2025-01-26T08:25:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 81,
    views: 298,
    tags: ['lines', 'bold', 'digital']
  },
  {
    id: 'art039',
    title: 'Crude Map',
    imageUrl: 'https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?w=800&auto=format&fit=crop',
    createdAt: '2025-01-24T19:10:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 109,
    views: 384,
    tags: ['map', 'crude', 'digital']
  },
  {
    id: 'art040',
    title: 'Simple Waves',
    imageUrl: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800&auto=format&fit=crop',
    createdAt: '2025-01-22T13:45:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 87,
    views: 312,
    tags: ['waves', 'simple', 'digital']
  },
  {
    id: 'art041',
    title: 'Blocky Patterns',
    imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?w=800&auto=format&fit=crop',
    createdAt: '2025-01-20T10:30:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 96,
    views: 348,
    tags: ['blocks', 'pattern', 'digital']
  },
  {
    id: 'art042',
    title: 'Basic Smile',
    imageUrl: 'https://images.unsplash.com/photo-1580893246395-52aead8960dc?w=800&auto=format&fit=crop',
    createdAt: '2025-01-18T16:20:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 93,
    views: 335,
    tags: ['smile', 'simple', 'digital']
  },
  {
    id: 'art043',
    title: 'Flat Squares',
    imageUrl: 'https://images.unsplash.com/photo-1577017040065-650ee4d43339?w=800&auto=format&fit=crop',
    createdAt: '2025-01-16T09:15:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 86,
    views: 311,
    tags: ['squares', 'flat', 'digital']
  },
  {
    id: 'art044',
    title: 'Simplistic Horizon',
    imageUrl: 'https://images.unsplash.com/photo-1585415422534-b9c0e7b5f0e1?w=800&auto=format&fit=crop',
    createdAt: '2025-01-14T14:50:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 86,
    views: 306,
    tags: ['horizon', 'simple', 'digital']
  },
  {
    id: 'art045',
    title: 'Pastel Squares',
    imageUrl: 'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?w=800&auto=format&fit=crop',
    createdAt: '2025-01-12T18:30:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 101,
    views: 364,
    tags: ['pastel', 'squares', 'digital']
  },
  {
    id: 'art046',
    title: 'Flat Shapes',
    imageUrl: 'https://images.unsplash.com/photo-1603110502252-3748308015da?w=800&auto=format&fit=crop',
    createdAt: '2025-01-10T11:40:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 79,
    views: 283,
    tags: ['flat', 'shapes', 'digital']
  },
  {
    id: 'art047',
    title: 'Draw of Dots',
    imageUrl: 'https://images.unsplash.com/photo-1601513237663-0ca4299578de?w=800&auto=format&fit=crop',
    createdAt: '2025-01-08T21:15:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 115,
    views: 405,
    tags: ['dots', 'pattern', 'digital']
  },
  {
    id: 'art048',
    title: 'Simple Patterns',
    imageUrl: 'https://images.unsplash.com/photo-1574068468668-a05a11f871da?w=800&auto=format&fit=crop',
    createdAt: '2025-01-06T12:30:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 90,
    views: 329,
    tags: ['pattern', 'simple', 'digital']
  },
  {
    id: 'art049',
    title: 'Geometric Experiment',
    imageUrl: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=800&auto=format&fit=crop',
    createdAt: '2025-01-04T17:45:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 98,
    views: 358,
    tags: ['geometric', 'experimental', 'digital']
  },
  {
    id: 'art050',
    title: 'MS Paint Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1612536057832-2ff7ead58194?w=800&auto=format&fit=crop',
    createdAt: '2025-01-02T09:10:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 84,
    views: 302,
    tags: ['landscape', 'mspaint', 'digital']
  },
  {
    id: 'art051',
    title: 'Color Study',
    imageUrl: 'https://images.unsplash.com/photo-1608501857571-21aafa48831d?w=800&auto=format&fit=crop',
    createdAt: '2024-12-30T15:20:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 77,
    views: 271,
    tags: ['colors', 'study', 'digital']
  },
  {
    id: 'art052',
    title: 'Basic Squiggles',
    imageUrl: 'https://images.unsplash.com/photo-1608501078713-8e445a709b39?w=800&auto=format&fit=crop',
    createdAt: '2024-12-28T10:45:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 94,
    views: 342,
    tags: ['squiggles', 'simple', 'digital']
  },
  {
    id: 'art053',
    title: 'Flat Mountain',
    imageUrl: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=800&auto=format&fit=crop',
    createdAt: '2024-12-26T13:35:00Z',
    userId: 'user890',
    userName: 'Lily Zhang',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 87,
    views: 316,
    tags: ['mountain', 'flat', 'digital']
  },
  {
    id: 'art054',
    title: 'Digital Circles',
    imageUrl: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?w=800&auto=format&fit=crop',
    createdAt: '2024-12-24T07:50:00Z',
    userId: 'user345',
    userName: 'Emma Thompson',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 75,
    views: 263,
    tags: ['circles', 'digital', 'simple']
  },
  {
    id: 'art055',
    title: 'Basic Shapes Art',
    imageUrl: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&auto=format&fit=crop',
    createdAt: '2024-12-22T20:15:00Z',
    userId: 'user678',
    userName: 'Michael Brown',
    userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 107,
    views: 379,
    tags: ['shapes', 'basic', 'digital']
  },
  {
    id: 'art056',
    title: 'MS Paint Sky',
    imageUrl: 'https://images.unsplash.com/photo-1558470598-a5dda9640f68?w=800&auto=format&fit=crop',
    createdAt: '2024-12-20T16:40:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 92,
    views: 335,
    tags: ['sky', 'mspaint', 'digital']
  },
  {
    id: 'art057',
    title: 'Simple Doodles',
    imageUrl: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=800&auto=format&fit=crop',
    createdAt: '2024-12-18T09:25:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 89,
    views: 323,
    tags: ['doodle', 'simple', 'digital']
  },
  {
    id: 'art058',
    title: 'Neon Blocks',
    imageUrl: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=800&auto=format&fit=crop',
    createdAt: '2024-12-16T14:10:00Z',
    userId: 'user123',
    userName: 'Alex Johnson',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 86,
    views: 311,
    tags: ['neon', 'blocks', 'digital']
  },
  {
    id: 'art059',
    title: 'Digital Squares',
    imageUrl: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?w=800&auto=format&fit=crop',
    createdAt: '2024-12-14T11:30:00Z',
    userId: 'user567',
    userName: 'James Wilson',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 81,
    views: 289,
    tags: ['squares', 'digital', 'simple']
  },
  {
    id: 'art060',
    title: 'Colorful Pixels',
    imageUrl: 'https://images.unsplash.com/photo-1633525063473-1bf07eb1de57?w=800&auto=format&fit=crop',
    createdAt: '2024-12-12T18:45:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 97,
    views: 352,
    tags: ['pixel', 'colorful', 'digital']
  }
];

// Mock user's artwork collection
// Mock liked artworks
export const likedArtworks: Artwork[] = [
  {
    id: 'liked001',
    title: 'Abstract Dreams',
    imageUrl: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&auto=format&fit=crop',
    createdAt: '2025-04-10T15:30:00Z',
    userId: 'user789',
    userName: 'David Park',
    userAvatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 245,
    views: 892,
    tags: ['abstract', 'colorful', 'digital']
  },
  {
    id: 'liked002',
    title: 'Digital Landscape',
    imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
    createdAt: '2025-04-08T09:15:00Z',
    userId: 'user456',
    userName: 'Maya Chen',
    userAvatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 189,
    views: 654,
    tags: ['landscape', 'digital', 'colorful']
  },
  {
    id: 'liked003',
    title: 'Neon Lights',
    imageUrl: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&auto=format&fit=crop',
    createdAt: '2025-04-05T18:45:00Z',
    userId: 'user234',
    userName: 'Sara Lee',
    userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&q=80&crop=faces&fit=crop',
    likes: 312,
    views: 1023,
    tags: ['neon', 'night', 'digital']
  }
];

// Mock collections
export const userCollections = [
  {
    id: 'col001',
    name: 'Favorite Abstracts',
    description: 'A collection of my favorite abstract digital artworks',
    coverImage: 'https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800&auto=format&fit=crop',
    artworkCount: 15
  },
  {
    id: 'col002',
    name: 'Digital Landscapes',
    description: 'Beautiful digital landscape art',
    coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&auto=format&fit=crop',
    artworkCount: 8
  },
  {
    id: 'col003',
    name: 'Neon Dreams',
    description: 'Vibrant neon-themed digital art',
    coverImage: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=800&auto=format&fit=crop',
    artworkCount: 12
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

// Sample video URLs for variety
export const sampleVideoUrls = [
  "https://player.vimeo.com/external/314181352.sd.mp4?s=d239cd8fa1769be409e912d5da2eda33d74f1e59&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/progressive_redirect/playback/697718184/rendition/1080p/file.mp4?loc=external&oauth2_token_id=57447761&signature=ddc5b94c78ec27df1abcfcaad4dc229155a5fcb4769e59d8e310133cf3deb4c7",
  "https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4992e3de824114c5c2aa19d82&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/503969045.sd.mp4?s=6a79187319ca7c40fcb371358b60b0aa4c0f489b&profile_id=164&oauth2_token_id=57447761",
  "https://player.vimeo.com/external/371907331.sd.mp4?s=3ca6c3a0b4b72d2a626af75e368fd6eef69e6ff0&profile_id=164&oauth2_token_id=57447761",
  "https://cdn.pixabay.com/video/2024/07/24/222837_large.mp4",
  "https://cdn.pixabay.com/video/2020/07/30/46026-447087782_large.mp4",
  "https://cdn.pixabay.com/video/2020/05/25/40130-424930032_large.mp4"
];

// Popular tags for filtering
export const popularTags = [
  'abstract', 'landscape', 'portrait', 'geometric', 'fluid', 
  'neon', 'nature', 'space', 'colorful', 'minimal',
  'mspaint', 'flat', 'simple', 'pixel', 'blocky',
  'doodle', 'sketch', 'cartoon', 'basic', 'pattern'
];