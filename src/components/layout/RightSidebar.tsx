import React from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { User } from "../../types";

interface RightSidebarProps {
  currentUser: User;
  suggestedUsers: User[];
  onToggleFollow: (userId: string) => void;
  onSelectUser: (user: User) => void;
  onViewProfile: () => void;
}

export const RightSidebar: React.FC<RightSidebarProps> = ({
  currentUser,
  suggestedUsers,
  onToggleFollow,
  onViewProfile,
}) => {
  return (
    <aside className="hidden lg:block w-80 shrink-0 pt-6 px-4">
      {/* Current User Profile Card */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={onViewProfile}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.username}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-neutral-200 dark:ring-neutral-800 group-hover:scale-105 transition-transform"
          />
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-blue-500 transition-colors">
                {currentUser.username}
              </span>
              {currentUser.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
              )}
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {currentUser.fullName}
            </p>
          </div>
        </button>

        <button
          onClick={onViewProfile}
          className="text-xs font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 cursor-pointer"
        >
          View
        </button>
      </div>

      {/* Suggestions Section */}
      <div className="mt-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold text-neutral-500 dark:text-neutral-400">
            Suggested for you
          </span>
          <button className="text-xs font-semibold text-neutral-900 dark:text-neutral-200 hover:text-neutral-500 cursor-pointer">
            See All
          </button>
        </div>

        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-neutral-200 dark:ring-neutral-800"
                />
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">
                      {user.username}
                    </span>
                    {user.isVerified && (
                      <CheckCircle2 className="w-3 h-3 fill-blue-500 text-white shrink-0" />
                    )}
                  </div>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate max-w-[130px]">
                    {user.bio || "Suggested for you"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => onToggleFollow(user.id)}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors cursor-pointer ${
                  user.isFollowing
                    ? "text-neutral-700 dark:text-neutral-300 hover:text-red-500 flex items-center gap-0.5"
                    : "text-blue-500 hover:text-blue-700 dark:hover:text-blue-400"
                }`}
              >
                {user.isFollowing ? (
                  <>
                    <Check className="w-3 h-3 inline" /> Following
                  </>
                ) : (
                  "Follow"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Meta Links */}
      <div className="mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-900">
        <nav className="flex flex-wrap gap-x-2 gap-y-1 text-[11px] text-neutral-400 dark:text-neutral-600">
          <a href="#about" className="hover:underline">
            About
          </a>
          <span>•</span>
          <a href="#help" className="hover:underline">
            Help
          </a>
          <span>•</span>
          <a href="#press" className="hover:underline">
            Press
          </a>
          <span>•</span>
          <a href="#api" className="hover:underline">
            API
          </a>
          <span>•</span>
          <a href="#jobs" className="hover:underline">
            Jobs
          </a>
          <span>•</span>
          <a href="#privacy" className="hover:underline">
            Privacy
          </a>
          <span>•</span>
          <a href="#terms" className="hover:underline">
            Terms
          </a>
          <span>•</span>
          <a href="#locations" className="hover:underline">
            Locations
          </a>
          <span>•</span>
          <a href="#language" className="hover:underline">
            Language
          </a>
        </nav>
        <p className="mt-4 text-[11px] font-medium text-neutral-400 dark:text-neutral-600 uppercase tracking-wide">
          © 2026 INSTAGRAM CLONE FROM META
        </p>
      </div>
    </aside>
  );
};
