import { getPosts } from "@/lib/api";
import PostsList from "@/components/PostsList";
import { Post } from "@/types/post";

export default async function Home() {
  let posts: Post[] = [];
  let errorMessage: string | null = null;
  let errorCode: number | null = null;

  try {
    posts = await getPosts();
  } catch (err) {
    if (err instanceof Error) {
      const message = err.message;
      const match = message.match(/status: (\d+)/);
      if (match) {
        errorCode = parseInt(match[1], 10);
      }
      errorMessage = `Error when listing posts: ${message}`;
    } else {
      errorMessage = "Unknown error occurred.";
      errorCode = 500;
    }
  }

  return (
    <main className="container mx-auto p-6">
      <PostsList initialPosts={posts} errorMessage={errorMessage} errorCode={errorCode} />
    </main>
  );
}
