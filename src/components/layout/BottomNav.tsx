import React from "react";
import { Home, Compass, SquarePlus, Bookmark } from "lucide-react";
import { ActiveView, User } from "../../types";

interface BottomNavProps {
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  onOpenCreateModal: () => void;
  currentUser: User;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeView,
  setActiveView,
  onOpenCreateModal,
  currentUser,
}) => {
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-white/95 dark:bg-black/95 backdrop-blur-md border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-around z-30 px-2">
      <button
        onClick={() => setActiveView("feed")}
        className={`p-2 transition-transform cursor-pointer ${
          activeView === "feed"
            ? "scale-110 text-neutral-950 dark:text-white"
            : "text-neutral-500"
        }`}
        title="Home"
      >
        <Home className="w-6 h-6" />
      </button>

      <button
        onClick={() => setActiveView("explore")}
        className={`p-2 transition-transform cursor-pointer ${
          activeView === "explore"
            ? "scale-110 text-neutral-950 dark:text-white"
            : "text-neutral-500"
        }`}
        title="Explore"
      >
        <Compass className="w-6 h-6" />
      </button>

      <button
        onClick={onOpenCreateModal}
        className="p-2 text-neutral-900 dark:text-white hover:scale-110 transition-transform cursor-pointer"
        title="Create Post"
      >
        <SquarePlus className="w-7 h-7" />
      </button>

      <button
        onClick={() => setActiveView("saved")}
        className={`p-2 transition-transform cursor-pointer ${
          activeView === "saved"
            ? "scale-110 text-neutral-950 dark:text-white"
            : "text-neutral-500"
        }`}
        title="Saved"
      >
        <Bookmark className="w-6 h-6" />
      </button>

      <button
        onClick={() => setActiveView("profile")}
        className="p-2 transition-transform cursor-pointer"
        title="Profile"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.username}
          className={`w-6 h-6 rounded-full object-cover ${
            activeView === "profile"
              ? "ring-2 ring-neutral-900 dark:ring-white"
              : ""
          }`}
        />
      </button>
    </nav>
  );
};
