import React from "react";
import { Heart, Moon, Sun, Search } from "lucide-react";
import { InstagramIcon } from "../common/InstagramLogo";
import { ActiveView } from "../../types";
import { useTheme } from "../../hooks/useTheme";

interface MobileHeaderProps {
  onToggleSearch: () => void;
  isSearchOpen: boolean;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  unreadNotificationsCount: number;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  onToggleSearch,
  isSearchOpen: _isSearchOpen,
  activeView: _activeView,
  setActiveView,
  unreadNotificationsCount,
}) => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <header className="md:hidden sticky top-0 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 z-30 px-4 h-14 flex items-center justify-between">
      <button
        onClick={() => setActiveView("feed")}
        className="flex items-center gap-2 cursor-pointer"
      >
        <InstagramIcon className="w-6 h-6 text-neutral-900 dark:text-white" />
        <span className="font-serif italic font-bold text-xl text-neutral-900 dark:text-white">
          Instagram
        </span>
      </button>

      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSearch}
          className="p-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
          title="Search"
        >
          <Search className="w-5 h-5" />
        </button>

        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer"
          title="Toggle Theme"
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setActiveView("notifications")}
          className="p-1.5 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer relative"
          title="Notifications"
        >
          <Heart className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-black" />
          )}
        </button>
      </div>
    </header>
  );
};
