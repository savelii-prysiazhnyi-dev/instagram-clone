export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  website?: string;
  isVerified?: boolean;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  isFollowing?: boolean;
}

export interface Comment {
  id: string;
  user: {
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  text: string;
  createdAt: string;
  likesCount: number;
  isLiked?: boolean;
}

export interface Post {
  id: string;
  user: {
    id: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  location?: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likesCount: number;
  isLiked: boolean;
  isSaved: boolean;
  comments: Comment[];
}

export interface StoryItem {
  id: string;
  imageUrl: string;
  timestamp: string;
  duration?: number;
}

export interface UserStory {
  userId: string;
  username: string;
  avatar: string;
  hasUnseen: boolean;
  stories: StoryItem[];
}

export interface NotificationItem {
  id: string;
  type: "like" | "comment" | "follow";
  user: {
    username: string;
    avatar: string;
  };
  text: string;
  targetImage?: string;
  createdAt: string;
  isRead: boolean;
}

export type ActiveView =
  "feed" | "profile" | "explore" | "notifications" | "saved";
