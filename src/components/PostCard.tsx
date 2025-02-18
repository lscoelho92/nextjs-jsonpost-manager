// src/components/PostCard.tsx
import Link from "next/link";
import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100">
        <h2 className="font-semibold text-lg">{post.title}</h2>
        <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
      </div>
    </Link>
  );
}
