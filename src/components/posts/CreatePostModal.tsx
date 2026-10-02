import React, { useState } from "react";
import { X, Image, MapPin, Smile, ArrowLeft } from "lucide-react";
import { User, Post } from "../../types";

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreatePost: (
    newPost: Omit<
      Post,
      "id" | "createdAt" | "likesCount" | "isLiked" | "isSaved" | "comments"
    >,
  ) => void;
}

const samplePresets = [
  {
    name: "Coastline",
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Architecture",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Coffee",
    url: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1200&q=80",
  },
  {
    name: "Night City",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
  },
];

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreatePost,
}) => {
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState<"select" | "compose">("select");

  if (!isOpen) return null;

  const handleSelectPreset = (url: string) => {
    setImageUrl(url);
    setStep("compose");
  };

  const handleCustomUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl.trim()) {
      setStep("compose");
    }
  };

  const handleShare = () => {
    if (!imageUrl.trim()) return;

    onCreatePost({
      user: {
        id: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
      },
      imageUrl,
      caption,
      location: location.trim() || undefined,
    });

    // Reset and close
    setImageUrl("");
    setCaption("");
    setLocation("");
    setStep("select");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white p-2 rounded-full cursor-pointer hover:bg-white/10"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div
        className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl w-full max-w-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 dark:border-neutral-800">
          {step === "compose" ? (
            <button
              onClick={() => setStep("select")}
              className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <div className="w-5" />
          )}

          <h3 className="font-semibold text-sm text-neutral-900 dark:text-white">
            Create new post
          </h3>

          {step === "compose" ? (
            <button
              onClick={handleShare}
              className="text-sm font-semibold text-blue-500 hover:text-blue-600 cursor-pointer"
            >
              Share
            </button>
          ) : (
            <div className="w-5" />
          )}
        </div>

        {/* Step 1: Select Media */}
        {step === "select" && (
          <div className="p-8 flex flex-col items-center justify-center min-h-[360px] text-center">
            <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-4">
              <Image className="w-10 h-10 text-neutral-500" />
            </div>
            <h4 className="text-lg font-semibold mb-2">
              Select photo to share
            </h4>
            <p className="text-xs text-neutral-500 mb-6 max-w-xs">
              Choose from featured photography or enter an image URL to share on
              your feed.
            </p>

            {/* Presets grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full mb-6">
              {samplePresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleSelectPreset(preset.url)}
                  className="group relative aspect-square rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 hover:scale-105 transition-all cursor-pointer"
                >
                  <img
                    src={preset.url}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-[11px] font-semibold text-white">
                      {preset.name}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* URL input */}
            <form
              onSubmit={handleCustomUrlSubmit}
              className="flex gap-2 w-full max-w-md"
            >
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Or paste image URL (https://...)"
                className="flex-1 px-4 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!imageUrl.trim()}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-40 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                Next
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Compose Caption & Details */}
        {step === "compose" && (
          <div className="flex flex-col sm:flex-row min-h-[380px]">
            {/* Image Preview */}
            <div className="sm:w-1/2 bg-black flex items-center justify-center overflow-hidden">
              <img
                src={imageUrl}
                alt="Upload preview"
                className="w-full h-full max-h-[300px] sm:max-h-[420px] object-cover"
              />
            </div>

            {/* Inputs */}
            <div className="sm:w-1/2 p-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-4">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="font-semibold text-xs text-neutral-900 dark:text-white">
                    {currentUser.username}
                  </span>
                </div>

                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a caption... #vibes #photo"
                  rows={4}
                  className="w-full text-sm bg-transparent border-0 focus:ring-0 focus:outline-none resize-none placeholder:text-neutral-400"
                />

                <div className="flex items-center justify-between text-neutral-400 text-xs py-2 border-b border-neutral-100 dark:border-neutral-800">
                  <Smile className="w-4 h-4 cursor-pointer hover:text-neutral-600" />
                  <span>{caption.length}/2,200</span>
                </div>

                <div className="flex items-center gap-2 py-3 border-b border-neutral-100 dark:border-neutral-800 text-xs">
                  <MapPin className="w-4 h-4 text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Add location"
                    className="w-full bg-transparent focus:outline-none placeholder:text-neutral-400 text-neutral-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleShare}
                  className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-xs transition-colors cursor-pointer"
                >
                  Share to Feed
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
