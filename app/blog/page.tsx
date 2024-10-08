import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';

import { Post } from '@/generated/graphql';
import Link from 'next/link';

const BlogHome = async () => {
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
  console.log(data.posts.nodes);
  console.log('su');
  const posts: Post[] = data?.posts?.nodes;

  return (
    <ol>
      {posts?.map((item, index) => {
        return (
          <li key={index}>
            <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>
          </li>
        );
      })}
    </ol>
  );
};
export default BlogHome;
