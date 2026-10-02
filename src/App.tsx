import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileHeader } from "./components/layout/MobileHeader";
import { BottomNav } from "./components/layout/BottomNav";
import { RightSidebar } from "./components/layout/RightSidebar";
import { SearchDrawer } from "./components/layout/SearchDrawer";
import { NotificationsDrawer } from "./components/notifications/NotificationsDrawer";
import {
  currentUser as initialCurrentUser,
  initialPosts,
  suggestedUsers as initialSuggestedUsers,
  sampleNotifications,
} from "./data/mockData";
import { ActiveView, Post, User } from "./types";

export default function App() {
  const [currentUser] = useState<User>(initialCurrentUser);
  const [activeView, setActiveView] = useState<ActiveView>("feed");
  const [posts] = useState<Post[]>(initialPosts);
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>(
    initialSuggestedUsers,
  );
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return next;
    });
  };

  const handleToggleFollow = (userId: string) => {
    setSuggestedUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, isFollowing: !user.isFollowing } : user,
      ),
    );
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadNotificationsCount = notifications.filter(
    (n) => !n.isRead,
  ).length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row justify-center">
      {/* Desktop Sidebar Navigation */}
      <Sidebar
        activeView={activeView}
        setActiveView={(view) => {
          if (view === "notifications") {
            setIsNotificationsOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        onOpenCreateModal={() => {}}
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        isSearchOpen={isSearchOpen}
        currentUser={currentUser}
        unreadNotificationsCount={unreadNotificationsCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Mobile Top Header */}
      <MobileHeader
        onToggleSearch={() => setIsSearchOpen((prev) => !prev)}
        isSearchOpen={isSearchOpen}
        activeView={activeView}
        setActiveView={(view) => {
          if (view === "notifications") {
            setIsNotificationsOpen(true);
          } else {
            setActiveView(view);
          }
        }}
        unreadNotificationsCount={unreadNotificationsCount}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl md:ml-18 xl:ml-60 px-2 sm:px-4 py-4 md:py-6 flex justify-center gap-8">
        <div className="w-full max-w-[630px]">
          <div className="p-8 text-center text-neutral-500">
            Feed content will go here
          </div>
        </div>

        {/* Right Sidebar for desktop */}
        <RightSidebar
          currentUser={currentUser}
          suggestedUsers={suggestedUsers}
          onToggleFollow={handleToggleFollow}
          onSelectUser={() => {}}
          onViewProfile={() => setActiveView("profile")}
        />
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCreateModal={() => {}}
        currentUser={currentUser}
      />

      {/* Search Overlay Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        users={[currentUser, ...suggestedUsers]}
        onSelectPost={() => {}}
        onSelectUser={() => {}}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />
    </div>
  );
}
