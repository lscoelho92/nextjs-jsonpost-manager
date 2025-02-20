import PostPageClient from "@/components/PostPageClient";

type PostPageProps = {
  params: Promise<{ id: string }>;
};

// Server Component
export default async function PostPage({ params }: PostPageProps) {
  const resolvedParams = await params;
  return (
    <PostPageClient id={resolvedParams.id } />
  );
}
