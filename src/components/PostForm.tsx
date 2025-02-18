"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostFormProps, Post } from "@/types/post";

export default function PostForm({ initialPost, isNewPost }: PostFormProps) {
  const router = useRouter();
  const [post, setPost] = useState<Post>(initialPost);
  const [isEdited, setIsEdited] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPost((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setIsEdited(true);
  };

  const handleSave = () => {
    alert(`Post ${isNewPost ? "created" : "updated"} with success!\n\n` + JSON.stringify(post, null, 2));
    setIsEdited(false);
    router.push("/");
  };

  const handleDelete = () => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete) {
      alert("Post successfully deleted!");
      router.push("/");
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <label className="block mb-2">
        <span className="text-gray-700">Title</span>
        <input
          type="text"
          name="title"
          value={post.title}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Post Title..."
        />
      </label>
      <label className="block mb-2">
        <span className="text-gray-700">Body</span>
        <textarea
          name="body"
          value={post.body}
          onChange={handleChange}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Post body..."
        />
      </label>

      <div className="flex justify-between mt-4">

        {!isNewPost && (
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
            Delete Post
          </button>
        )}

        {isEdited && (
          <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded mt-2">
            Save
          </button>
        )}
      </div>
    </div>
  );
}
