import React from "react";
import { formatDistanceToNow } from "date-fns";

const SystemPostsComponent = ({ name, error, posts, loading }) => {
  return (
    <article className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="font-semibold text-lg mb-4 text-gray-800">{name} Posts</h3>

      {loading && (
        <p className="text-sm text-gray-500 italic">Loading posts...</p>
      )}
      {error && <p className="text-sm text-red-500 italic">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-sm text-gray-500 italic">No posts yet.</p>
      )}

      <div className="space-y-2">
        {posts.map((post, index) => (
          <div
            key={index}
            className="flex items-start gap-4 border rounded-md p-2 hover:shadow-md transition relative"
          >
            {/* Thumbnail */}
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="w-16 h-16 object-cover rounded-md border"
              />
            )}

            {/* Content */}
            <div className="flex-1">
              {/* Time posted (top-right) */}
              <span className="absolute top-2 right-3 text-[10px] text-gray-400">
                {formatDistanceToNow(new Date(post.created_at), {
                  addSuffix: true,
                })}
              </span>

              {/* Description (truncated) */}
              <p className="text-xs text-gray-700  mt-2 line-clamp-3">
                {post.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* If we got 3 posts, hint that more exist */}
      {posts.length === 3 && (
        <p className="text-sm italic text-gray-500  mt-2">
          More posts available...
        </p>
      )}
    </article>
  );
};

export default SystemPostsComponent;
