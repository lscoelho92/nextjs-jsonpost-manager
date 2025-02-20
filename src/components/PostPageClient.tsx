"use client";
import { useState } from "react";
import { usePostStore } from "@/store/usePostStore";
import { notFound, useRouter } from "next/navigation";
import PostForm from "@/components/PostForm";
import ConfirmModal from "@/components/ConfirmModal";

type PostPageProps = {
  id: string;
};

export default function PostPageClient({ id }: PostPageProps) {
  const { posts } = usePostStore();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isNewPost = id === "new";
  const foundPost = posts[Number(id)] || null;

  if(!isNewPost && !foundPost && !isDeleted) {
    notFound()
  }

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (foundPost) {
      setIsDeleted(true)
      usePostStore.getState().deletePost(foundPost.id);
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