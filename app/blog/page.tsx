import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import { Post } from '@/generated/graphql';
import Link from 'next/link';
import PaginationControls from '../components/PaginationControls';
import './blog.module.scss';

const BlogHome = async () => {
  const first = 8; // Number of posts to fetch

  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first },
    context: {
      fetchOptions: {
        next: {
          revalidate: 5,
        },
      },
    },
  });

  const posts: Post[] = data?.posts?.nodes;
  const pageInfo = data?.posts?.pageInfo;

  return (
    <>
      <ol>
        {posts?.map((item, index) => (
          <li key={item.id || index}>
            <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>
          </li>
        ))}
      </ol>
      <div className="pagination">
        <PaginationControls
          hasNextPage={pageInfo?.hasNextPage}
          endCursor={pageInfo?.endCursor}
          currentPage={1} // Set current page to 1, since this is the main page
          total={pageInfo?.total}
        />
      </div>
    </>
  );
};

export default BlogHome;

//blog
//--[slug]
//    page.tsx
//--page
//----[pageNumber]
//     page.tsx
//     blog/page/:pageNumber
//     blog/page/1 === blog
//     blog/page/2
//     blog/page/3
