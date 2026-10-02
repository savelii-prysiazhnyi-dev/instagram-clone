import React, { useState } from "react";
import { Search, X, CheckCircle2 } from "lucide-react";
import { Post, User } from "../../types";

interface SearchDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  posts: Post[];
  users: User[];
  onSelectPost: (post: Post) => void;
  onSelectUser: (user: User) => void;
}

export const SearchDrawer: React.FC<SearchDrawerProps> = ({
  isOpen,
  onClose,
  posts,
  users,
  onSelectPost,
  onSelectUser,
}) => {
  const [query, setQuery] = useState("");

  if (!isOpen) return null;

  const filteredUsers = query.trim()
    ? users.filter(
        (u) =>
          u.username.toLowerCase().includes(query.toLowerCase()) ||
          u.fullName.toLowerCase().includes(query.toLowerCase()),
      )
    : [];

  const filteredPosts = query.trim()
    ? posts.filter(
        (p) =>
          p.caption.toLowerCase().includes(query.toLowerCase()) ||
          p.user.username.toLowerCase().includes(query.toLowerCase()) ||
          (p.location &&
            p.location.toLowerCase().includes(query.toLowerCase())),
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-white dark:bg-neutral-900 h-full shadow-2xl flex flex-col p-6 z-10 border-r border-neutral-200 dark:border-neutral-800 animate-in slide-in-from-left duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
            Search
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input */}
        <div className="relative mb-6">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search accounts, tags, places..."
            autoFocus
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 text-neutral-900 dark:text-white"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto no-scrollbar space-y-6">
          {query.trim() === "" ? (
            <div className="text-center py-12 text-neutral-400 text-sm">
              <p>Search for friends, photographers, or locations</p>
            </div>
          ) : (
            <>
              {/* Accounts */}
              {filteredUsers.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Accounts
                  </h3>
                  <div className="space-y-2">
                    {filteredUsers.map((u) => (
                      <button
                        key={u.id}
                        onClick={() => {
                          onSelectUser(u);
                          onClose();
                        }}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 text-left cursor-pointer transition-colors"
                      >
                        <img
                          src={u.avatar}
                          alt={u.username}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {u.username}
                            </span>
                            {u.isVerified && (
                              <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
                            )}
                          </div>
                          <p className="text-xs text-neutral-500 truncate">
                            {u.fullName}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Posts */}
              {filteredPosts.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                    Posts
                  </h3>
                  <div className="grid grid-cols-3 gap-2">
                    {filteredPosts.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          onSelectPost(p);
                          onClose();
                        }}
                        className="relative aspect-square rounded-md overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={p.imageUrl}
                          alt={p.caption}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                <div className="text-center py-12 text-neutral-400 text-sm">
                  <p>No results found for &ldquo;{query}&rdquo;</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
