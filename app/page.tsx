import { Post } from '@/generated/graphql';
import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';

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
      {/* {posts?.map((item, index) => {
        return <h3 key={index}>{item.title}</h3>;
      })} */}
    </main>
  );
}
