import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { User, UserStory } from "../../types";

interface StoriesTrayProps {
  currentUser: User;
  stories: UserStory[];
  onSelectStory: (index: number) => void;
  onAddStory?: () => void;
}

export const StoriesTray: React.FC<StoriesTrayProps> = ({
  currentUser,
  stories,
  onSelectStory,
  onAddStory,
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const current = scrollRef.current;
    if (current) {
      current.addEventListener("scroll", checkScroll);
      return () => current.removeEventListener("scroll", checkScroll);
    }
  }, [stories]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const amount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  const currentUserStoryIndex = stories.findIndex(
    (s) => s.userId === currentUser.id || s.username === currentUser.username,
  );
  const currentUserStory =
    currentUserStoryIndex !== -1 ? stories[currentUserStoryIndex] : null;
  const hasUserStory =
    !!currentUserStory && currentUserStory.stories.length > 0;

  return (
    <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-4 mb-6 shadow-xs">
      {/* Scroll Left Button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white dark:bg-neutral-800 rounded-full shadow-md items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}

      {/* Stories Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex items-center gap-4 overflow-x-auto no-scrollbar scroll-smooth py-1 px-1"
      >
        {/* Current User Story / Add Story */}
        <div className="flex flex-col items-center gap-1.5 shrink-0 group">
          <div className="relative">
            <button
              onClick={() => {
                if (hasUserStory) {
                  onSelectStory(currentUserStoryIndex);
                } else {
                  onAddStory?.();
                }
              }}
              className="cursor-pointer block group-hover:scale-105 transition-transform"
              title={hasUserStory ? "Watch your story" : "Add to story"}
            >
              <div
                className={`w-16 h-16 rounded-full p-[2.5px] transition-all ${
                  hasUserStory
                    ? currentUserStory.hasUnseen
                      ? "story-ring-unseen animate-pulse-subtle"
                      : "story-ring-seen"
                    : "p-[2px] bg-neutral-200 dark:bg-neutral-800"
                }`}
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-900"
                />
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddStory?.();
              }}
              className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 hover:bg-blue-600 rounded-full border-2 border-white dark:border-neutral-900 flex items-center justify-center text-white cursor-pointer transition-colors"
              title="Add to story"
            >
              <Plus className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>
          <span className="text-xs text-neutral-700 dark:text-neutral-300 w-16 text-center truncate">
            Your story
          </span>
        </div>

        {/* Other Users' Stories */}
        {stories.map((storyUser, index) => {
          if (index === currentUserStoryIndex) return null;
          return (
            <button
              key={storyUser.userId}
              onClick={() => onSelectStory(index)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group text-left"
            >
              <div
                className={`w-16 h-16 rounded-full p-[2.5px] transition-transform duration-200 group-hover:scale-105 ${
                  storyUser.hasUnseen
                    ? "story-ring-unseen animate-pulse-subtle"
                    : "story-ring-seen"
                }`}
              >
                <img
                  src={storyUser.avatar}
                  alt={storyUser.username}
                  className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-900"
                />
              </div>
              <span className="text-xs text-neutral-700 dark:text-neutral-300 w-16 text-center truncate group-hover:text-neutral-950 dark:group-hover:text-white">
                {storyUser.username}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll Right Button */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-7 h-7 bg-white dark:bg-neutral-800 rounded-full shadow-md items-center justify-center text-neutral-800 dark:text-neutral-200 hover:scale-110 transition-transform cursor-pointer"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
