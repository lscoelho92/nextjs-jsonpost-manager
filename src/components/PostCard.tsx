import Link from "next/link";
import { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

const MAX_TITLE_LENGTH = 50;
const MAX_BODY_LENGTH = 100;

export default function PostCard({ post }: PostCardProps) {
  const truncatedTitle =
    post.body.length > MAX_TITLE_LENGTH
      ? post.title.substring(0, MAX_TITLE_LENGTH) + "..."
      : post.title;

  const truncatedBody =
    post.body.length > MAX_BODY_LENGTH
      ? post.body.substring(0, MAX_BODY_LENGTH) + "..."
      : post.body;

  return (
    <Link href={`/posts/${post.id}`} className="block h-full">
      <div className="p-4 border rounded-lg shadow-md bg-white cursor-pointer hover:bg-gray-100 flex flex-col h-full">
        <h2 className="font-semibold text-lg flex-shrink-0">{truncatedTitle}</h2>
        <p className="text-gray-600 flex-grow">{truncatedBody}</p>
      </div>
    </Link>
  );
}
