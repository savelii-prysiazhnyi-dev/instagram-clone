import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Pause,
  Play,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Send,
  Heart,
} from "lucide-react";
import { UserStory } from "../../types";

interface StoryViewerProps {
  stories: UserStory[];
  initialUserIndex: number;
  onClose: () => void;
  onStoryViewed?: (userId: string) => void;
}

export const StoryViewer: React.FC<StoryViewerProps> = ({
  stories,
  initialUserIndex,
  onClose,
  onStoryViewed,
}) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(initialUserIndex);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showSentFeedback, setShowSentFeedback] = useState(false);
  const [floatingEmojis, setFloatingEmojis] = useState<
    { id: number; char: string; left: number }[]
  >([]);

  const activeUserStory = stories[currentUserIndex];
  const currentStoryItem = activeUserStory?.stories[currentStoryIndex];

  // Mark story as viewed
  useEffect(() => {
    if (activeUserStory && onStoryViewed) {
      onStoryViewed(activeUserStory.userId);
    }
  }, [activeUserStory, onStoryViewed]);

  // Story progression
  const goToNextStory = useCallback(() => {
    if (!activeUserStory) return;

    if (currentStoryIndex < activeUserStory.stories.length - 1) {
      setCurrentStoryIndex((prev) => prev + 1);
      setProgress(0);
    } else if (currentUserIndex < stories.length - 1) {
      setCurrentUserIndex((prev) => prev + 1);
      setCurrentStoryIndex(0);
      setProgress(0);
    } else {
      onClose();
    }
  }, [
    activeUserStory,
    currentStoryIndex,
    currentUserIndex,
    stories.length,
    onClose,
  ]);

  const goToPrevStory = useCallback(() => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prev) => prev - 1);
      setProgress(0);
    } else if (currentUserIndex > 0) {
      const prevUser = stories[currentUserIndex - 1];
      setCurrentUserIndex((prev) => prev - 1);
      setCurrentStoryIndex(prevUser.stories.length - 1);
      setProgress(0);
    }
  }, [currentStoryIndex, currentUserIndex, stories]);

  // Progress timer loop
  useEffect(() => {
    if (isPaused) return;

    const stepMs = 50;
    const totalDurationMs = 5000; // 5 seconds per story
    const increment = (stepMs / totalDurationMs) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNextStory();
          return 0;
        }
        return prev + increment;
      });
    }, stepMs);

    return () => clearInterval(timer);
  }, [isPaused, goToNextStory]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight") {
        goToNextStory();
      } else if (e.key === "ArrowLeft") {
        goToPrevStory();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextStory, goToPrevStory, onClose]);

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setShowSentFeedback(true);
    setReplyText("");
    setTimeout(() => setShowSentFeedback(false), 2000);
  };

  const triggerReaction = (char: string) => {
    const newEmoji = {
      id: Date.now() + Math.random(),
      char,
      left: 20 + Math.random() * 60, // percentage across width
    };
    setFloatingEmojis((prev) => [...prev, newEmoji]);
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter((e) => e.id !== newEmoji.id));
    }, 1500);
  };

  if (!activeUserStory || !currentStoryItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center select-none">
      {/* Close button in top right */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 text-white/80 hover:text-white rounded-full bg-neutral-900/60 hover:bg-neutral-800 transition-colors cursor-pointer"
        aria-label="Close stories"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev User / Story button */}
      <button
        onClick={goToPrevStory}
        disabled={currentUserIndex === 0 && currentStoryIndex === 0}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer"
        aria-label="Previous story"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Story Card Container */}
      <div className="relative w-full max-w-sm h-full max-h-[85vh] sm:rounded-2xl overflow-hidden shadow-2xl bg-black flex flex-col justify-between">
        {/* Story Background Image */}
        <img
          src={currentStoryItem.imageUrl}
          alt="Story item"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 pointer-events-none" />

        {/* Floating animated reaction emojis */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
          {floatingEmojis.map((emoji) => (
            <div
              key={emoji.id}
              className="absolute bottom-20 text-3xl animate-heart-pop"
              style={{ left: `${emoji.left}%` }}
            >
              {emoji.char}
            </div>
          ))}
        </div>

        {/* Top Header & Progress bars */}
        <div className="relative z-20 p-4 pt-3 space-y-3">
          {/* Progress Bars */}
          <div className="flex gap-1.5 w-full">
            {activeUserStory.stories.map((story, idx) => {
              let fillPercentage = 0;
              if (idx < currentStoryIndex) fillPercentage = 100;
              else if (idx === currentStoryIndex) fillPercentage = progress;

              return (
                <div
                  key={story.id}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{ width: `${fillPercentage}%` }}
                  />
                </div>
              );
            })}
          </div>

          {/* User Info Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <img
                src={activeUserStory.avatar}
                alt={activeUserStory.username}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white/80"
              />
              <span className="font-semibold text-white text-sm">
                {activeUserStory.username}
              </span>
              <span className="text-white/60 text-xs">
                {currentStoryItem.timestamp}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white">
              <button
                onClick={() => setIsPaused((prev) => !prev)}
                className="p-1.5 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
                title={isPaused ? "Resume" : "Pause"}
              >
                {isPaused ? (
                  <Play className="w-4 h-4 fill-white" />
                ) : (
                  <Pause className="w-4 h-4" />
                )}
              </button>

              <button
                onClick={() => setIsMuted((prev) => !prev)}
                className="p-1.5 hover:bg-white/20 rounded-full cursor-pointer transition-colors"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tap areas for mobile story tapping */}
        <div className="absolute inset-y-16 inset-x-0 z-10 flex">
          <div
            className="w-1/3 h-full cursor-pointer"
            onClick={goToPrevStory}
            aria-label="Previous"
          />
          <div
            className="w-2/3 h-full cursor-pointer"
            onClick={goToNextStory}
            aria-label="Next"
          />
        </div>

        {/* Bottom Interactive Reply Section */}
        <div className="relative z-20 p-4 pb-5 space-y-3">
          {/* Quick emoji reactions */}
          <div className="flex justify-between items-center px-2">
            {["🔥", "❤️", "😂", "😮", "😢", "👏"].map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => triggerReaction(emoji)}
                className="text-2xl hover:scale-125 active:scale-95 transition-transform cursor-pointer"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Form */}
          <form onSubmit={handleSendReply} className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                onFocus={() => setIsPaused(true)}
                onBlur={() => setIsPaused(false)}
                placeholder={`Reply to ${activeUserStory.username}...`}
                className="w-full bg-white/20 text-white placeholder-white/70 px-4 py-2.5 rounded-full text-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
              />
            </div>

            <button
              type="submit"
              disabled={!replyText.trim()}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => triggerReaction("❤️")}
              className="p-2.5 rounded-full hover:bg-white/20 text-white cursor-pointer transition-colors"
            >
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            </button>
          </form>

          {showSentFeedback && (
            <div className="text-center text-xs font-semibold text-green-400 animate-in fade-in">
              Reply sent to {activeUserStory.username}!
            </div>
          )}
        </div>
      </div>

      {/* Next User / Story button */}
      <button
        onClick={goToNextStory}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-40 p-3 rounded-full bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm transition-all cursor-pointer"
        aria-label="Next story"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
};
