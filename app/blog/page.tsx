import { GET_ALL_POSTS } from '@/graphql/queries';
import { getClient } from '@/lib/apollo-client';
import { Post } from '@/generated/graphql';
import Link from 'next/link';
import Image from 'next/image';
import PaginationControls from '../components/PaginationControls';
import styles from './blog.module.scss';

const BlogHome = async () => {
  const first = 8;
  const client = getClient();

  const { data } = await client.query({
    query: GET_ALL_POSTS,
    variables: { first },
    context: { fetchOptions: { next: { revalidate: 5 } } },
  });

  const posts: Post[] = data?.posts?.nodes;
  const pageInfo = data?.posts?.pageInfo;

  if (!posts || posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <>
      <header className={styles.blogHeader}>
        <div className={styles.headerContent}>
          <h1>Welcome</h1>
          <p className={styles.subHeader}>
            Activities | Recommendations | Ideas | News
          </p>
          <h2>Let&apos;s dive in!</h2>
        </div>
      </header>

      {/* Read Section under the header */}
      <div className={styles.readSection}>
        <div className={styles.line}></div>
        <div className={styles.readText}>
          <span className={styles.readIcon}>🔍</span>
          <span>Read what we blog about</span>
        </div>
        <div className={styles.line}></div>
      </div>

      <div className={styles.blogContent}>
        <aside className={styles.tripAdvisorSidebar}>
          {/* Reserved space for TripAdvisor bar */}
        </aside>
        <div className={styles.postsContainer}>
          {posts.map((item) => {
            const imageUrl: string =
              item.featuredImage?.node?.mediaItemUrl ?? '';
            return (
              <div key={item.id} className={styles.postCard}>
                {imageUrl && (
                  <div className={styles.postImageContainer}>
                    <Image
                      src={imageUrl}
                      alt={item.title}
                      layout="fill"
                      objectFit="cover"
                      quality={75}
                    />
                  </div>
                )}
                <h3 className={styles.postTitle}>
                  <Link href={`/blog/${item.slug}`}>{item.title}</Link>
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.pagination}>
        <PaginationControls
          hasNextPage={pageInfo?.hasNextPage}
          currentPage={1}
          total={pageInfo?.total}
        />
      </div>
    </>
  );
};

export default BlogHome;
