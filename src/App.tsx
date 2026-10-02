import { useState } from "react";
import { Sidebar } from "./components/layout/Sidebar";
import { MobileHeader } from "./components/layout/MobileHeader";
import { BottomNav } from "./components/layout/BottomNav";
import { RightSidebar } from "./components/layout/RightSidebar";
import { SearchDrawer } from "./components/layout/SearchDrawer";
import { NotificationsDrawer } from "./components/notifications/NotificationsDrawer";
import { StoriesTray } from "./components/stories/StoriesTray";
import { StoryViewer } from "./components/stories/StoryViewer";
import { PostCard } from "./components/posts/PostCard";
import { PostDetailModal } from "./components/posts/PostDetailModal";
import { CreatePostModal } from "./components/posts/CreatePostModal";
import { ProfileView } from "./components/profile/ProfileView";
import { EditProfileModal } from "./components/profile/EditProfileModal";
import {
  currentUser as initialCurrentUser,
  initialStories,
  initialPosts,
  suggestedUsers as initialSuggestedUsers,
  sampleNotifications,
} from "./data/mockData";
import { ActiveView, Post, User, UserStory } from "./types";

export default function App() {
  const [currentUser, setCurrentUser] = useState<User>(initialCurrentUser);
  const [activeView, setActiveView] = useState<ActiveView>("feed");
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [stories, setStories] = useState<UserStory[]>(initialStories);
  const [selectedStoryIndex, setSelectedStoryIndex] = useState<number | null>(
    null,
  );
  const [selectedDetailPost, setSelectedDetailPost] = useState<Post | null>(
    null,
  );
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
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

  const handleStoryViewed = (userId: string) => {
    setStories((prev) =>
      prev.map((s) => (s.userId === userId ? { ...s, hasUnseen: false } : s)),
    );
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likesCount: isLiked ? post.likesCount + 1 : post.likesCount - 1,
          };
        }
        return post;
      }),
    );

    setSelectedDetailPost((prev) => {
      if (prev && prev.id === postId) {
        const isLiked = !prev.isLiked;
        return {
          ...prev,
          isLiked,
          likesCount: isLiked ? prev.likesCount + 1 : prev.likesCount - 1,
        };
      }
      return prev;
    });
  };

  const handleSavePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId ? { ...post, isSaved: !post.isSaved } : post,
      ),
    );

    setSelectedDetailPost((prev) =>
      prev && prev.id === postId ? { ...prev, isSaved: !prev.isSaved } : prev,
    );
  };

  const handleAddComment = (postId: string, text: string) => {
    const newComment = {
      id: `comment-${Date.now()}`,
      user: {
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
      },
      text,
      createdAt: "Just now",
      likesCount: 0,
      isLiked: false,
    };

    setPosts((prev) =>
      prev.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post,
      ),
    );

    setSelectedDetailPost((prev) =>
      prev && prev.id === postId
        ? { ...prev, comments: [...prev.comments, newComment] }
        : prev,
    );
  };

  const handleCreatePost = (
    newPostData: Omit<
      Post,
      "id" | "createdAt" | "likesCount" | "isLiked" | "isSaved" | "comments"
    >,
  ) => {
    const createdPost: Post = {
      id: `post-${Date.now()}`,
      ...newPostData,
      createdAt: "JUST NOW",
      likesCount: 1,
      isLiked: true,
      isSaved: false,
      comments: [],
    };

    setPosts((prev) => [createdPost, ...prev]);
    setCurrentUser((prev) => ({
      ...prev,
      postsCount: prev.postsCount + 1,
    }));
    setActiveView("feed");
  };

  const handleSaveProfile = (updated: Partial<User>) => {
    setCurrentUser((prev) => ({
      ...prev,
      ...updated,
    }));
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
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
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
        {activeView === "feed" && (
          <>
            <div className="w-full max-w-[630px]">
              {/* Stories Tray */}
              <StoriesTray
                currentUser={currentUser}
                stories={stories}
                onSelectStory={(index) => setSelectedStoryIndex(index)}
                onAddStory={() => setIsCreateModalOpen(true)}
              />

              {/* Posts Feed */}
              <div className="space-y-4">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    currentUser={currentUser}
                    onLike={handleLikePost}
                    onSave={handleSavePost}
                    onAddComment={handleAddComment}
                    onOpenDetailModal={(p) => setSelectedDetailPost(p)}
                    onSelectUser={() => setActiveView("profile")}
                  />
                ))}
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
          </>
        )}

        {/* Profile View */}
        {activeView === "profile" && (
          <div className="w-full">
            <ProfileView
              user={currentUser}
              posts={posts}
              onSelectPost={(p) => setSelectedDetailPost(p)}
              onOpenEditProfile={() => setIsEditProfileOpen(true)}
            />
          </div>
        )}

        {/* Saved Posts Direct View */}
        {activeView === "saved" && (
          <div className="w-full max-w-3xl">
            <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-8 text-center mb-6">
              <h2 className="text-xl font-bold mb-2">Saved Collection</h2>
              <p className="text-sm text-neutral-500">
                Only you can see what you&apos;ve saved.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {posts
                .filter((p) => p.isSaved)
                .map((p) => (
                  <div
                    key={p.id}
                    onClick={() => setSelectedDetailPost(p)}
                    className="aspect-square rounded-lg overflow-hidden cursor-pointer group relative"
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
            </div>
          </div>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeView={activeView}
        setActiveView={setActiveView}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        currentUser={currentUser}
      />

      {/* Search Overlay Drawer */}
      <SearchDrawer
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        posts={posts}
        users={[currentUser, ...suggestedUsers]}
        onSelectPost={(p) => setSelectedDetailPost(p)}
        onSelectUser={() => setActiveView("profile")}
      />

      {/* Notifications Drawer */}
      <NotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllAsRead={handleMarkAllNotificationsRead}
      />

      {/* Fullscreen Story Viewer */}
      {selectedStoryIndex !== null && (
        <StoryViewer
          stories={stories}
          initialUserIndex={selectedStoryIndex}
          onClose={() => setSelectedStoryIndex(null)}
          onStoryViewed={handleStoryViewed}
        />
      )}

      {/* Post Detail Modal */}
      {selectedDetailPost && (
        <PostDetailModal
          post={selectedDetailPost}
          currentUser={currentUser}
          onClose={() => setSelectedDetailPost(null)}
          onLike={handleLikePost}
          onSave={handleSavePost}
          onAddComment={handleAddComment}
        />
      )}

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        currentUser={currentUser}
        onCreatePost={handleCreatePost}
      />

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentUser={currentUser}
        onSaveProfile={handleSaveProfile}
      />
    </div>
  );
}
