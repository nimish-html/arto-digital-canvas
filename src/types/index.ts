export type DrawingMode = 'pencil' | 'marker' | 'watercolor' | 'neon' | 'pixel' | 'line' | 'rectangle' | 'circle' | 'polygon' | 'select' | 'eraser';

export type SymmetryMode = 'none' | 'horizontal' | 'vertical' | 'quad';

export interface CanvasState {
  drawingMode: DrawingMode;
  color: string;
  brushWidth: number;
  canUndo: boolean;
  canRedo: boolean;
}

export interface BrushStyle {
  name: string;
  icon: string;
  color: string;
  width: number;
  opacity?: number;
  shadowBlur?: number;
  shadowColor?: string;
}

export interface DrawingOptions {
  symmetryMode: SymmetryMode;
  fillShape: boolean;
}

export interface Artwork {
  id: string;
  title: string;
  imageUrl: string;
  createdAt: string;
  userId: string;
  userName: string;
  userAvatar: string;
  likes: number;
  views: number;
  tags: string[];
  description?: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  bio: string;
  totalArtworks: number;
  totalLikes: number;
  following: number;
  followers: number;
  website?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    dribbble?: string;
  };
}

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  title: string;
  desc: string;
  url: string;
  metadata?: any; // For storing additional data about the item
}