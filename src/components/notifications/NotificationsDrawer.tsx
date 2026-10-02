import React from "react";
import { Heart, MessageCircle, UserPlus, X, Check } from "lucide-react";
import { NotificationItem } from "../../types";

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllAsRead: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col p-6 z-10 border-r border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Notifications
            </h2>
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1 cursor-pointer"
            >
              <Check className="w-3.5 h-3.5" /> Mark all read
            </button>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto no-scrollbar space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-neutral-400">
              <Heart className="w-12 h-12 mx-auto mb-3 stroke-1 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-center justify-between p-3 rounded-xl transition-colors ${
                  !n.isRead
                    ? "bg-neutral-50 dark:bg-neutral-850 ring-1 ring-neutral-200/50 dark:ring-neutral-700/50"
                    : "hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative">
                    <img
                      src={n.user.avatar}
                      alt={n.user.username}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <span className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-neutral-900 rounded-full shadow-xs">
                      {n.type === "like" && (
                        <Heart className="w-3 h-3 fill-red-500 text-red-500" />
                      )}
                      {n.type === "comment" && (
                        <MessageCircle className="w-3 h-3 fill-blue-500 text-blue-500" />
                      )}
                      {n.type === "follow" && (
                        <UserPlus className="w-3 h-3 fill-green-500 text-green-500" />
                      )}
                    </span>
                  </div>

                  <div className="text-xs text-neutral-800 dark:text-neutral-200 leading-snug min-w-0">
                    <span className="font-bold text-neutral-950 dark:text-white mr-1">
                      {n.user.username}
                    </span>
                    {n.text}
                    <span className="block text-[11px] text-neutral-400 mt-0.5">
                      {n.createdAt}
                    </span>
                  </div>
                </div>

                {n.targetImage && (
                  <img
                    src={n.targetImage}
                    alt="post target"
                    className="w-10 h-10 rounded-md object-cover ml-3 shrink-0"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
