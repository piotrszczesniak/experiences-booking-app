import Link from 'next/link';
import PaginationControls from '../../../components/PaginationControls';

const POSTS_PER_PAGE = 8;

const BlogPageNumber = async ({
  params,
}: {
  params: { pageNumber: string };
}) => {
  const pageNumber = parseInt(params.pageNumber, 10) || 1; // Current page number
  const offset = (pageNumber - 1) * POSTS_PER_PAGE; // Calculate offset

  try {
    // Fetch posts and total count in one request using _embed for extra data
    // TODO: extract url to variable
    const response = await fetch(
      `https://bumperball.pl/wp-json/wp/v2/posts?offset=${offset}&per_page=${POSTS_PER_PAGE}&_embed`,
      { next: { revalidate: 10 } } // Enable ISR revalidation
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.statusText}`);
    }

    // Parse the JSON response
    const posts = await response.json();
    const total = parseInt(response.headers.get('X-WP-Total') || '0', 10); // Total number of posts from headers

    // Handle the case where no posts are returned
    if (!posts || posts.length === 0) {
      return <div>No posts available.</div>;
    }

    return (
      <>
        <ol>
          {/* //TODO: type posts */}
          {posts.map((post: any) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`}>{post.title.rendered}</Link>
            </li>
          ))}
        </ol>
        <div className="pagination">
          <PaginationControls
            hasNextPage={pageNumber * POSTS_PER_PAGE < total} // Check if more pages exist
            currentPage={pageNumber} // Current page number
            total={total} // Total number of posts
          />
        </div>
      </>
    );
  } catch (error) {
    console.error(error);
    return <div>Error loading posts. Please try again later.</div>;
  }
};

export default BlogPageNumber;
