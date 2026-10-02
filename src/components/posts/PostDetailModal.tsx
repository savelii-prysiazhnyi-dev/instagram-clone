import React, { useState } from "react";
import {
  X,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  Smile,
  CheckCircle2,
} from "lucide-react";
import { Post, User } from "../../types";

interface PostDetailModalProps {
  post: Post | null;
  currentUser: User;
  onClose: () => void;
  onLike: (postId: string) => void;
  onSave: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  currentUser: _currentUser,
  onClose,
  onLike,
  onSave,
  onAddComment,
}) => {
  const [commentText, setCommentText] = useState("");

  if (!post) return null;

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    onAddComment(post.id, commentText.trim());
    setCommentText("");
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 animate-in fade-in duration-200">
      {/* Close button in corner */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 text-white hover:text-neutral-300 p-2 rounded-full cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-7 h-7" />
      </button>

      {/* Modal Container */}
      <div
        className="bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-2xl flex flex-col md:flex-row w-full max-w-4xl max-h-[90vh] border border-neutral-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Photo */}
        <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden">
          <img
            src={post.imageUrl}
            alt={post.caption}
            className="w-full h-full max-h-[50vh] md:max-h-[85vh] object-contain"
          />
        </div>

        {/* Right Side: Comments and Details */}
        <div className="md:w-2/5 flex flex-col h-full justify-between bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800">
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800">
            <img
              src={post.user.avatar}
              alt={post.user.username}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-1">
                <span className="font-semibold text-sm text-neutral-950 dark:text-white">
                  {post.user.username}
                </span>
                {post.user.isVerified && (
                  <CheckCircle2 className="w-3.5 h-3.5 fill-blue-500 text-white shrink-0" />
                )}
              </div>
              {post.location && (
                <p className="text-xs text-neutral-500">{post.location}</p>
              )}
            </div>
          </div>

          {/* Comments List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] md:max-h-[400px]">
            {/* Caption as first comment */}
            <div className="flex items-start gap-3">
              <img
                src={post.user.avatar}
                alt={post.user.username}
                className="w-8 h-8 rounded-full object-cover shrink-0"
              />
              <div className="text-sm">
                <span className="font-semibold mr-1.5 text-neutral-950 dark:text-white">
                  {post.user.username}
                </span>
                <span className="text-neutral-800 dark:text-neutral-200">
                  {post.caption}
                </span>
                <p className="text-[11px] text-neutral-400 mt-1">
                  {post.createdAt}
                </p>
              </div>
            </div>

            {/* Other comments */}
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="flex items-start justify-between gap-2"
              >
                <div className="flex items-start gap-3">
                  <img
                    src={comment.user.avatar}
                    alt={comment.user.username}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="text-sm">
                    <span className="font-semibold mr-1.5 text-neutral-950 dark:text-white">
                      {comment.user.username}
                    </span>
                    <span className="text-neutral-800 dark:text-neutral-200">
                      {comment.text}
                    </span>
                    <div className="flex items-center gap-3 text-[11px] text-neutral-400 mt-1">
                      <span>{comment.createdAt}</span>
                      {comment.likesCount > 0 && (
                        <span>{comment.likesCount} likes</span>
                      )}
                      <button className="font-semibold hover:text-neutral-600 dark:hover:text-neutral-300 cursor-pointer">
                        Reply
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  className="p-1 text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                  title="Like comment"
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Action Bar */}
          <div className="p-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => onLike(post.id)}
                  className="cursor-pointer hover:scale-110 transition-transform"
                >
                  <Heart
                    className={`w-6 h-6 ${
                      post.isLiked
                        ? "fill-red-500 text-red-500"
                        : "text-neutral-800 dark:text-white"
                    }`}
                  />
                </button>
                <button className="cursor-pointer hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-neutral-800 dark:text-white" />
                </button>
                <button className="cursor-pointer hover:scale-110 transition-transform">
                  <Send className="w-6 h-6 -rotate-12 text-neutral-800 dark:text-white" />
                </button>
              </div>
              <button
                onClick={() => onSave(post.id)}
                className="cursor-pointer hover:scale-110 transition-transform"
              >
                <Bookmark
                  className={`w-6 h-6 ${
                    post.isSaved
                      ? "fill-neutral-900 text-neutral-900 dark:fill-white dark:text-white"
                      : "text-neutral-800 dark:text-white"
                  }`}
                />
              </button>
            </div>

            <div className="font-semibold text-sm text-neutral-900 dark:text-white">
              {post.likesCount.toLocaleString()}{" "}
              {post.likesCount === 1 ? "like" : "likes"}
            </div>
            <p className="text-[10px] text-neutral-400 uppercase tracking-wider">
              {post.createdAt}
            </p>
          </div>

          {/* Comment Form */}
          <form
            onSubmit={handleCommentSubmit}
            className="p-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center gap-2"
          >
            <Smile className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="flex-1 bg-transparent text-sm focus:outline-none text-neutral-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={!commentText.trim()}
              className="text-xs font-semibold text-blue-500 hover:text-blue-600 disabled:opacity-30 cursor-pointer"
            >
              Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
