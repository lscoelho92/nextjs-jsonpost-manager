// src/app/posts/[id]/page.tsx
import { getPost } from "@/lib/api";
import PostForm from "@/components/PostForm";

type PostPageProps = {
  params: Promise<{ id: string }>
};

export default async function PostPage({ params }: PostPageProps) {
  const { id } = await params;

  const isNewPost = id === "new";
  const post = isNewPost
    ? { id: 0, title: "", body: "" }
    : await getPost(id);

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isNewPost ? "Create Post" : "Edit Post"}</h1>
      <PostForm initialPost={post} isNewPost={isNewPost} />
    </main>
  );
}
