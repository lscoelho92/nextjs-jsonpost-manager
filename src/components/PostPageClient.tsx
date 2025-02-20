"use client";
import { useState, useEffect } from "react";
import { usePostStore } from "@/store/usePostStore";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ConfirmModal from "@/components/ConfirmModal";
import Loader from "@/components/Loader";

type PostPageProps = {
  id: string;
  errorMessage?: string | null;
  errorCode?: number | null;
};

export default function PostPageClient({ id, errorMessage, errorCode }: PostPageProps) {
  const { posts } = usePostStore();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const isNewPost = id === "new";

  useEffect(() => {
    setIsLoading(true);

    if (errorMessage && errorCode) {
      // If there's an error, skip loading and display the error
      setIsLoading(false);
      return;
    }

    if (!isNewPost && !isDeleted) {
      const postId = Number(id);
      const foundPost = posts[postId] || null;

      if (foundPost) {
        setPost(foundPost);
      } else {
        router.push("/404");
      }
    }

    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [id, isNewPost, posts, router, isDeleted, errorMessage, errorCode]);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (post) {
      setIsDeleted(true);
      usePostStore.getState().deletePost(post.id);
    }
    setIsModalOpen(false);
    router.push("/");
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {errorMessage && errorCode ? (
            <div>
              <p>{errorMessage}</p>
              <p>Error number: {errorCode}</p>
            </div>
          ) : (
            <>
              <h1 className="text-2xl font-bold mb-4">
                {isNewPost ? "Create New Post" : "Edit Post"}
              </h1>
              <PostForm 
                initialPost={post ?? { id: 0, title: "", body: "" }} 
                isNewPost={isNewPost} 
                onDelete={handleDeleteClick}
              />
            </>
          )}
        </>
      )}

      <ConfirmModal 
        isOpen={isModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}