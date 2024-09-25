import { Post } from '@/generated/graphql';
import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import Link from 'next/link';

export default async function Home() {
  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const posts: Post[] = data?.posts?.nodes;

  return (
    <main>
      <h1>Home Page</h1>
      <Link href='/basket'>Basket</Link>
    </main>
  );
}
