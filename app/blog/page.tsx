// import { GET_ALL_POSTS } from '@/graphql/queries';
// import { getClient } from '@/lib/apollo-client';

// import { Post } from '@/generated/graphql';
// import Link from 'next/link';
// import PaginationControls from '../components/PaginationControls';

// const BlogHome = async () => {
//   const client = getClient();

//   const { data } = await client.query({
//     query: GET_ALL_POSTS,
//     variables: { first: 8 },
//     context: {
//       fetchOptions: {
//         next: {
//           revalidate: 5,
//         },
//       },
//     },
//   });
//   const posts: Post[] = data?.posts?.nodes;

//   return (
//     <>
//       <ol>
//         {posts?.map((item, index) => {
//           return (
//             <li key={index}>
//               <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>
//             </li>
//           );
//         })}
//       </ol>
//       <div className="pagination">
//         <PaginationControls />
//       </div>
//     </>
//   );
// };
// export default BlogHome;

// poprzednie dzialajace ponizej

import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import { Post } from '@/generated/graphql';
import Link from 'next/link';
import PaginationControls from '../components/PaginationControls';
import './blog.module.scss';
// const dynamic = 'force-dynamic';

const BlogHome = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const page =
    typeof searchParams.page === 'string' ? parseInt(searchParams.page) : 1;
  const first = 3; // Number of posts per page
  const after =
    typeof searchParams.after === 'string' ? searchParams.after : null;

  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first, after },
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
        {posts?.map((item, index) => {
          return (
            <li key={item.id || index}>
              <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>
            </li>
          );
        })}
      </ol>
      <div className="pagination">
        <PaginationControls
          hasNextPage={pageInfo?.hasNextPage}
          endCursor={pageInfo?.endCursor}
          currentPage={page}
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
