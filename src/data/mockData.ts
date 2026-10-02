import { User, Post, UserStory, NotificationItem } from "../types";

export const currentUser: User = {
  id: "current-user-1",
  username: "alex.rivera",
  fullName: "Alex Rivera",
  avatar:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  bio: "Software engineer & digital creator 🚀\nExploring minimal design, photography & web tech.\n📍 San Francisco, CA",
  website: "https://alexrivera.dev",
  isVerified: true,
  postsCount: 24,
  followersCount: 14200,
  followingCount: 482,
};

export const initialStories: UserStory[] = [
  {
    userId: "user-1",
    username: "sophia.lens",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    hasUnseen: true,
    stories: [
      {
        id: "s1-1",
        imageUrl:
          "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        timestamp: "2h",
      },
      {
        id: "s1-2",
        imageUrl:
          "https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80",
        timestamp: "1h",
      },
    ],
  },
  {
    userId: "user-2",
    username: "marcus_nord",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    hasUnseen: true,
    stories: [
      {
        id: "s2-1",
        imageUrl:
          "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        timestamp: "3h",
      },
    ],
  },
  {
    userId: "user-3",
    username: "elena_travels",
    avatar:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
    hasUnseen: true,
    stories: [
      {
        id: "s3-1",
        imageUrl:
          "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        timestamp: "4h",
      },
      {
        id: "s3-2",
        imageUrl:
          "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80",
        timestamp: "2h",
      },
    ],
  },
  {
    userId: "user-4",
    username: "urban_architect",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    hasUnseen: false,
    stories: [
      {
        id: "s4-1",
        imageUrl:
          "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
        timestamp: "5h",
      },
    ],
  },
  {
    userId: "user-5",
    username: "chloe.coffee",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    hasUnseen: true,
    stories: [
      {
        id: "s5-1",
        imageUrl:
          "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        timestamp: "7h",
      },
    ],
  },
  {
    userId: "user-6",
    username: "zenith_art",
    avatar:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
    hasUnseen: false,
    stories: [
      {
        id: "s6-1",
        imageUrl:
          "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
        timestamp: "8h",
      },
    ],
  },
  {
    userId: "user-7",
    username: "kai_cinema",
    avatar:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80",
    hasUnseen: true,
    stories: [
      {
        id: "s7-1",
        imageUrl:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80",
        timestamp: "9h",
      },
    ],
  },
];

export const initialPosts: Post[] = [
  {
    id: "post-1",
    user: {
      id: "user-1",
      username: "sophia.lens",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
      isVerified: true,
    },
    location: "Yosemite National Park, California",
    imageUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Golden hour hitting the valley just right. Truly nothing compares to crisp mountain mornings. 🌄✨ #nature #photography #wanderlust",
    createdAt: "2 HOURS AGO",
    likesCount: 1428,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: "c1-1",
        user: {
          username: "marcus_nord",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        text: "The light in this shot is unreal!",
        createdAt: "1h",
        likesCount: 14,
        isLiked: false,
      },
      {
        id: "c1-2",
        user: {
          username: "elena_travels",
          avatar:
            "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
        },
        text: "Adding this to my bucket list immediately 🙌",
        createdAt: "45m",
        likesCount: 6,
        isLiked: false,
      },
    ],
  },
  {
    id: "post-2",
    user: {
      id: "user-4",
      username: "urban_architect",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      isVerified: true,
    },
    location: "Kyoto, Japan",
    imageUrl:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Traditional woodwork blending harmoniously with modern geometry. Tranquility in every corner. ⛩️🏯",
    createdAt: "5 HOURS AGO",
    likesCount: 3892,
    isLiked: true,
    isSaved: true,
    comments: [
      {
        id: "c2-1",
        user: {
          username: "chloe.coffee",
          avatar:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
        },
        text: "Such peaceful aesthetic 🍃",
        createdAt: "3h",
        likesCount: 22,
        isLiked: true,
      },
      {
        id: "c2-2",
        user: {
          username: "zenith_art",
          avatar:
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=300&q=80",
        },
        text: "Stunning depth and lines!",
        createdAt: "2h",
        likesCount: 9,
        isLiked: false,
      },
    ],
  },
  {
    id: "post-3",
    user: {
      id: "current-user-1",
      username: "alex.rivera",
      avatar:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      isVerified: true,
    },
    location: "San Francisco, California",
    imageUrl:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Reflections after a storm. Late evening coding session with a view. 💻☕",
    createdAt: "1 DAY AGO",
    likesCount: 840,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: "c3-1",
        user: {
          username: "sophia.lens",
          avatar:
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
        },
        text: "Dream workspace setup right there!",
        createdAt: "18h",
        likesCount: 31,
        isLiked: false,
      },
    ],
  },
  {
    id: "post-4",
    user: {
      id: "user-3",
      username: "elena_travels",
      avatar:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
      isVerified: false,
    },
    location: "Amalfi Coast, Italy",
    imageUrl:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
    caption:
      "Salt in the air, lemon gelato in hand. Summer dreams along the cliffside. 🍋🌊",
    createdAt: "2 DAYS AGO",
    likesCount: 5120,
    isLiked: false,
    isSaved: false,
    comments: [
      {
        id: "c4-1",
        user: {
          username: "marcus_nord",
          avatar:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
        },
        text: "Colors look magnificent!",
        createdAt: "1d",
        likesCount: 18,
        isLiked: false,
      },
    ],
  },
];

export const suggestedUsers: User[] = [
  {
    id: "sug-1",
    username: "dev_sarah",
    fullName: "Sarah Chen",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    bio: "Frontend Architect & UI obsessive",
    postsCount: 58,
    followersCount: 28900,
    followingCount: 310,
    isFollowing: false,
  },
  {
    id: "sug-2",
    username: "pixel_nordic",
    fullName: "Liam Lindqvist",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80",
    bio: "Product Designer at Stockholm Studio",
    postsCount: 114,
    followersCount: 42100,
    followingCount: 640,
    isFollowing: false,
  },
  {
    id: "sug-3",
    username: "wander_maya",
    fullName: "Maya Brooks",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=300&q=80",
    bio: "Cinematographer & story teller",
    postsCount: 89,
    followersCount: 19800,
    followingCount: 412,
    isFollowing: false,
  },
  {
    id: "sug-4",
    username: "coffee_roasters_co",
    fullName: "Artisan Coffee Roasters",
    avatar:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80",
    bio: "Specialty coffee beans & barista craft",
    postsCount: 230,
    followersCount: 65400,
    followingCount: 120,
    isVerified: true,
    isFollowing: false,
  },
];

export const sampleNotifications: NotificationItem[] = [
  {
    id: "n1",
    type: "like",
    user: {
      username: "sophia.lens",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80",
    },
    text: "liked your photo.",
    targetImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
    createdAt: "15m",
    isRead: false,
  },
  {
    id: "n2",
    type: "comment",
    user: {
      username: "marcus_nord",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    },
    text: 'commented: "Dream workspace setup right there!"',
    targetImage:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
    createdAt: "1h",
    isRead: false,
  },
  {
    id: "n3",
    type: "follow",
    user: {
      username: "dev_sarah",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    },
    text: "started following you.",
    createdAt: "3h",
    isRead: true,
  },
];
