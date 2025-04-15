// /app/blog/page.tsx
import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import type { Post } from '@/generated/graphql';
import BlogPosts from '@/app/components/BlogPosts';

export default async function BlogHomePage() {
  const postsPerPage = 8;
  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first: postsPerPage },
    context: { fetchOptions: { next: { revalidate: 5 } } },
  });

  const posts: Post[] = data?.posts?.nodes;
  const pageInfo = data?.posts?.pageInfo;

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return <BlogPosts posts={posts} pageInfo={pageInfo} currentPage={1} />;
}
