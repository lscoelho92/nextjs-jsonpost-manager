"use client";
import { useState } from "react";
import { Post } from "@/types/post";
import { usePostStore } from "@/store/usePostStore";
import { useRouter } from "next/navigation";

type PostFormProps = {
  initialPost: Post;
  isNewPost: boolean;
  onDelete?: () => void;
};

export default function PostForm({ initialPost, isNewPost, onDelete }: PostFormProps) {
  const [title, setTitle] = useState(initialPost.title);
  const [body, setBody] = useState(initialPost.body);
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});
  const { addPost, updatePost, lastId } = usePostStore();
  const router = useRouter();

  const validate = () => {
    const newErrors: { title?: string; body?: string } = {};

    if (!title.trim() || title.length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!body.trim() || body.length < 5) {
      newErrors.body = "Body must be at least 5 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const post: Post = {
      id: isNewPost ? lastId + 1 : initialPost.id,
      title: title.trim(),
      body: body.trim(),
    };

    if (isNewPost) {
      addPost(post);
    } else {
      updatePost(initialPost.id, { title, body });
    }

    router.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className={`w-full p-2 border rounded ${errors.title ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
          className={`w-full h-40 p-2 border rounded ${errors.body ? "border-red-500" : "border-gray-300"}`}
        />
        {errors.body && <p className="text-red-500 text-sm mt-1">{errors.body}</p>}
      </div>

      <div className="flex w-full justify-between items-center">
        {!isNewPost && (
          <button
            type="button"
            onClick={onDelete}
            data-testid="delete-button"
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        )
        }
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {isNewPost ? "Create Post" : "Update Post"}
        </button>
      </div>
    </form>
  );
}
