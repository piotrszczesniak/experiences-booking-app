import Link from 'next/link';
import Image from 'next/image';
import PaginationControls from './PaginationControls';
import styles from '@/app/blog/blog.module.scss';
import type { Post as GraphQLPost } from '@/generated/graphql';
import type { PostsD as RestPost } from '@/types/posts';

type PageInfo = {
  total: number;
  hasNextPage: boolean;
};

type BlogPostsProps = {
  posts: (GraphQLPost | RestPost)[];
  pageInfo: PageInfo;
  currentPage: number;
};

// Type guard to determine if a post is a GraphQLPost
function isGraphQLPost(post: GraphQLPost | RestPost): post is GraphQLPost {
  return 'featuredImage' in post;
}

function isRestPost(post: GraphQLPost | RestPost): post is RestPost {
  return '_embedded' in post;
}
export default function BlogPosts({
  posts,
  pageInfo,
  currentPage,
}: BlogPostsProps) {
  return (
    <>
      <div className={styles.postsList}>
        {posts.map((item) => {
          if (!item.title) return null;
          const titleText =
            typeof item.title === 'object' && 'rendered' in item.title
              ? item.title.rendered
              : (item.title as string);
          const imageUrl = isGraphQLPost(item)
            ? item.featuredImage?.node?.mediaItemUrl || ''
            : isRestPost(item)
            ? item._embedded?.['wp:featuredmedia']?.[0]?.source_url || ''
            : '';

          return (
            <div key={item.id} className={styles.postCard}>
              {imageUrl && (
                <div className={styles.postImageContainer}>
                  <Image
                    src={imageUrl}
                    alt={titleText}
                    layout="fill"
                    objectFit="cover"
                    quality={75}
                  />
                </div>
              )}
              <h3 className={styles.postTitle}>
                <Link href={`/blog/${item.slug}`}>{titleText}</Link>
              </h3>
            </div>
          );
        })}
      </div>
      <div className={styles.pagination}>
        <PaginationControls
          hasNextPage={pageInfo?.hasNextPage}
          currentPage={currentPage}
          total={pageInfo?.total}
        />
      </div>
    </>
  );
}
