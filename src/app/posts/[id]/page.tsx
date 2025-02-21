import { getPost } from "@/lib/api";
import PostPageClient from "@/components/PostPageClient";
import { Post } from "@/types/post";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

// Server Component
export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  const post: Post | null = await getPost(resolvedParams.id);
  
  return <PostPageClient id={resolvedParams.id} initialPost={post} />;
}
