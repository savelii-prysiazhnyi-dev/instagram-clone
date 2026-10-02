import React, { useState } from "react";
import {
  Grid3X3,
  Bookmark,
  UserCheck,
  Settings,
  Link as LinkIcon,
  Heart,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";
import { User, Post } from "../../types";

interface ProfileViewProps {
  user: User;
  posts: Post[];
  onSelectPost: (post: Post) => void;
  onOpenEditProfile: () => void;
}

const highlights = [
  {
    id: "h1",
    title: "Travel",
    icon: "✈️",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "h2",
    title: "Workspace",
    icon: "💻",
    img: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "h3",
    title: "Design",
    icon: "🎨",
    img: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=300&q=80",
  },
  {
    id: "h4",
    title: "Cafes",
    icon: "☕",
    img: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=300&q=80",
  },
];

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  posts,
  onSelectPost,
  onOpenEditProfile,
}) => {
  const [activeTab, setActiveTab] = useState<"posts" | "saved" | "tagged">(
    "posts",
  );

  const userPosts = posts.filter(
    (p) => p.user.id === user.id || p.user.username === user.username,
  );
  const savedPosts = posts.filter((p) => p.isSaved);
  const taggedPosts = posts.slice(0, 2);

  let displayPosts = userPosts;
  if (activeTab === "saved") displayPosts = savedPosts;
  if (activeTab === "tagged") displayPosts = taggedPosts;

  return (
    <div className="w-full max-w-4xl mx-auto py-6 px-4">
      {/* Profile Header */}
      <header className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 pb-8 border-b border-neutral-200 dark:border-neutral-800">
        {/* Avatar with Story Ring */}
        <div className="shrink-0">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full p-1 story-ring-unseen">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-full h-full rounded-full object-cover border-4 border-white dark:border-black"
            />
          </div>
        </div>

        {/* Info & Stats */}
        <div className="flex-1 space-y-4 text-center sm:text-left">
          {/* Top row: username and action buttons */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
            <h1 className="text-xl font-normal text-neutral-900 dark:text-white flex items-center gap-1.5">
              <span>{user.username}</span>
              {user.isVerified && (
                <CheckCircle2 className="w-4 h-4 fill-blue-500 text-white shrink-0" />
              )}
            </h1>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenEditProfile}
                className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Edit profile
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  alert("Profile link copied!");
                }}
                className="px-4 py-1.5 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-100 rounded-lg text-sm font-semibold transition-colors cursor-pointer"
              >
                Share profile
              </button>
              <button
                onClick={onOpenEditProfile}
                className="p-1.5 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
                title="Options"
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats count */}
          <div className="flex items-center justify-center sm:justify-start gap-8 text-sm">
            <div>
              <span className="font-semibold text-neutral-950 dark:text-white">
                {userPosts.length}
              </span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">
                posts
              </span>
            </div>
            <div>
              <span className="font-semibold text-neutral-950 dark:text-white">
                {user.followersCount.toLocaleString()}
              </span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">
                followers
              </span>
            </div>
            <div>
              <span className="font-semibold text-neutral-950 dark:text-white">
                {user.followingCount.toLocaleString()}
              </span>{" "}
              <span className="text-neutral-600 dark:text-neutral-400">
                following
              </span>
            </div>
          </div>

          {/* Bio & Links */}
          <div className="text-sm space-y-1">
            <h2 className="font-semibold text-neutral-950 dark:text-white">
              {user.fullName}
            </h2>
            <p className="whitespace-pre-line text-neutral-800 dark:text-neutral-200">
              {user.bio}
            </p>
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-medium hover:underline text-xs"
              >
                <LinkIcon className="w-3 h-3" />
                {user.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Story Highlights */}
      <section className="mb-10 px-2 flex items-center gap-6 overflow-x-auto no-scrollbar py-2">
        {highlights.map((h) => (
          <div
            key={h.id}
            className="flex flex-col items-center gap-2 shrink-0 cursor-pointer group"
          >
            <div className="w-18 h-18 rounded-full p-[2px] border border-neutral-300 dark:border-neutral-700 group-hover:scale-105 transition-transform">
              <img
                src={h.img}
                alt={h.title}
                className="w-full h-full rounded-full object-cover border-2 border-white dark:border-black"
              />
            </div>
            <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200">
              {h.title}
            </span>
          </div>
        ))}
      </section>

      {/* Tabs navigation */}
      <div className="border-t border-neutral-200 dark:border-neutral-800 flex justify-center gap-12 text-xs font-semibold uppercase tracking-wider text-neutral-400">
        <button
          onClick={() => setActiveTab("posts")}
          className={`flex items-center gap-2 py-4 border-t transition-colors cursor-pointer ${
            activeTab === "posts"
              ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
              : "border-transparent hover:text-neutral-600 dark:hover:text-neutral-200"
          }`}
        >
          <Grid3X3 className="w-4 h-4" />
          <span>Posts</span>
        </button>

        <button
          onClick={() => setActiveTab("saved")}
          className={`flex items-center gap-2 py-4 border-t transition-colors cursor-pointer ${
            activeTab === "saved"
              ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
              : "border-transparent hover:text-neutral-600 dark:hover:text-neutral-200"
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>

        <button
          onClick={() => setActiveTab("tagged")}
          className={`flex items-center gap-2 py-4 border-t transition-colors cursor-pointer ${
            activeTab === "tagged"
              ? "border-neutral-900 dark:border-white text-neutral-900 dark:text-white"
              : "border-transparent hover:text-neutral-600 dark:hover:text-neutral-200"
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Tagged</span>
        </button>
      </div>

      {/* Media Grid */}
      {displayPosts.length === 0 ? (
        <div className="py-20 text-center text-neutral-400">
          <p className="text-sm font-semibold">No posts yet</p>
          <p className="text-xs mt-1">
            {activeTab === "saved"
              ? "Save photos and videos that you want to see again."
              : "When you share photos, they will appear on your profile."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-1 sm:gap-4 mt-2">
          {displayPosts.map((post) => (
            <div
              key={post.id}
              onClick={() => onSelectPost(post)}
              className="group relative aspect-square bg-neutral-100 dark:bg-neutral-900 overflow-hidden cursor-pointer"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />

              {/* Hover overlay with like & comment counts */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 text-white font-bold text-sm">
                <div className="flex items-center gap-1.5">
                  <Heart className="w-5 h-5 fill-white" />
                  <span>{post.likesCount}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>{post.comments.length}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
