"use client";
import { useState } from "react";
import { usePostStore } from "@/store/usePostStore";
import { notFound, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ConfirmModal from "@/components/ConfirmModal";
import { Post } from "@/types/post";

type PostPageProps = {
  id: string;
  initialPost: Post | null;
};

export default function PostPageClient({ id, initialPost }: PostPageProps) {
  const { posts, deletePost } = usePostStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isNewPost = id === "new";
  const foundPost = isNewPost ? null : posts[Number(id)] || initialPost;

  if(!isNewPost && !Number(id) && !isDeleted) {
    notFound();
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (foundPost) {
      setIsDeleted(true);
      deletePost(foundPost.id);
    }
    setIsModalOpen(false);
    router.push("/");
  };

  const handleDeleteCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">
        {isNewPost ? "Create New Post" : "Edit Post"}
      </h1>
      <PostForm 
        initialPost={foundPost ?? { id: 0, title: "", body: "" }} 
        isNewPost={isNewPost} 
        onDelete={handleDeleteClick}
      />

      <ConfirmModal 
        isOpen={isModalOpen}
        onCancel={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
      />
    </main>
  );
}
