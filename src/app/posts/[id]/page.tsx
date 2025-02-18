import { getPost } from "@/lib/api";
import PostForm from "@/components/PostForm";

export default async function PostPage({ params }: { params: { id: string } }) {
  const isNewPost = params.id === "new";
  const post = isNewPost
    ? { id: 0, title: "", body: "" } // Novo post
    : await getPost(params.id); // Buscar post existente

  return (
    <main className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{isNewPost ? "Criar Post" : "Editar Post"}</h1>
      <PostForm initialPost={post} isNewPost={isNewPost} />
    </main>
  );
}
