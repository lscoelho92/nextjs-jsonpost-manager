"use client";

import { useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";
import PostCard from "@/components/PostCard";

type PostsListProps = {
  initialPosts: Post[];
};

export default function PostsList({ initialPosts }: PostsListProps) {
  const { posts, setPosts } = usePostStore(); 

  useEffect(() => {
    if (Object.keys(posts).length === 0) {
      setPosts(initialPosts);
    }
  }, [initialPosts, posts, setPosts]);

  const sortedPosts = Object.values(posts).sort((a, b) => b.id - a.id);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Posts ({Object.keys(posts).length})</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {sortedPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}