// app/page.tsx
import Link from "next/link";
import { Post } from "@/types/post";
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const posts: Post[] = await getPosts();

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <Link href="/posts/new" className="bg-blue-500 text-white px-4 py-2 rounded">
        New Post
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
