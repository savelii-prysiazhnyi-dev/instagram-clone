import React, { useState } from "react";
import { Heart, MessageCircle, Film, Layers } from "lucide-react";
import { Post } from "../../types";

interface ExploreGridProps {
  posts: Post[];
  onSelectPost: (post: Post) => void;
}

const categories = [
  "All",
  "Nature",
  "Architecture",
  "Travel",
  "Photography",
  "Style",
  "Tech",
];

// Extra curated explore media items to make the grid rich and visually diverse
const exploreCuratedMedia = [
  {
    id: "exp-1",
    imageUrl:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=1200&q=80",
    likesCount: 9420,
    commentsCount: 312,
    category: "Nature",
    type: "reel",
  },
  {
    id: "exp-2",
    imageUrl:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    likesCount: 4210,
    commentsCount: 89,
    category: "Architecture",
    type: "carousel",
  },
  {
    id: "exp-3",
    imageUrl:
      "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    likesCount: 12840,
    commentsCount: 450,
    category: "Architecture",
    type: "image",
  },
  {
    id: "exp-4",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    likesCount: 7120,
    commentsCount: 130,
    category: "Travel",
    type: "image",
  },
  {
    id: "exp-5",
    imageUrl:
      "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
    likesCount: 3840,
    commentsCount: 94,
    category: "Photography",
    type: "reel",
  },
  {
    id: "exp-6",
    imageUrl:
      "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80",
    likesCount: 5690,
    commentsCount: 204,
    category: "Style",
    type: "image",
  },
  {
    id: "exp-7",
    imageUrl:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    likesCount: 8320,
    commentsCount: 310,
    category: "Architecture",
    type: "image",
  },
  {
    id: "exp-8",
    imageUrl:
      "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80",
    likesCount: 6510,
    commentsCount: 198,
    category: "Tech",
    type: "carousel",
  },
];

export const ExploreGrid: React.FC<ExploreGridProps> = ({
  posts,
  onSelectPost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Combine user feed posts and curated explore items
  const allExploreItems = [
    ...posts.map((p) => ({
      id: p.id,
      imageUrl: p.imageUrl,
      likesCount: p.likesCount,
      commentsCount: p.comments.length,
      category: p.caption.includes("#nature") ? "Nature" : "Travel",
      type: "image" as const,
      postRef: p,
    })),
    ...exploreCuratedMedia.map((m) => ({
      ...m,
      type: m.type as "image" | "reel" | "carousel",
      postRef: {
        id: m.id,
        user: {
          id: "creator-" + m.id,
          username: "creator_" + m.category.toLowerCase(),
          avatar: m.imageUrl,
          isVerified: true,
        },
        imageUrl: m.imageUrl,
        caption: `Exploring beautiful ${m.category.toLowerCase()} photography moments. ✨`,
        createdAt: "1 DAY AGO",
        likesCount: m.likesCount,
        isLiked: false,
        isSaved: false,
        comments: [],
      } as Post,
    })),
  ];

  const filteredItems =
    selectedCategory === "All"
      ? allExploreItems
      : allExploreItems.filter((item) => item.category === selectedCategory);

  return (
    <div className="w-full max-w-5xl mx-auto py-4 px-2 sm:px-4">
      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === cat
                ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Discovery Grid */}
      <div className="grid grid-cols-3 gap-1 sm:gap-4 auto-rows-fr">
        {filteredItems.map((item, index) => {
          // Every 6th item becomes a taller/featured card on larger screens
          const isFeatured = index % 7 === 1;

          return (
            <div
              key={item.id}
              onClick={() => onSelectPost(item.postRef)}
              className={`group relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-sm sm:rounded-lg cursor-pointer ${
                isFeatured
                  ? "row-span-2 col-span-1 md:row-span-2 md:col-span-1 aspect-1/2"
                  : "aspect-square"
              }`}
            >
              <img
                src={item.imageUrl}
                alt="Explore discovery"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Type Badge in top right */}
              <div className="absolute top-2.5 right-2.5 text-white drop-shadow-md z-10 pointer-events-none">
                {item.type === "reel" && <Film className="w-4 h-4" />}
                {item.type === "carousel" && <Layers className="w-4 h-4" />}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 sm:gap-6 text-white font-bold text-xs sm:text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>{item.likesCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span>{item.commentsCount}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
