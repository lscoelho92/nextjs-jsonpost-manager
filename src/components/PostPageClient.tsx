"use client";
import { useState, useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post"
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";

type PostPageProps = {
  id: string;
};

export default function PostPageClient({ id }: PostPageProps) {
  const { posts } = usePostStore();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);

  const isNewPost = id === "new"

  useEffect(() => {
    if (!isNewPost && !isDeleted) {
      const postId = Number(id);
      const foundPost = posts[postId] || null;

      if (foundPost) {
        setPost(foundPost);
      } else {
        router.push("/404");
      }
    }
  }, [id, isNewPost, posts, router, isDeleted]);

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isNewPost ? "Create New Post" : "Edit Post"}
      </h1>
      {!isNewPost && !post ? (
        <p>Loading...</p>
      ) : (
        <PostForm 
          initialPost={post ?? { id: 0, title: "", body: "" }} 
          isNewPost={isNewPost} 
          onDelete={() => setIsDeleted(true)}
        />
      )}
    </main>
  )
}