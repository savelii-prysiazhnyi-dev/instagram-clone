import React from "react";
import {
  Home,
  Search,
  Compass,
  Heart,
  SquarePlus,
  Moon,
  Sun,
  Bookmark,
} from "lucide-react";
import { InstagramIcon } from "../common/InstagramLogo";
import { ActiveView, User } from "../../types";

interface SidebarProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenCreateModal: () => void;
  onToggleSearch: () => void;
  isSearchOpen: boolean;
  currentUser: User;
  unreadNotificationsCount: number;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  setActiveView,
  onOpenCreateModal,
  onToggleSearch,
  isSearchOpen,
  currentUser,
  unreadNotificationsCount,
  isDarkMode,
  toggleDarkMode,
}) => {
  return (
    <aside className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-18 xl:w-60 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-black px-3 py-6 z-40 transition-all duration-300">
      {/* Brand Logo */}
      <div className="px-2 mb-8 flex items-center justify-between">
        <button
          onClick={() => setActiveView("feed")}
          className="text-left cursor-pointer flex items-center gap-2 group w-full"
          title="Instagram"
        >
          <InstagramIcon className="w-7 h-7 text-neutral-900 dark:text-white shrink-0 group-hover:scale-105 transition-transform" />
          <span className="hidden xl:inline text-xl font-bold tracking-tight font-serif italic text-neutral-900 dark:text-white">
            Instagram
          </span>
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1">
        <button
          onClick={() => setActiveView("feed")}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
            activeView === "feed" && !isSearchOpen
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Home"
        >
          <Home
            className={`w-6 h-6 shrink-0 transition-transform ${
              activeView === "feed" && !isSearchOpen
                ? "scale-110 stroke-[2.5]"
                : ""
            }`}
          />
          <span className="hidden xl:inline text-sm font-medium">Home</span>
        </button>

        <button
          onClick={onToggleSearch}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
            isSearchOpen
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Search"
        >
          <Search
            className={`w-6 h-6 shrink-0 transition-transform ${
              isSearchOpen ? "scale-110 stroke-[2.5]" : ""
            }`}
          />
          <span className="hidden xl:inline text-sm font-medium">Search</span>
        </button>

        <button
          onClick={() => setActiveView("explore")}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
            activeView === "explore"
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Explore"
        >
          <Compass
            className={`w-6 h-6 shrink-0 transition-transform ${
              activeView === "explore" ? "scale-110 stroke-[2.5]" : ""
            }`}
          />
          <span className="hidden xl:inline text-sm font-medium">Explore</span>
        </button>

        <button
          onClick={() => setActiveView("notifications")}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer relative ${
            activeView === "notifications"
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Notifications"
        >
          <div className="relative">
            <Heart
              className={`w-6 h-6 shrink-0 transition-transform ${
                activeView === "notifications"
                  ? "scale-110 stroke-[2.5] fill-red-500 text-red-500"
                  : ""
              }`}
            />
            {unreadNotificationsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-black animate-pulse" />
            )}
          </div>
          <span className="hidden xl:inline text-sm font-medium">
            Notifications
          </span>
        </button>

        <button
          onClick={onOpenCreateModal}
          className="flex items-center gap-4 w-full p-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200 cursor-pointer group"
          title="Create Post"
        >
          <SquarePlus className="w-6 h-6 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="hidden xl:inline text-sm font-medium">Create</span>
        </button>

        <button
          onClick={() => setActiveView("saved")}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
            activeView === "saved"
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Saved Posts"
        >
          <Bookmark
            className={`w-6 h-6 shrink-0 transition-transform ${
              activeView === "saved" ? "scale-110 stroke-[2.5]" : ""
            }`}
          />
          <span className="hidden xl:inline text-sm font-medium">Saved</span>
        </button>

        <button
          onClick={() => setActiveView("profile")}
          className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-200 cursor-pointer ${
            activeView === "profile"
              ? "font-bold bg-neutral-100 dark:bg-neutral-900 text-neutral-950 dark:text-white"
              : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900"
          }`}
          title="Profile"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className={`w-6 h-6 rounded-full object-cover shrink-0 ${
              activeView === "profile"
                ? "ring-2 ring-neutral-950 dark:ring-white"
                : ""
            }`}
          />
          <span className="hidden xl:inline text-sm font-medium">Profile</span>
        </button>
      </nav>

      {/* Bottom Section: Dark Mode & User quick badge */}
      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-4 w-full p-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-all duration-200 cursor-pointer"
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-6 h-6 shrink-0 text-amber-400" />
          ) : (
            <Moon className="w-6 h-6 shrink-0 text-neutral-600" />
          )}
          <span className="hidden xl:inline text-sm font-medium">
            {isDarkMode ? "Light Mode" : "Dark Mode"}
          </span>
        </button>
      </div>
    </aside>
  );
};
