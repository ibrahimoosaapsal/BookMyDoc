export interface ThemeSate {
  mode: boolean;
}

export interface LikeState {
  likeList: wallData[];
  likeLoading: boolean;
}

export interface wallData {
  id: string;
  name: string; // e.g., "Beautiful Mountain Sunset"
  category: string[]; // Reference to categories._id
  subcategory: string[]; // Reference to subcategories._id
  colors: string[]; // Array of color IDs, references colors._id
  imageUrl: string; // URL to the wallpaper image
  // thumbnailUrl: thumbnailUrl, // URL to the thumbnail image for faster loading
  downloads: number; // Count of downloads
  //favorites: 'Number', // Count of times marked as favorite
  createdAt: string;
}

export interface RootState {
  theme: ThemeSate;
  like: LikeState;
}
