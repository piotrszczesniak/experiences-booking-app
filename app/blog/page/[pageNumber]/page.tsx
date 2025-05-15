// /app/blog/page/[pageNumber]/page.tsx
import { PostsD } from '@/types/posts';
import BlogPosts from '@/app/components/BlogPosts';
import { notFound } from 'next/navigation';

type PageProps = {
  params: { pageNumber: string };
};

export default async function BlogPaginatedPage({ params }: PageProps) {
  const currentPage = parseInt(params.pageNumber, 10);
  if (isNaN(currentPage) || currentPage < 1) {
    notFound();
  }

  const POSTS_PER_PAGE = 8;
  const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_REST_API_URL;

  const response = await fetch(
    `${baseUrl}/posts?offset=${
      (currentPage - 1) * POSTS_PER_PAGE
    }&per_page=${POSTS_PER_PAGE}&_embed`,
    { next: { revalidate: 10 } }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch posts: ${response.statusText}`);
  }

  // Parse the JSON response.
  const posts: PostsD[] = await response.json();
  const total: number = parseInt(response.headers.get('X-WP-Total') || '0', 10);
  // Ensure that posts is a valid array.
  if (!posts || !Array.isArray(posts) || posts.length === 0) {
    notFound();
  }

  // Construct a pageInfo-like object.
  const pageInfo = { total, hasNextPage: currentPage * POSTS_PER_PAGE < total };

  return (
    <BlogPosts posts={posts} pageInfo={pageInfo} currentPage={currentPage} />
  );
}
