import React, { useState } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  MoreHorizontal,
  Smile,
  CheckCircle2,
  Copy,
  Check,
} from "lucide-react";
import { Post, User } from "../../types";

interface PostCardProps {
  post: Post;
  currentUser: User;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onLikeComment?: (postId: string, commentId: string) => void;
  onOpenDetailModal: (post: Post) => void;
  onSelectUser?: (user: {
    id: string;
    username: string;
    avatar: string;
  }) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  currentUser: _currentUser,
  onLike,
  onSave,
  onAddComment,
  onLikeComment,
  onOpenDetailModal,
  onSelectUser,
}) => {
  const [commentText, setCommentText] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleDoubleTap = () => {
    if (!post.isLiked) {
      onLike(post.id);
    }
    setShowHeartOverlay(true);
    setTimeout(() => setShowHeartOverlay(false), 900);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText("");
    setShowEmojiPicker(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setCopiedLink(true);
    setTimeout(() => {
      setCopiedLink(false);
      setIsMenuOpen(false);
    }, 1500);
  };

  const quickEmojis = ["❤️", "🙌", "🔥", "👏", "😍", "✨", "😂"];

  return (
    <article className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl mb-6 overflow-hidden shadow-xs">
      {/* Post Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <button
          onClick={() => onSelectUser?.(post.user)}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full p-[2px] story-ring-unseen">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-full h-full rounded-full object-cover border-2 border-white dark:border-neutral-900 group-hover:scale-105 transition-transform"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-sm text-neutral-950 dark:text-neutral-50 group-hover:text-blue-500 transition-colors">
                {post.user.username}
              </span>
              {post.user.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
              )}
            </div>
            {post.location && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                {post.location}
              </p>
            )}
          </div>
        </button>

        <button
          onClick={() => setIsMenuOpen(true)}
          className="p-1.5 text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          aria-label="More options"
        >
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Post Image with Double-Tap Heart Animation */}
      <div
        className="relative aspect-square bg-neutral-100 dark:bg-neutral-950 select-none cursor-pointer overflow-hidden"
        onDoubleClick={handleDoubleTap}
      >
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover"
          loading="lazy"
        />

        {showHeartOverlay && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Heart className="w-24 h-24 text-white fill-white drop-shadow-2xl animate-heart-pop" />
          </div>
        )}
      </div>

      {/* Action Buttons Bar */}
      <div className="px-4 pt-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onLike(post.id)}
            className="p-0.5 text-neutral-800 dark:text-neutral-100 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
            aria-label={post.isLiked ? "Unlike post" : "Like post"}
          >
            <Heart
              className={`w-6 h-6 transition-colors ${
                post.isLiked ? "fill-red-500 text-red-500 stroke-red-500" : ""
              }`}
            />
          </button>

          <button
            onClick={() => onOpenDetailModal(post)}
            className="p-0.5 text-neutral-800 dark:text-neutral-100 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
            aria-label="Comment on post"
          >
            <MessageCircle className="w-6 h-6" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-0.5 text-neutral-800 dark:text-neutral-100 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
            aria-label="Share post"
          >
            <Send className="w-6 h-6 -rotate-12 translate-y-[1.5px]" />
          </button>
        </div>

        <button
          onClick={() => onSave(post.id)}
          className="p-0.5 text-neutral-800 dark:text-neutral-100 hover:scale-115 active:scale-95 transition-transform cursor-pointer"
          aria-label={post.isSaved ? "Remove from saved" : "Save post"}
        >
          <Bookmark
            className={`w-6 h-6 ${
              post.isSaved
                ? "fill-neutral-950 text-neutral-950 dark:fill-white dark:text-white"
                : ""
            }`}
          />
        </button>
      </div>

      {/* Likes Count */}
      <div className="px-4 pt-2.5">
        <span className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
          {post.likesCount.toLocaleString()}{" "}
          {post.likesCount === 1 ? "like" : "likes"}
        </span>
      </div>

      {/* Caption */}
      <div className="px-4 pt-1.5 text-sm text-neutral-900 dark:text-neutral-100">
        <span className="font-semibold mr-2">{post.user.username}</span>
        <span>
          {isExpanded || post.caption.length <= 100
            ? post.caption
            : `${post.caption.slice(0, 100)}...`}
        </span>
        {post.caption.length > 100 && (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            className="text-neutral-500 dark:text-neutral-400 text-xs ml-1 hover:underline cursor-pointer"
          >
            {isExpanded ? "less" : "more"}
          </button>
        )}
      </div>

      {/* Comments List Preview */}
      <div className="px-4 pt-1.5 space-y-1">
        {post.comments.length > 2 && (
          <button
            onClick={() => onOpenDetailModal(post)}
            className="text-neutral-500 dark:text-neutral-400 text-xs hover:text-neutral-700 dark:hover:text-neutral-200 cursor-pointer"
          >
            View all {post.comments.length} comments
          </button>
        )}

        {post.comments.slice(-2).map((c) => (
          <div
            key={c.id}
            className="text-sm flex items-center justify-between group"
          >
            <p className="text-neutral-900 dark:text-neutral-100 flex-1 min-w-0 pr-2">
              <span className="font-semibold mr-2">{c.user.username}</span>
              <span className="break-words">{c.text}</span>
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[11px] text-neutral-400">
                {c.createdAt}
              </span>
              <button
                type="button"
                onClick={() => onLikeComment?.(post.id, c.id)}
                className={`p-0.5 transition-all hover:scale-115 active:scale-90 cursor-pointer ${
                  c.isLiked
                    ? "text-red-500 opacity-100"
                    : "text-neutral-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                }`}
                title={c.isLiked ? "Unlike comment" : "Like comment"}
                aria-label={c.isLiked ? "Unlike comment" : "Like comment"}
              >
                <Heart
                  className={`w-3 h-3 ${
                    c.isLiked ? "fill-red-500 text-red-500 stroke-red-500" : ""
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Post Timestamp */}
      <div className="px-4 pt-2">
        <time className="text-[10px] tracking-wider uppercase text-neutral-400">
          {post.createdAt}
        </time>
      </div>

      {/* Quick Emoji Bar */}
      {showEmojiPicker && (
        <div className="px-4 pt-2 flex items-center gap-2 border-t border-neutral-100 dark:border-neutral-800">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              type="button"
              onClick={() => setCommentText((prev) => prev + emoji)}
              className="text-lg hover:scale-125 transition-transform cursor-pointer"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Add Comment Input */}
      <form
        onSubmit={handleSubmitComment}
        className="mt-3 px-4 py-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          className="text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 cursor-pointer"
        >
          <Smile className="w-5 h-5" />
        </button>

        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 bg-transparent text-sm placeholder:text-neutral-400 focus:outline-none text-neutral-900 dark:text-neutral-100"
        />

        <button
          type="submit"
          disabled={!commentText.trim()}
          className="text-xs font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-blue-400 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Post
        </button>
      </form>

      {/* Options Menu Modal */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-800 rounded-2xl w-full max-w-xs overflow-hidden shadow-2xl divide-y divide-neutral-200 dark:divide-neutral-700 animate-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                onSave(post.id);
                setIsMenuOpen(false);
              }}
              className="w-full py-3.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
            >
              {post.isSaved ? "Remove from Saved" : "Save Post"}
            </button>
            <button
              onClick={handleCopyLink}
              className="w-full py-3.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer flex items-center justify-center gap-2"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4 text-green-500" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Link
                </>
              )}
            </button>
            <button
              onClick={() => {
                onOpenDetailModal(post);
                setIsMenuOpen(false);
              }}
              className="w-full py-3.5 text-sm font-semibold text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
            >
              Go to post
            </button>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="w-full py-3.5 text-sm font-semibold text-neutral-500 hover:bg-neutral-50 dark:hover:bg-neutral-700 cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </article>
  );
};
