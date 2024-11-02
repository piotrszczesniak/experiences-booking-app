import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import { Post } from '@/generated/graphql';
import Link from 'next/link';
import PaginationControls from '../../../components/PaginationControls';

const BlogPageNumber = async ({
  params,
}: {
  params: { pageNumber: string };
}) => {
  const pageNumber = parseInt(params.pageNumber) || 1; // Current page number
  const first = 8; // Number of posts to fetch
  const client = getClient();

  // Initialize the `after` cursor
  let after: string | undefined;

  // Calculate the `after` cursor based on the current page number
  if (pageNumber > 1) {
    // For pages greater than 1, fetch previous pages to determine the correct endCursor
    // Determine how many posts to skip
    const postsToSkip = (pageNumber - 1) * first;

    // We're fetching the previous batch of posts to find the cursor
    const { data: previousData } = await client.query({
      query: GET_ALL_POSTS,
      variables: { first: postsToSkip }, // Fetch the posts up to this point
      context: {
        fetchOptions: {
          next: {
            revalidate: 5,
          },
        },
      },
    });

    // Extract the endCursor from the last page's data
    const previousPageInfo = previousData?.posts?.pageInfo;
    after = previousPageInfo?.endCursor; // This will be used to fetch the current page's posts
  }

  // Now fetch the posts for the current page
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

  const posts: Post[] = data?.posts?.nodes; // Retrieved posts
  const pageInfo = data?.posts?.pageInfo; // Pagination info

  // Handle the case where no posts are returned
  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <>
      <ol>
        {posts.map((item) => (
          <li key={item.id}>
            <Link href={`/blog/${item.slug}` || ''}>{item.title}</Link>
          </li>
        ))}
      </ol>
      <div className="pagination">
        <PaginationControls
          hasNextPage={pageInfo?.hasNextPage} // For navigating to the next page
          currentPage={pageNumber} // Current page number
        />
      </div>
    </>
  );
};

export default BlogPageNumber;
