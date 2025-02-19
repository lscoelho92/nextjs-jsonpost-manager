import { getPosts } from "@/lib/api";
import PostsList from "@/components/PostsList";

export default async function Home() {
  const posts = await getPosts();

  return (
    <main className="container mx-auto p-6">
      <PostsList initialPosts={posts} />
    </main>
  );
}