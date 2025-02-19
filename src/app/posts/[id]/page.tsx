import PostPageClient from "@/components/PostPageClient";

// Server Component
export default function PostPage({ params }: { params: { id: string } }) {
  return (
    <PostPageClient id={params.id} />
  );
}
