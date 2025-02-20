"use client";

import { useEffect, useState } from "react";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";
import PostCard from "@/components/PostCard";

type PostsListProps = {
  initialPosts: Post[];
  errorMessage: string | null;
  errorCode: number | null;
};

export default function PostsList({ initialPosts, errorMessage, errorCode }: PostsListProps) {
  const { posts, setPosts } = usePostStore();
  const [error, setError] = useState<{ message: string; code: number } | null>(null);

  useEffect(() => {
    if (initialPosts.length > 0 && Object.keys(posts).length === 0) {
      setPosts(initialPosts);
    }
  }, [initialPosts, posts, setPosts]);
  
  useEffect(() => {
    if (errorMessage) {
      setError({ message: errorMessage, code: errorCode || 500 });
    }
  }, [errorMessage, errorCode]);
  

  const sortedPosts = Object.values(posts).sort((a, b) => b.id - a.id);

  if (error) {
    return (
      <div role="alert" className="bg-red-500 text-white p-4 rounded">
        <p>{error.message}</p>
        <p>Error number: {error.code}</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Posts ({Object.keys(posts).length})</h1>

      {Object.keys(posts).length === 0 ? (
        <p className="text-gray-600 font-bold italic">
          There are no registered posts. Please enter a new Post to be displayed in the list.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {sortedPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  );
}